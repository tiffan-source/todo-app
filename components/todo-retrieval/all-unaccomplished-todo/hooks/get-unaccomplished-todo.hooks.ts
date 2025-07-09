import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { GlobalGraph } from "@/main/global.graph";
import { TodoModificationGraph } from "@/main/todo-modification/todo-modificaton.graph";
import { TodoRetrievalGraph } from "@/main/todo-retrieval/todo-retrieval.graph";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

let useGetAllUnaccomplishedTodoTodo = ({
    getAllUnaccomplishedTodoController,
    getAllUnaccomplishedTodoPresenter,
    checkTodoPresenter,
}: DependenciesOf<
    [GlobalGraph, TodoRetrievalGraph, TodoModificationGraph],
    | "getAllUnaccomplishedTodoController"
    | "getAllUnaccomplishedTodoPresenter"
    | "checkTodoPresenter"
>) => {
    const [todos, setTodos] = useState<TodoTicketViewModel[]>([]);

    useFocusEffect(
        useCallback(() => {
            getAllUnaccomplishedTodoController.getAllTodos();
            getAllUnaccomplishedTodoPresenter.setCallback(
                (data: TodoTicketViewModel[]) => {
                    setTodos(data);
                }
            );

            checkTodoPresenter.setCallback((data: TodoCheckViewModel) => {
                getAllUnaccomplishedTodoController.getAllTodos();
            });
        }, [])
    );

    return {
        todos,
    };
};

export default injectHook(useGetAllUnaccomplishedTodoTodo, GlobalGraph);
