import { TodoEditedViewModel } from "@/back-for-front/shared/view-models/TodoEditedViewModel";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface SelectTodoForEditionStore {
    editionTodo: TodoEditedViewModel;
    setEditionTodo: (todo: TodoEditedViewModel) => void;
    clearEditionTodo: () => void;
}

export const useSelectTodoForEditionStore = create<SelectTodoForEditionStore>()(
    subscribeWithSelector((set) => ({
        editionTodo: {},
        setEditionTodo: (todo: TodoEditedViewModel) =>
            set({ editionTodo: todo }),
        clearEditionTodo: () => set({ editionTodo: {} }),
    }))
);
