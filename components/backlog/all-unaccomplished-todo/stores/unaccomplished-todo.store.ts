import {
    GetAllTodoOutput,
    GetTodoByIdOutput,
    IGetAllTodoPresenter,
    outputDto,
} from "todo-usecase";
import { create } from "zustand";

interface UnaccomplishedTodoStore {
    todos: {
        id: string;
        title: string;
        description: string;
        dueDate: Date | null;
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

export const useUnaccomplishedTodoStore = create<UnaccomplishedTodoStore>()(
    (set) => ({
        todos: [],
        todoChecked: undefined,

        presentAllTodos: (output: outputDto<GetAllTodoOutput>) => {
            console.log("presentAllTodos", output);
            let { error, success, result } = output;
            if (success && result) {
                set({
                    todos: result.map((todo) => ({
                        id: todo.todoId,
                        title: todo.title,
                        description: todo.description || "",
                        dueDate: todo.dueDate ? new Date(todo.dueDate) : null,
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
                    todosRetrieved: {
                        errorMessage: error?.[0].message,
                        success,
                    },
                });
            }
        },
    })
);

export const getAllUndoneTodoPresenter: IGetAllTodoPresenter = {
    present: useUnaccomplishedTodoStore.getState().presentAllTodos,
};
