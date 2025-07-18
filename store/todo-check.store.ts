import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
interface TodoCheckStore {
    todoChecks: TodoCheckViewModel;
    setTodoCheck: (todoCheck: TodoCheckViewModel) => void;
    reset: () => void;
}

export const useTodoCheckStore = create<TodoCheckStore>()(
    subscribeWithSelector((set) => ({
        todoChecks: {},
        setTodoCheck: (todoCheck) => set({ todoChecks: todoCheck }),
        reset: () => set({ todoChecks: {} }),
    }))
);
