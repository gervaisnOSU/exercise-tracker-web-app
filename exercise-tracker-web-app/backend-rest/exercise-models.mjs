// Get the mongoose object
import mongoose from 'mongoose';
import 'dotenv/config';

let Exercise;

const EXERCISE_COLLECTION = 'exercises';
const EXERCISE_CLASS = 'Exercise';

/**
 * Connects to MongoDB and initializes the Exercise model.
 */
async function connect() {
    try {

        await mongoose.connect(process.env.MONGODB_CONNECT_STRING);

        console.log('Successfully connected to MongoDB using Mongoose!');

        Exercise = createExerciseModel();

    } catch (err) {

        console.log(err);

        throw Error(`Could not connect to MongoDB ${err.message}`);
    }
}

/**
 * Creates the Exercise schema and returns the model.
 */
function createExerciseModel() {

    // Define schema for Exercise documents
    const exerciseSchema = new mongoose.Schema({
        name: {type: String, required: true, trim: true},
        reps: {type: Number, required: true, min: 1},
        weight: {type: Number, required: true, min: 0},
        unit: {type: String, required: true, enum: ['kgs', 'lbs', 'miles']},
        date: {type: Date, default: Date.now}
    });

    // Create and return model
    return mongoose.model(EXERCISE_CLASS, exerciseSchema, EXERCISE_COLLECTION);
}

/**
 * Creates and saves a new exercise.
 */
async function createExercise(exercise) {
    const newExercise = new Exercise(exercise);
    return newExercise.save();
}

/**
 * Gets all exercises from the collection.
 */
async function getExercises() {
    return Exercise.find({}).exec();
}

/**
 * Gets a single exercise using its id.
 */
async function getExerciseById(_id) {

    const exerciseQuery = Exercise.findById(_id);
    return exerciseQuery.exec();
}

/**
 * Updates an exercise and returns the updated document.
 */
async function updateExercise(_id, update) {

    const result = await Exercise.findByIdAndUpdate(_id,update, {new: true, runValidators: true});
    return result;
}

/**
 * Deletes an exercise using its id.
 */
async function deleteExercise(_id) {

    const result = await Exercise.findByIdAndDelete(_id);
    return result;
}

export {connect, createExercise, getExercises, getExerciseById, updateExercise, deleteExercise};