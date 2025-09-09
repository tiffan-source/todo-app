import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTodoCreatedStore } from "../stores/todo-created.store";

export let useCreateTodoForm = () => {
    useEffect(() => {
        let sub = useTodoCreatedStore.subscribe(
            (state) => state.todoCreated?.success,
            (success) => {
                if (success === true) {
                    router.back();
                } else if (success === false) {
                    setWaitingForCreation(false);
                }
            }
        );

        return () => {
            sub();
        };
    }, []);

    const creationError = useTodoCreatedStore(
        (state) => state.todoCreated?.errorMessage
    );

    const resetTodoCreation = useTodoCreatedStore((state) => state.reset);

    const [waitingForCreation, setWaitingForCreation] =
        useState<boolean>(false);

    return {
        creationError,
        waitingForCreation,
        setWaitingForCreation,
        resetTodoCreation,
    };
};
