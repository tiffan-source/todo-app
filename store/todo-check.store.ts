import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface TodoCheckStore {
    todoCheck: TodoCheckViewModel;
    setTodoCheck: (todoCheck: TodoCheckViewModel) => void;
    reset: () => void;
}

export const useTodoCheckStore = create<TodoCheckStore>()(
    subscribeWithSelector((set) => ({
        todoCheck: {},
        setTodoCheck: (todoCheck) => set({ todoCheck }),
        reset: () => set({ todoCheck: {} }),
    }))
);
