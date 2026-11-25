import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ExerciseTable from '../components/ExerciseTable';

function HomePage({ setExerciseToEdit }) {
    const [exercises, setExercises] = useState([]);
    const navigate = useNavigate();

    /**
     * Loads all exercises from the database.
     */
    const loadExercises = async () => {

        // Request all exercises
        const response = await fetch('/exercises');

        // Convert response to JSON
        const exercises = await response.json();

        // Update state
        setExercises(exercises);
    };

    // Load exercises when page renders
    useEffect(() => {
        loadExercises();
    }, []);

    /**
     * Deletes an exercise by id.
     */
    const onDelete = async (_id) => {
        // Attempt delete
        const response = await fetch(
            `/exercises/${_id}`,
            {
                method: 'DELETE'
            }
        );

        // On success
        if (response.status === 204) {
            const remainingExercises =
                exercises.filter(
                    exercise => exercise._id !== _id
                );

            setExercises(remainingExercises);
        }
        // On failure
        else {
            alert('Failed to delete exercise');
        }
    };

    /**
     * Stores exercise and navigates to edit page.
     */
    const onEdit = (exercise) => {
        // Store selected exercise
        setExerciseToEdit(exercise);

        // Navigate to edit page
        navigate('/edit');
    };

    return (
        <>
            <h2>Exercises</h2>

            <ExerciseTable
                exercises={exercises}
                onDelete={onDelete}
                onEdit={onEdit}
            />
        </>
    );
}

export default HomePage;