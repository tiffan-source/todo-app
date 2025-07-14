import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";
import { useLabelInputHook } from "./label-input.hook";
import { PresenterGraph } from "@/main/presenter.graph";

let useCreateTodoForm = ({
    createTodoPresenter,
}: DependenciesOf<PresenterGraph, "createTodoPresenter">) => {
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
    }, [success, presenter]);

    return {
        creationError,
        waitingForCreation,
        setCreationError,
        setWaitingForCreation,
    };
};

export default injectHook(useCreateTodoForm, PresenterGraph);
