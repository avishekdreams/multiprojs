import React, { useState } from 'react';
import './../../style/todos.css';
import TodoList from './TodoList';

export default function Todos() {
	const [allTodos, setAllTodos] = useState([]);
	const [newTodoTitle, setNewTodoTitle] = useState('');
	const [newDescription, setNewDescription] = useState('');
	const [newPriority, setNewPriority] = useState('');
	const [completedTodos, setCompletedTodos] = useState([]);
	const [isCompleted, setIsCompleted] = useState(false);

	function handleAddNew() {
		if (newTodoTitle === "" && newDescription === "" && newPriority === "") {
			alert("Please enter the details for the fields"); return false;
		} else if (newTodoTitle === "") {
			alert("Please enter the title"); return false;
		} else if (newDescription === "") {
			alert("Please enter the description"); return false;
		} else if (newPriority === "") {
			alert("Please enter the priority"); return false;
		}
		const newTodoObj = { title: newTodoTitle, description: newDescription, priority: newPriority };
		const sortedTodos = [...allTodos, newTodoObj].sort((a, b) => a.priority - b.priority);
		setAllTodos(sortedTodos);
	}

	function handleDelete(index) {
		const updatedTodosList = [...allTodos];
		updatedTodosList.splice(index, 1);
		setAllTodos(updatedTodosList);
	}

	function handleTodoDelete(index) {
		const addCompletedTodos = [...allTodos];
		addCompletedTodos.splice(index, 1);
		setAllTodos(addCompletedTodos);
	}

	function handleComplete(index) {
		const date = new Date();
		var dd = date.getDate();
		var mm = date.getMonth() + 1;
		var yyyy = date.getFullYear();
		var hh = date.getHours();
		var minutes = date.getMinutes();
		var ss = date.getSeconds();
		var finalDate = dd + '-' + mm + '-' + yyyy + ' at ' + hh + ':' + minutes + ':' + ss;
		let filteredTodo = { ...allTodos[index], completedOn: finalDate };

		let updatedCompletedList = [...completedTodos, filteredTodo];
		setCompletedTodos(updatedCompletedList);
		handleTodoDelete(index);
	}

	return (
		<div className="App">
			<h1>My Todos</h1>

			<div className="todo-wrapper">

				<div className="todo-input">
					<div className="todo-input-item">
						<label>Title:</label>
						<input
							type="text"
							value={newTodoTitle}
							onChange={e => setNewTodoTitle(e.target.value)}
							placeholder="What's the title of your To Do?"
						/>
					</div>
					<div className="todo-input-item">
						<label>Description:</label>
						<input
							type="text"
							value={newDescription}
							onChange={e => setNewDescription(e.target.value)}
							placeholder="What's the description of your To Do?"
						/>
					</div>
					<div className="todo-input-item">
						<label>Priority:</label>
						<input
							type="text"
							value={newPriority}
							onChange={e => setNewPriority(e.target.value)}
							placeholder="What's the priority of your To Do?"
						/>
					</div>
					<div className="todo-input-item">
						<button
							className="primary-btn"
							type="button"
							onClick={handleAddNew}
						>
							Add
						</button>
					</div>
				</div>
				<div className="btn-area">
					<button
						className={`secondaryBtn ${isCompleted === false && 'active'}`}
						onClick={() => setIsCompleted(false)}
					>
						Todo
					</button>
					<button
						className={`secondaryBtn ${isCompleted === true && 'active'}`}
						onClick={() => setIsCompleted(true)}
					>
						Completed
					</button>
				</div>

				<div className="todo-list">
					{isCompleted === false && allTodos.length > 0 && allTodos.map((todo, index) => (
						<TodoList key={index} index={index} todos={todo} handleDelete={handleDelete} handleComplete={handleComplete} />
					))}

					{isCompleted === true && completedTodos.length > 0 && completedTodos.map((todo, index) => (
						<TodoList key={index} index={index} todos={todo} handleDelete={handleDelete} handleComplete={handleComplete} />
					))}
				</div>
			</div>
		</div>
	)
}
