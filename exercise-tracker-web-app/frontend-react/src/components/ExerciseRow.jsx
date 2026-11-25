import { MdDeleteForever } from 'react-icons/md';
import { TiEdit } from 'react-icons/ti';

function ExerciseRow({ exercise, onDelete, onEdit }){

    return (
        <tr>
            <td>{exercise.name}</td>
            <td>{exercise.reps}</td>
            <td>{exercise.weight}</td>
            <td>{exercise.unit}</td>
            <td>{exercise.date?.split('T')[0]}</td>
            <td>
                <TiEdit onClick={() => onEdit(exercise)}/>
            </td>
            <td>
                <MdDeleteForever onClick={() => onDelete(exercise._id)}/>
            </td>
        </tr>
    );
}

export default ExerciseRow;