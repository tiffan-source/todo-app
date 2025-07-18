import { ControllerGraph } from "@/main/controller.graph";
import { useTodoCheckStore } from "@/store/todo-check.store";
import { router } from "expo-router";
import { useEffect } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useCheckTodo = ({
    getAllUnaccomplishedTodoController,
}: DependenciesOf<[ControllerGraph], "getAllUnaccomplishedTodoController">) => {
    useEffect(() => {
        let sub = useTodoCheckStore.subscribe(
            (store) => store.todoChecks.todoId,
            (todoId) => {
                console.log("Todo checks success:", todoId);
                getAllUnaccomplishedTodoController.getAllTodos();
            }
        );
        return () => {
            sub();
            console.log("Unsubscribed from todo checks success");
        };
    }, []);
};

export default injectHook(useCheckTodo, ControllerGraph);
