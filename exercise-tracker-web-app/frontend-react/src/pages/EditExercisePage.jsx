import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function EditExercisePage({ exerciseToEdit }) {
    const [name, setName] = useState(exerciseToEdit?.name || '');
    const [reps, setReps] = useState(exerciseToEdit?.reps || '');
    const [weight, setWeight] = useState(exerciseToEdit?.weight || '');
    const [unit, setUnit] = useState(exerciseToEdit?.unit || 'lbs');
    const [date, setDate] = useState(
        exerciseToEdit?.date?.split('T')[0] || ''
    );
    const navigate = useNavigate();

    // Safety check
    if (!exerciseToEdit) {
        return <h2>No exercise selected.</h2>;
    }

    /**
     * Updates an existing exercise.
     */
    const editExercise = async () => {
        // Create updated exercise object
        const updatedExercise = {
            name,
            reps: Number(reps),
            weight: Number(weight),
            unit,
            date
        };

        // Attempt update
        const response = await fetch(
            `/exercises/${exerciseToEdit._id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedExercise)
            }
        );

        // On success
        if (response.status === 200) {
            alert('Exercise successfully updated');

            // Return to home page
            navigate('/');
        }

        // On failure
        else {
            alert('Failed to update exercise');
        }
    };

    return (
        <>
            <h2>Edit Exercise</h2>
            <p>
                <label> Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)}/>
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
            <button onClick={editExercise}> Save </button>
        </>
    );
}

export default EditExercisePage;