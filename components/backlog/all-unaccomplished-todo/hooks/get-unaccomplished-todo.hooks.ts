import { InteractorGraph } from "@/main/interactor.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllUnaccomplishedTodo = ({
    getAllUnDoneTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getAllUnDoneTodoUseCase">) => {
    useFocusEffect(
        useCallback(() => {
            getAllUnDoneTodoUseCase.execute({
                timestamp: new Date(),
                input: {
                    filters: {
                        done: false,
                    },
                },
            });
        }, [])
    );
};

export default injectHook(useEffectGetAllUnaccomplishedTodo, InteractorGraph);
