export interface IUser {
    id?: number;
    name?: string;
    email?: string;
    age?: number;
}

export interface ITodo {
    id: number;
    content: string;
    isFinished: boolean;
    subTodos: ITodo[];
}

export interface IAction {
    type: string;
    payload: ITodo | number | IUser | string | { id: number } | any;
}

export interface IStore {
    user: IUser;
    todos: ITodo[];
}

export interface IReducer {
    reducer: (
        state: IStore,
        action: IAction
    ) =>
        | IStore
        | {
              user: string;
              todos: ITodo[];
          };
}

export interface IProviderProps {
    reducer: (state: IStore, action: IAction) => IStore;
    initialState: IStore;
    children: React.ReactNode;
}
