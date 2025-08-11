import React from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";
import { DependenciesOf, inject, injectComponent } from "react-obsidian";
import { InteractorGraph } from "@/main/interactor.graph";

const AddTodoButton = ({
    getAllLabelUseCase,
}: DependenciesOf<InteractorGraph, "getAllLabelUseCase">) => {
    const router = useRouter();
    return (
        <Button
            size="xl"
            onPress={() => {
                getAllLabelUseCase.execute({
                    timestamp: new Date(),
                    input: undefined,
                });
                router.push("/create-todo");
            }}
            action="secondary"
            className="self-center absolute bottom-12 p-4"
        >
            <ButtonIcon
                as={AddIcon}
                className="font-bold"
            />
        </Button>
    );
};

export default injectComponent(AddTodoButton, InteractorGraph);
