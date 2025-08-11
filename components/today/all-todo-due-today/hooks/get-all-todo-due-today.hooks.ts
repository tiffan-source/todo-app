import { InteractorGraph } from "@/main/interactor.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectGetAllTodoDueToday = ({
    getTodayTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getTodayTodoUseCase">) => {
    useFocusEffect(
        useCallback(() => {
            getTodayTodoUseCase.execute({
                timestamp: new Date(),
                input: {
                    filters: {
                        dueDate: [new Date()],
                        done: false,
                    },
                },
            });
        }, [])
    );
};

export default injectHook(useEffectGetAllTodoDueToday, InteractorGraph);
