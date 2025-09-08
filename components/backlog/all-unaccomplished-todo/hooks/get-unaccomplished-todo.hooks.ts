import { InteractorGraph } from "@/main/interactor.graph";
import { useLabelStore } from "@/store/label.store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllUnaccomplishedTodo = ({
    getAllUnDoneTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getAllUnDoneTodoUseCase">) => {
    const { labelsSelected } = useLabelStore();

    useFocusEffect(
        useCallback(() => {
            getAllUnDoneTodoUseCase.execute({
                timestamp: new Date(),
                input: {
                    filters: {
                        done: false,
                        labelIds:
                            labelsSelected && labelsSelected.length > 0
                                ? labelsSelected
                                : undefined,
                    },
                },
            });
        }, [])
    );
};

export default injectHook(useEffectGetAllUnaccomplishedTodo, InteractorGraph);
