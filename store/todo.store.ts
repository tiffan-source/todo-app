import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { create } from "zustand";

interface TodoStore {
    todos: TodoTicketViewModel[];
    setTodos: (todos: TodoTicketViewModel[]) => void;
}

export const useTodoStore = create<TodoStore>()((set) => ({
    todos: [],
    setTodos: (todos: TodoTicketViewModel[]) => set({ todos }),
}));
