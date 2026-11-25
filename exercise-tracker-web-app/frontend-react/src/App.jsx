import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useState} from 'react';
import './global.css';
import HomePage from './pages/HomePage';
import CreateExercisePage from './pages/CreateExercisePage';
import EditExercisePage from './pages/EditExercisePage';

function App() {
    const [exerciseToEdit, setExerciseToEdit] = useState();

    return (
        <Router>
            <header>
                <h1>Exercise Tracker</h1>
                <p>Track workouts and fitness progress.</p>
            </header>
            <nav>
                <Link to="/">Home</Link>
                <Link to="/create">Create Exercise</Link>
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage setExerciseToEdit={setExerciseToEdit}/>}/>
                    <Route path="/create" element={<CreateExercisePage/>}/>
                    <Route path="/edit" element={<EditExercisePage exerciseToEdit={exerciseToEdit}/>}/>
                </Routes>
            </main>
            <footer>
                <p> © {new Date().getFullYear()} Nicholas Gervais </p>
            </footer>
        </Router>
    );
}

export default App;