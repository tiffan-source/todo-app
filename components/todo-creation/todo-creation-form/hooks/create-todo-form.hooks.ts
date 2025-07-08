import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { TodoCreationGraph } from "@/main/todo-creation/todo-creation.graph";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

let useCreateTodoForm = ({
    createTodoPresenter,
}: DependenciesOf<TodoCreationGraph, "createTodoPresenter">) => {
    const [creationError, setCreationError] = useState<string | undefined>(
        undefined
    );
    const [waitingForCreation, setWaitingForCreation] =
        useState<boolean>(false);
    const [success, setSuccess] = useState<boolean>(false);

    const presenter = createTodoPresenter;

    useEffect(() => {
        presenter.setCallback((data: TodoCreatedViewModel) => {
            if (data.success) {
                setCreationError(undefined);
                setSuccess(true);
            } else {
                setCreationError(data.errorMessage);
                setSuccess(false);
            }
            setWaitingForCreation(false);
        });

        if (success) {
            router.back();
        }
    }, [success]);

    return {
        creationError,
        waitingForCreation,
        setCreationError,
        setWaitingForCreation,
    };
};

export default injectHook(useCreateTodoForm, TodoCreationGraph);
