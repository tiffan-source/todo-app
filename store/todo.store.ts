import { create } from "zustand";
import {
    outputDto,
    MarkTodoAsCompletedOutput,
    IMarkTodoAsCompletedPresenter,
    GetTodoByIdOutput,
    IGetTodoByIdPresenter,
} from "todo-usecase";
import { subscribeWithSelector } from "zustand/middleware";

interface TodoStore {
    todoChecked?: {
        title?: string;
        success?: boolean;
        errorMessage?: string;
    };

    todoSelectToEdit?: {
        id: string;
        title: string;
        description?: string;
        labels?: { id: string; name: string; color: string }[];
        dueDate?: Date;
    };

    resetTodoSelectToEdit: () => void;

    presentTodoChecked: (output: outputDto<MarkTodoAsCompletedOutput>) => void;
    presentTodoSelectToEdit: (output: outputDto<GetTodoByIdOutput>) => void;
}

export const useTodoStore = create<TodoStore>()(
    subscribeWithSelector((set) => ({
        todoChecked: undefined,

        presentTodoChecked: (output: outputDto<MarkTodoAsCompletedOutput>) => {
            const { error, success, result } = output;
            if (success && result) {
                set({
                    todoChecked: {
                        title: result.title,
                        success,
                        errorMessage: undefined,
                    },
                });
            } else {
                set({
                    todoChecked: {
                        title: undefined,
                        success,
                        errorMessage: error?.[0].message,
                    },
                });
            }
        },

        todoSelectToEdit: undefined,

        presentTodoSelectToEdit: (output: outputDto<GetTodoByIdOutput>) => {
            const { error, success, result } = output;
            if (success && result) {
                set({
                    todoSelectToEdit: {
                        id: result.todoId,
                        title: result.title,
                        description: result.description,
                        labels: result.labels
                            ? result.labels.map((label) => ({
                                  id: label.id,
                                  name: label.name,
                                  color: label.color || "#000000",
                              }))
                            : [],
                        dueDate: result.dueDate
                            ? new Date(result.dueDate)
                            : undefined,
                    },
                });
            } else {
                set({ todoSelectToEdit: undefined });
            }
        },

        resetTodoSelectToEdit: () => {
            set({ todoSelectToEdit: undefined });
        },
    }))
);

export const markTodoAsCompletedPresenter: IMarkTodoAsCompletedPresenter = {
    present: useTodoStore.getState().presentTodoChecked,
};

export const getTodoByIdForEditionPresenter: IGetTodoByIdPresenter = {
    present: useTodoStore.getState().presentTodoSelectToEdit,
};
