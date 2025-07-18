import { ControllerGraph } from "@/main/controller.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllUnaccomplishedTodo = ({
    getAllTodoController,
}: DependenciesOf<[ControllerGraph], "getAllTodoController">) => {
    useFocusEffect(
        useCallback(() => {
            getAllTodoController.getAllTodos({
                done: false, // Only fetch unaccomplished todos
            });
        }, [])
    );
};

export default injectHook(useEffectGetAllUnaccomplishedTodo, ControllerGraph);
