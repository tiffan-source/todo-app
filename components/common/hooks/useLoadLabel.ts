import { InteractorGraph } from "@/main/interactor.graph";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectLoadLabel = ({
    getAllLabelUseCase,
}: DependenciesOf<[InteractorGraph], "getAllLabelUseCase">) => {
    useFocusEffect(
        useCallback(() => {
            getAllLabelUseCase.execute({
                timestamp: new Date(),
                input: undefined,
            });
        }, [])
    );
};

export default injectHook(useEffectLoadLabel, InteractorGraph);
