/* eslint-disable no-case-declarations */
import actions from './actions';
import { IAction, IStore, ITodo } from './interface';

export const initialState: IStore = {
    user: {},
    todos: [],
};

const reducer = (state: IStore, action: IAction) => {
    switch (action.type) {
        case actions.SET_USER:
            return {
                ...state,
                user: action.payload,
            };
        case actions.LOGOUT:
            return {
                ...state,
                user: action.payload,
            };
        case actions.ADD_TODO:
            return {
                ...state,
                todos: [...state.todos, action.payload],
            };
        case actions.TODO_COMPLETE:
            return {
                ...state,
                todos: state.todos.map((todo) =>
                    todo.id === action.payload
                        ? { ...todo, isFinished: true }
                        : todo
                ),
            };
        case actions.REMOVE_TODO:
            return {
                ...state,
                todos: state.todos.filter((todo) => todo.id !== action.payload),
            };
        case actions.ADD_SUB_TODO:
            const todoIndex = state.todos.findIndex(
                (todo) => todo.id === action.payload.todoId
            );
            return {
                ...state,
                todos: state.todos.map((todo, index) => {
                    return index === todoIndex
                        ? {
                              ...todo,
                              subTodos: todo?.subTodos?.length
                                  ? [...todo.subTodos, action.payload]
                                  : [action.payload],
                          }
                        : todo;
                }),
            };
        case actions.SUBTODO_COMPLETE:
            console.log(state.todos);
            const index = state.todos.findIndex(
                (todo) => todo.id === action.payload.todoId
            );
            const updatedSubTodo = state.todos[index]?.subTodos?.map(
                (subTodo) =>
                    subTodo?.id === action?.payload?.subTodoId
                        ? { ...subTodo, isFinished: true }
                        : subTodo
            );

            return {
                ...state,
                todos: state.todos.map((todo, ind) =>
                    index === ind ? { ...todo, subTodos: updatedSubTodo } : todo
                ),
            };
        case actions.REMOVE_SUBTODO:
            const todoIdx = state.todos.findIndex(
                (todo) => todo.id === action.payload.todoId
            );
            const filteredSubTodos = state.todos[todoIdx]?.subTodos?.filter(
                (subTodo) => subTodo?.id !== action?.payload?.subTodoId
            );

            return {
                ...state,
                todos: state.todos.map((todo, index) => {
                    return index === todoIdx
                        ? { ...todo, subTodos: filteredSubTodos }
                        : todo;
                }),
            };
        default:
            return state;
    }
};

export default reducer;
