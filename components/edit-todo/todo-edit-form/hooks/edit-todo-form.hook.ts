import { useSelectTodoForEditionStore } from "@/store/select-todo-for-edition.store";
import { router } from "expo-router";
import { useEffect, useState } from "react";

export const useEditTodoFormHook = () => {
    const [waitingForEdition, setWaitingForEdition] = useState<boolean>(false);
    const [errorMessage, setErrorMessage] = useState<string | undefined>(
        undefined
    );
    useEffect(() => {
        const sub = useSelectTodoForEditionStore.subscribe(
            (state) => ({
                success: state.editionTodo.successEdition,
                errorEdition: state.editionTodo.errorMessageEdition,
            }),
            ({ success, errorEdition }) => {
                if (success) {
                    router.back();
                    setWaitingForEdition(false);
                } else if (success === false && errorEdition) {
                    setWaitingForEdition(true);
                    setErrorMessage(errorEdition);
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
