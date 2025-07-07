import { TodoCreationGraph } from "@/main/todo-creation/todo-creation.graph";
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
    const presenter = createTodoPresenter;

    useEffect(() => {
        presenter.setCallback((data) => {
            if (data.success) {
                setCreationError(undefined);
            } else {
                setCreationError(data.errorMessage);
            }
            setWaitingForCreation(false);
        });
    }, []);

    return {
        creationError,
        waitingForCreation,
        setCreationError,
        setWaitingForCreation,
    };
};

export default injectHook(useCreateTodoForm, TodoCreationGraph);
