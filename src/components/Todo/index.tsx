/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-empty-pattern */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';

import './index.css';
import { ITodo } from '../../context/interface';
import actions from '../../context/actions';
import { useContextState } from '../../context/Provider';
import { faCodeBranch } from '@fortawesome/free-solid-svg-icons';

const Todo = ({ todo }: { todo: ITodo }) => {
    const [subTodo, setSubTodo] = useState('');
    const [isExpanded, setIsExpanded] = useState(false);
    const [{}, dispatch]: any = useContextState();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        setSubTodo(value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (subTodo) {
            dispatch({
                type: actions.ADD_SUB_TODO,
                payload: {
                    todoId: todo?.id,
                    id: Math.floor(Math.random() * 1000000),
                    content: subTodo,
                    isFinished: false,
                },
            });
            setSubTodo('');
        }
    };

    const removeTodo = (id: number) => {
        dispatch({
            type: actions.TODO_COMPLETE,
            payload: id,
        });
        setTimeout(() => {
            dispatch({
                type: actions.REMOVE_TODO,
                payload: id,
            });
        }, 2000);
    };

    const removeSubTodo = (id: number) => {
        dispatch({
            type: actions.SUBTODO_COMPLETE,
            payload: { todoId: todo?.id, subTodoId: id },
        });
        setTimeout(() => {
            dispatch({
                type: actions.REMOVE_SUBTODO,
                payload: { todoId: todo?.id, subTodoId: id },
            });
        }, 2000);
    };

    const handleToggleSubTodos = () => setIsExpanded(!isExpanded);

    return (
        <div className="todo-container">
            <div className={`todo ${todo?.isFinished ? 'todo-complete' : ''}`}>
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    onClick={() => removeTodo(todo?.id)}
                    className={`todo-checkbox ${
                        todo?.isFinished ? 'todo-checkbox-complete' : ''
                    }`}
                />
                <p className="todo-content">{todo?.content}</p>
                <button
                    type="button"
                    className="todo-subTodo-tree"
                    onClick={handleToggleSubTodos}
                >
                    <span>{todo?.subTodos?.length || 0}</span>
                    <FontAwesomeIcon icon={faCodeBranch} />
                </button>
            </div>
            {isExpanded && (
                <div className="todo-subTodo">
                    <form onSubmit={handleSubmit} className="todos-form">
                        <input
                            name="subTodo"
                            type="text"
                            value={subTodo}
                            onChange={handleChange}
                            placeholder="Add subtodo..."
                            aria-label="todo"
                            className="todos-input"
                        />
                        <button type="submit" className="todos-submit">
                            Submit
                        </button>
                    </form>
                    <div className="todo-subTodo-list">
                        {todo?.subTodos?.map((subTodo) => (
                            <div
                                key={subTodo?.id}
                                className={`todo-subTodo-item ${
                                    subTodo?.isFinished
                                        ? 'todo-subTodo-item-complete'
                                        : ''
                                }`}
                            >
                                <FontAwesomeIcon
                                    className={`todo-checkbox ${
                                        subTodo?.isFinished
                                            ? 'todo-checkbox-complete'
                                            : ''
                                    }`}
                                    icon={faCircleCheck}
                                    onClick={() => removeSubTodo(subTodo?.id)}
                                />
                                <p>{subTodo?.content}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Todo;
