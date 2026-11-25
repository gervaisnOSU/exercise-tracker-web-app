import 'dotenv/config';
import express from 'express';
import asyncHandler from 'express-async-handler';
import * as exercises from './exercise-models.mjs';

const app = express();
app.use(express.json());

const PORT = process.env.PORT;

/**
 * Validates an exercise request body.
 */
function isValidExercise(exercise) {

    // Ensure all required fields are present
    if (exercise.name === undefined || exercise.reps === undefined || exercise.weight === undefined ||
        exercise.unit === undefined || exercise.date === undefined) {
        return false;
    }

    // Ensure name is not empty
    if (typeof exercise.name !== 'string' || exercise.name.trim() === '') {
        return false;
    }

    // Ensure reps is an integer > 0
    if (typeof exercise.reps !== 'number' || !Number.isInteger(exercise.reps) || exercise.reps <= 0) {
        return false;
    }

    // Ensure weight is an integer >= 0
    if (typeof exercise.weight !== 'number' || !Number.isInteger(exercise.weight) || exercise.weight < 0) {
        return false;
    }

    // Ensure unit is valid
    if (!['kgs', 'lbs', 'miles'].includes(exercise.unit)) {
        return false;
    }

    // Ensure date is valid
    if (Number.isNaN(Date.parse(exercise.date))) {
        return false;
    }

    return true;
}

/**
 * Create a new exercise.
 */
app.post('/exercises', asyncHandler(async (req, res) => {

    // Validate request body
    if (!isValidExercise(req.body)) {
        return res.status(400).json({ "Error": "Invalid request" });
    }

    // Create exercise
    const newExercise = await exercises.createExercise(req.body);

    res.status(201).json(newExercise);
}));

/**
 * Retrieve all exercises.
 */
app.get('/exercises', asyncHandler(async (req, res) => {

    const foundExercises = await exercises.getExercises();

    res.status(200).json(foundExercises);
}));

/**
 * Retrieve a single exercise by id.
 */
app.get('/exercises/:_id', asyncHandler(async (req, res) => {

    const exercise = await exercises.getExerciseById(req.params._id);

    if (exercise !== null) {
        res.status(200).json(exercise);
    }
    else {
        res.status(404).json({ "Error": "Not found" });
    }
}));

/**
 * Update an exercise by id.
 */
app.put('/exercises/:_id', asyncHandler(async (req, res) => {

    // Validate request body first
    if (!isValidExercise(req.body)) {
        return res.status(400).json({ "Error": "Invalid request" });
    }

    // Store id
    const id = req.params._id;

    // Attempt update
    const updatedExercise =
        await exercises.updateExercise(id, req.body);

    // On success
    if (updatedExercise !== null) {
        res.status(200).json(updatedExercise);
    }

    // On failure
    else {
        res.status(404).json({ "Error": "Not found" });
    }
}));

/**
 * Delete an exercise by id.
 */
app.delete('/exercises/:_id', asyncHandler(async (req, res) => {

    // Store id and attempt delete
    const id = req.params._id;

    const result = await exercises.deleteExercise(id);

    // On success
    if (result !== null) {
        res.status(204).send();
    }

    // On failure
    else {
        res.status(404).json({ "Error": "Not found" });
    }
}));

/**
 * Connect to MongoDB and start server.
 */
await exercises.connect();

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}...`);
});