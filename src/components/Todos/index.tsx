/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

import './index.css';
import Todo from '../Todo';
import actions from '../../context/actions';
import { ITodo } from '../../context/interface';
import { useContextState } from '../../context/Provider';

const Todos = () => {
    const [todo, setTodo] = useState('');

    const [{ todos }, dispatch]: any = useContextState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setTodo(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (todo) {
            dispatch({
                type: actions.ADD_TODO,
                payload: {
                    id: Math.floor(Math.random() * 1000000),
                    content: todo,
                    isFinished: false,
                    subTodo: [],
                },
            });
            setTodo('');
        }
    };

    return (
        <div className="todos">
            <h4 className="todos-title">My Todos</h4>
            <div className="todos-body">
                <form onSubmit={handleSubmit} className="todos-form">
                    <input
                        name="todo"
                        type="text"
                        value={todo}
                        onChange={handleChange}
                        placeholder="Add todo"
                        aria-label="todo"
                        className="todos-input"
                    />
                    <button type="submit" className="todos-submit">
                        Submit
                    </button>
                </form>
                <div className="todos-container">
                    {todos.map((todo: ITodo) => (
                        <Todo key={todo?.id} todo={todo} />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Todos;
