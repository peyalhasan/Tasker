import React, { useEffect, useState } from 'react';
import SearchTask from './SearchTask';
import TaskActions from './TaskActions';
import TaskList from './TaskList';
import AddTaskModal from './AddTaskModal';
import NoTaskfound from './NoTaskfound';

const TaskBoard = () => {
    const defaultTask = {
        'id': crypto.randomUUID(),
        'title': 'Learn React Native',
        "description": "I want to Learn React such than I can treat it like my slave and make it do whatever I want to do.",
        "tags": ["web", "react", "js"],
        "priority": "High",
        "isFavorite": true
    }
    const [tasks, setTasks] = useState([defaultTask]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [taskToUpdate, setTaskToUpdate] = useState(null);

    function handleAddEditTask(newTask, isAdd) {
        if (isAdd) {
            setTasks([...tasks, newTask])
            setShowAddModal(false)
        }
        else {
            setTasks(
                tasks.map(task => {
                    if (task.id === newTask.id) {
                        return newTask
                    }
                })
            )
            setShowAddModal(false)
        }
    }

    function hanldeEdit(editTask) {
        setTaskToUpdate(editTask)
        setShowAddModal(true)

    }

    function handleCloseClick() {
        setShowAddModal(false);
        setTaskToUpdate(null)
    }


    function handleDelete(taskId) {

        const tasksAfterDelete = tasks.filter(task => task.id !== taskId)
        setTasks(tasksAfterDelete)

    }

    function handleDeleteAll() {
        tasks.length = 0;
        setTasks([...tasks])
    }

    function handleFavorite(taskId) {
        const taskIndex = tasks.findIndex(task => task.id === taskId)
        const newTasks = [...tasks];
        newTasks[taskIndex].isFavorite = !newTasks[taskIndex].isFavorite;
        setTasks(newTasks)
    }


    function handleSearch(searchTerm) {
        const filterd = tasks.filter(task => task.title.toLocaleLowerCase().includes(searchTerm.toLocaleLowerCase()));
        setTasks(filterd)
    }


    return (
        <div>
            <section className="mb-20 " id="tasks">
                {showAddModal && <AddTaskModal onCloseClick={handleCloseClick} onSave={handleAddEditTask} taskToUpdate={taskToUpdate} />}
                <div className="container">
                    <div className="p-2 flex justify-end">
                        <SearchTask onSearch={handleSearch} ></SearchTask>
                    </div>
                    <div className="rounded-xl border border-[rgba(206,206,206,0.12)] bg-[#1D212B] px-6 py-8 md:px-9 md:py-16">

                        <TaskActions
                            onAddClick={() => setShowAddModal(true)}
                            onDeleAllClick={handleDeleteAll}
                        ></TaskActions>
                        {
                            tasks.length > 0 ? (<TaskList
                                tasks={tasks}
                                onEdit={hanldeEdit}
                                onDelete={handleDelete}
                                onFav={handleFavorite}
                            ></TaskList>) : <NoTaskfound></NoTaskfound>
                         }


                    </div>
                </div>
            </section>
        </div>
    );
};

export default TaskBoard;