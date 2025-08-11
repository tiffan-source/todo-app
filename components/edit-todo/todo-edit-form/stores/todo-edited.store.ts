import { CreateTodoOutput, IEditTodoPresenter, outputDto } from "todo-usecase";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface TodoEditedStore {
    todoEdited?: {
        title?: string;
        success?: boolean;
        errorMessage?: string;
    };

    reset: () => void;

    presentTodoEdited: (output: outputDto<CreateTodoOutput>) => void;
}

export const useTodoEditedStore = create<TodoEditedStore>()(
    subscribeWithSelector((set) => ({
        todoEdited: undefined,

        presentTodoEdited: (output: outputDto<CreateTodoOutput>) => {
            const { error, success, result } = output;
            if (success && result) {
                set({
                    todoEdited: {
                        title: result.title,
                        success,
                        errorMessage: undefined,
                    },
                });
            } else {
                set({
                    todoEdited: {
                        title: undefined,
                        success,
                        errorMessage: error?.[0].message,
                    },
                });
            }
        },

        reset: () => set({ todoEdited: undefined }),
    }))
);

export const todoEditedPresenter: IEditTodoPresenter = {
    present: useTodoEditedStore.getState().presentTodoEdited,
};
