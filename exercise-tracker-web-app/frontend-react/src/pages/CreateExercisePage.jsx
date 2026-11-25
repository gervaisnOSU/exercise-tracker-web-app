import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CreateExercisePage() {
    const [name, setName] = useState('');
    const [reps, setReps] = useState('');
    const [weight, setWeight] = useState('');
    const [unit, setUnit] = useState('lbs');
    const [date, setDate] = useState('');

    const navigate = useNavigate();

    /**
     * Creates a new exercise.
     */
    const addExercise = async () => {
        // Create exercise object
        const newExercise = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date
        };

        // Attempt create
        const response = await fetch('/exercises', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(newExercise)
        });

        // On success
        if (response.status === 201) {
            alert('Exercise successfully added');

            // Return to home page
            navigate('/');
        }

        // On failure
        else {
            alert('Failed to add exercise');
        }
    };

    return (
        <>
            <h2>Create Exercise</h2>
            <p>
                <label> Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
            </p>
            <p>
                <label> Reps:
                    <input type="number" value={reps} onChange={e => setReps(e.target.value)}/>
                </label>
            </p>
            <p>
                <label> Weight:
                    <input type="number" value={weight} onChange={e => setWeight(e.target.value)}/>
                </label>
            </p>
            <p>
                <label> Unit:
                    <select value={unit} onChange={e => setUnit(e.target.value)}>
                        <option value="lbs">lbs</option>
                        <option value="kgs">kgs</option>
                        <option value="miles">miles</option>
                    </select>
                </label>
            </p>
            <p>
                <label> Date:
                    <input type="date" value={date} onChange={e => setDate(e.target.value)}/>
                </label>
            </p>

            <button onClick={addExercise}> Create </button>
        </>
    );
}

export default CreateExercisePage;