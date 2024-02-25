import React from 'react';
import { AiOutlineDelete } from 'react-icons/ai';
import { BsCheckLg } from 'react-icons/bs';

export default function TodoList({ index, todos, handleDelete, handleComplete }) {

	return (
		<div className="todo-list-item">
			<div>
				<h3>{todos.title}</h3>
				<p>{todos.description}</p>
			</div>
			<div>
				<AiOutlineDelete
					title="Delete?"
					className="icon"
					onClick={() => handleDelete(index)}
				/>
				<BsCheckLg
					title="Completed?"
					className=" check-icon"
					onClick={() => handleComplete(index)}
				/>
			</div>
		</div>

	)
}
