import { InteractorGraph } from "@/main/interactor.graph";
import { useTodoStore } from "@/store/todo.store";
import { useEffect } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectCheckTodoFromBacklog = ({
    getAllUnDoneTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getAllUnDoneTodoUseCase">) => {
    useEffect(() => {
        let sub = useTodoStore.subscribe(
            (store) => store.todoChecked,
            () => {
                getAllUnDoneTodoUseCase.execute({
                    timestamp: new Date(),
                    input: {
                        filters: {
                            done: false, // Only fetch unaccomplished todos
                        },
                    },
                });
            }
        );
        return () => {
            sub();
        };
    }, []);
};

export default injectHook(useEffectCheckTodoFromBacklog, InteractorGraph);
