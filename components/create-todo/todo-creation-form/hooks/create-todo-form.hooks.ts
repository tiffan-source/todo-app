import { router } from "expo-router";
import { useTodoCreateStore } from "@/store/todo-create.store";
import { useEffect, useState } from "react";

export let useCreateTodoForm = () => {
    useEffect(() => {
        let sub = useTodoCreateStore.subscribe(
            (state) => state.todo.success,
            (success) => {
                if (success == true) {
                    router.back();
                } else if (success == false) {
                    setWaitingForCreation(false);
                }
            }
        );

        return () => {
            sub();
            console.log("Unsubscribed from todo creation success");
        };
    }, []);

    const creationError = useTodoCreateStore(
        (state) => state.todo.errorMessage
    );

    const resetTodoCreation = useTodoCreateStore((state) => state.reset);

    const [waitingForCreation, setWaitingForCreation] =
        useState<boolean>(false);

    return {
        creationError,
        waitingForCreation,
        setWaitingForCreation,
        resetTodoCreation,
    };
};
