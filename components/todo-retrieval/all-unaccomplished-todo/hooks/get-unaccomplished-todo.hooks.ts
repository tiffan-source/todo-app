import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
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
    checkTodoPresenter,
}: DependenciesOf<
    [ControllerGraph, PresenterGraph],
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
                console.log("Todo checked:", data);
                getAllUnaccomplishedTodoController.getAllTodos();
            });
        }, [])
    );

    return {
        todos,
    };
};

export default injectHook(useGetAllUnaccomplishedTodoTodo, AppGraph);
