import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface TodoCreateStore {
    todo: TodoCreatedViewModel;
    setTodoCreate: (todo: TodoCreatedViewModel) => void;
    reset: () => void;
}

export const useTodoCreateStore = create<TodoCreateStore>()(
    subscribeWithSelector((set) => ({
        todo: {},
        setTodoCreate: (todo) => set({ todo }),
        reset: () => set({ todo: {} }),
    }))
);
