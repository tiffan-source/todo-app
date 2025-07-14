import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import { AppGraph } from "@/main/app.grah";
import { ControllerGraph } from "@/main/controller.graph";
import { PresenterGraph } from "@/main/presenter.graph";
import { useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

let useGetAllUnaccomplishedTodoTodo = ({
    getAllUnaccomplishedTodoController,
    getAllUnaccomplishedTodoPresenter,
}: DependenciesOf<
    [ControllerGraph, PresenterGraph],
    "getAllUnaccomplishedTodoController" | "getAllUnaccomplishedTodoPresenter"
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
        }, [])
    );

    return {
        todos,
    };
};

export default injectHook(useGetAllUnaccomplishedTodoTodo, AppGraph);
