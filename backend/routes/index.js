import express from 'express';
import joi from 'joi';
import mongoose from 'mongoose';
import { Task } from '../models/index.js'
import { validateTaskObject } from '../utils/index.js';

const api = express.Router()
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