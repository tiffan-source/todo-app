import {
    CreateTodoOutput,
    outputDto,
    ICreateTodoPresenter,
} from "todo-usecase";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface TodoCreatedStore {
    todoCreated?: {
        title?: string;
        success?: boolean;
        errorMessage?: string;
    };

    reset: () => void;

    presentTodoCreated: (output: outputDto<CreateTodoOutput>) => void;
}

export const useTodoCreatedStore = create<TodoCreatedStore>()(
    subscribeWithSelector((set) => ({
        todoCreated: undefined,

        presentTodoCreated: (output: outputDto<CreateTodoOutput>) => {
            const { error, success, result } = output;
            if (success && result) {
                set({
                    todoCreated: {
                        title: result.title,
                        success,
                        errorMessage: undefined,
                    },
                });
            } else {
                set({
                    todoCreated: {
                        title: undefined,
                        success,
                        errorMessage: error?.[0].message,
                    },
                });
            }
        },

        reset: () => set({ todoCreated: undefined }),
    }))
);

export const createTodoPresenter: ICreateTodoPresenter = {
    present: useTodoCreatedStore.getState().presentTodoCreated,
};
