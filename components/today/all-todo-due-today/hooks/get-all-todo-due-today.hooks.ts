import { InteractorGraph } from "@/main/interactor.graph";
import { useLabelStore } from "@/store/label.store";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllTodoDueToday = ({
    getTodayTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getTodayTodoUseCase">) => {
    let { labelsSelected } = useLabelStore();

    useFocusEffect(
        useCallback(() => {
            getTodayTodoUseCase.execute({
                timestamp: new Date(),
                input: {
                    filters: {
                        dueDate: [new Date()],
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

export default injectHook(useEffectGetAllTodoDueToday, InteractorGraph);
