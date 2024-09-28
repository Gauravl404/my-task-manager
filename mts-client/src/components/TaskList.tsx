import React , {useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../stores/store';
import { addTask, toggleTask, deleteTask } from '../features/task/taskSlice';



const TaskList: React.FC = () => {

    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const dispatch = useDispatch();

    const [newTask, setNewTask] = useState('');

    const handleAddTask = () => {
        if (newTask.trim()) {
            dispatch(addTask({ id: Date.now().toString(), title: newTask, completed: false }));
            setNewTask('');
        }
    }

    return (
        <div>
            <h1>Task List</h1>
            <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
            <button onClick={handleAddTask}>Add Task</button>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id}>
                        <span
                        style={{ textDecoration: task.completed ? 'line-through' : 'none' }}
                        onClick={() => dispatch(toggleTask(task.id))}
                        >{task.title}</span>
                        <button onClick={() => dispatch(deleteTask(task.id))}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>

    )
}

export default TaskList;
