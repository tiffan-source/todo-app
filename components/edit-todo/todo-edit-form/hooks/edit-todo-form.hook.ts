import { router } from "expo-router";
import { useEffect, useState } from "react";
import { useTodoEditedStore } from "../stores/todo-edited.store";

export const useEditTodoFormHook = () => {
    const [waitingForEdition, setWaitingForEdition] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    useEffect(() => {
        const sub = useTodoEditedStore.subscribe(
            (state) => ({
                success: state.todoEdited?.success,
            }),
            ({ success }) => {
                if (success) {
                    router.back();
                    setWaitingForEdition(false);
                } else if (success === false) {
                    setWaitingForEdition(true);
                    setErrorMessage("Failed to edit todo. Please try again.");
                }
            }
        );

        return () => {
            sub();
        };
    }, []);

    return {
        errorMessage,
        waitingForEdition,
        setWaitingForEdition,
    };
};
