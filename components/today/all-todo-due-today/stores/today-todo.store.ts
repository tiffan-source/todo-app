import {
    GetAllTodoOutput,
    IGetAllTodoPresenter,
    outputDto,
} from "todo-usecase";
import { create } from "zustand";

interface TodayTodoStore {
    todos: {
        id: string;
        title: string;
        description: string;
        labels: {
            id: string;
            name: string;
            color: string;
        }[];
    }[];
    todosRetrieved?: {
        errorMessage?: string;
        success: boolean;
    };

    presentAllTodos: (output: outputDto<GetAllTodoOutput>) => void;
}

export const useTodayTodoStore = create<TodayTodoStore>()((set) => ({
    todos: [],
    todosRetrieved: undefined,

    presentAllTodos: (output: outputDto<GetAllTodoOutput>) => {
        console.log("presentAllTodos", output);
        let { error, success, result } = output;
        if (success && result) {
            set({
                todos: result.map((todo) => ({
                    id: todo.todoId,
                    title: todo.title,
                    description: todo.description || "",
                    labels:
                        todo.labels?.map((label) => ({
                            id: label.id,
                            name: label.name,
                            color: label.color || "#000000",
                        })) || [],
                })),
                todosRetrieved: {
                    errorMessage: undefined,
                    success,
                },
            });
        } else {
            set({
                todosRetrieved: { errorMessage: error?.[0].message, success },
            });
        }
    },
}));

export const getAllTodayTodoPresenter: IGetAllTodoPresenter = {
    present: useTodayTodoStore.getState().presentAllTodos,
};
