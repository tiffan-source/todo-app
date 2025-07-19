import { ControllerGraph } from "@/main/controller.graph";
import { useTodoCheckStore } from "@/store/todo-check.store";
import { useEffect } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectCheckTodoFromToday = ({
    getAllTodoController,
}: DependenciesOf<[ControllerGraph], "getAllTodoController">) => {
    useEffect(() => {
        let sub = useTodoCheckStore.subscribe(
            (store) => store.todoCheck.todoId,
            (todoId) => {
                getAllTodoController.getAllTodos({
                    dueDate: [new Date()], // Only fetch todos due today
                    done: false, // Only fetch unaccomplished todos
                });
            }
        );
        return () => {
            sub();
        };
    }, []);
};

export default injectHook(useEffectCheckTodoFromToday, ControllerGraph);
