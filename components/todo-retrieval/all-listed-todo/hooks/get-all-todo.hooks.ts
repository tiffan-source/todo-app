import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { TodoRetrievalGraph } from "@/main/todo-retrieval/todo-retrieval.graph";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

let useGetAllTodo = ({
    getAllTodoController,
    getAllTodoPresenter,
}: DependenciesOf<
    TodoRetrievalGraph,
    "getAllTodoController" | "getAllTodoPresenter"
>) => {
    const [todos, setTodos] = useState<TodoTicketViewModel[]>([]);

    useFocusEffect(
        useCallback(() => {
            getAllTodoController.getAllTodos();
            getAllTodoPresenter.setCallback((data: TodoTicketViewModel[]) => {
                setTodos(data);
            });
        }, [])
    );

    return {
        todos,
    };
};

export default injectHook(useGetAllTodo, TodoRetrievalGraph);
