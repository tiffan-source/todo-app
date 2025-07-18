import { ControllerGraph } from "@/main/controller.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useGetAllUnaccomplishedTodoTodo = ({
    getAllUnaccomplishedTodoController,
}: DependenciesOf<[ControllerGraph], "getAllUnaccomplishedTodoController">) => {
    useFocusEffect(
        useCallback(() => {
            getAllUnaccomplishedTodoController.getAllTodos();
        }, [])
    );
};

export default injectHook(useGetAllUnaccomplishedTodoTodo, ControllerGraph);
