import { InteractorGraph } from "@/main/interactor.graph";
import { useTodoStore } from "@/store/todo.store";
import { useEffect } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useEffectCheckTodoFromToday = ({
    getTodayTodoUseCase,
}: DependenciesOf<[InteractorGraph], "getTodayTodoUseCase">) => {
    useEffect(() => {
        let sub = useTodoStore.subscribe(
            (store) => store.todoChecked,
            () => {
                getTodayTodoUseCase.execute({
                    timestamp: new Date(),
                    input: {
                        filters: {
                            dueDate: [new Date()],
                            done: false,
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

export default injectHook(useEffectCheckTodoFromToday, InteractorGraph);
