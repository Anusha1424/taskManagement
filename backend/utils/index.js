import joi from 'joi';
import jwt from 'jsonwebtoken';

const task = joi.object({
    title: joi.string().min(3).max(30).required(),
    status: joi.string().required(),
    created_by: joi.string(),
    description: joi.string(),
    user_id: joi.number(),
    created_on: joi.date(),
    due_date: joi.date()
})

export const validateTaskObject = (data) => {

    const { error, value } = task.validate({
        title: data.title,
        status: data.status,
        created_by: data.created_by,
        description: data.description,
        user_id: data.user_id,
        created_on: data.created_on,
        due_date: data.due_date
    })

    return { error, value }
}

export const generateToken = (user) => {
    return jwt.sign({ userId: user._id }, 'your-secret-key', { expiresIn: '1h' });
};

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, 'your-secret-key');
    } catch (error) {
        return null;
    }
};

