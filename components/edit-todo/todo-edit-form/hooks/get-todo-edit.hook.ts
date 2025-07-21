import { AppGraph } from "@/main/app.grah";
import { ControllerGraph } from "@/main/controller.graph";
import { useLocalSearchParams } from "expo-router";
import { useEffect } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetTodoEdit = ({
    getTodoByIdController,
}: DependenciesOf<ControllerGraph, "getTodoByIdController">) => {
    const local = useLocalSearchParams();

    useEffect(() => {
        console.log("useEffectGetTodoEdit", local);
        getTodoByIdController.getTodoById(local["edit-todo"] as string);
    }, [local]);
};

export default injectHook(useEffectGetTodoEdit, AppGraph);
