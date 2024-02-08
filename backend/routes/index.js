import express from 'express';
import joi from 'joi';
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

import { Task, User } from '../models/index.js'
import { generateToken, validateTaskObject } from '../utils/index.js';

const api = express.Router();


api.post('/register', async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    try {

        // Check if the email or email already exists
        const existingUser = await User.findOne({ $or: [{ email }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: 'Email already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // If not, create a new user
        const newUser = {
            firstName,
            lastName,
            email,
            password: hashedPassword, // This will be hashed in the user model's pre-save hook
        };

        const result = await new User(newUser).save()

        const token = generateToken(newUser);
        res.cookie('token', token, { httpOnly: true });

        res.status(201).json({ success: true, token, user: { _id: result.insertedId, email } });
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});


api.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            const token = generateToken(user);
            res.json({ success: true, token });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

api.get('/tasks', async (req, res) => {
    try {
        // Parse query parameters
        const { filterField, filterValue, sortBy, sortOrder, page, limit, search } = req.query;

        // Build the filter object based on query parameters
        const filter = {};
        if (filterField && filterValue) {
            filter[filterField] = filterValue;
        }

        // Build the sort object based on query parameters
        const sort = {};
        if (sortBy) {
            sort[sortBy] = sortOrder === 'desc' ? -1 : 1;
        }

        // Build the search object to search across all columns
        const searchFilter = {};
        if (search) {
            const searchRegex = new RegExp(search, 'i'); // Case-insensitive search
            searchFilter.$or = [
                { title: searchRegex },
                { description: searchRegex },
            ];
        }

        // Merge search filter with existing filter
        const finalFilter = { ...filter, ...searchFilter };

        // Apply pagination
        const options = {
            skip: (page - 1) * limit,
            limit: parseInt(limit),
        };

        // Perform the query with filtering, sorting, and pagination
        const data = await Task.find(finalFilter, { task: 0, __v: 0, updatedAt: 0 })
            .sort(sort)
            .skip(options.skip)
            .limit(options.limit);

        return res.send(data);
    } catch (error) {
        return res.status(500).send({ error: true, message: 'Error fetching tasks', details: error });
    }
});


api.get('/task/:id', async (req, res) => {
    if (!req.params.id) res.status(422).send({ data: { error: true, message: 'Id is reaquire' } })
    try {
        const data = await Task.findOne({ _id: req.params.id });
        return res.send(data)
    } catch (error) {
        return res.send(error)
    }
})

api.post('/task', async (req, res) => {

    // validation
    const { error, value } = validateTaskObject(req.body)

    if (error) return res.status(422).send(error)

    // insert data 
    try {
        const data = await new Task(value).save()
        res.send({ data: { ...data } })

    } catch (e) {
        console.log(e)
        if (e.code === 11000) {
            return res.status(422).send({ data: { error: true, message: 'title must be unique' } })
        } else {
            return res.status(500).send({ data: { error: true, message: 'server error' } })
        }
    }


})

api.put('/task/:id', async (req, res) => {
    // validate type 
    const { error, value } = validateTaskObject(req.body)

    if (error) return res.status(422).send(error);
    try {
        const updatedTask = await Task.updateOne(
            { _id: req.params.id },
            { $set: { ...value } },
            { upsert: true }
        );

        res.send(updatedTask);
    } catch (error) {
        res.status(500).send({ error: true, message: 'Error updating task', details: error });
    }


})

api.delete('/task/:id', async (req, res) => {
    try {
        const data = await Task.deleteOne({ _id: req.params.id })
        res.send(data)
    } catch (error) {
        res.send(error)
    }
})


export default api