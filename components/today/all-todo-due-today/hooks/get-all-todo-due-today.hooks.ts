import { ControllerGraph } from "@/main/controller.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllTodoDueToday = ({
    getAllTodoController,
}: DependenciesOf<[ControllerGraph], "getAllTodoController">) => {
    useFocusEffect(
        useCallback(() => {
            getAllTodoController.getAllTodos({
                done: false, // Only fetch unaccomplished todos
                dueDate: [new Date()], // Only fetch todos due today
            });
        }, [])
    );
};

export default injectHook(useEffectGetAllTodoDueToday, ControllerGraph);
