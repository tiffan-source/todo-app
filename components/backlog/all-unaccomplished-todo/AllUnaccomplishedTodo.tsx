import { Card } from "@/components/ui/card";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { InteractorGraph } from "@/main/interactor.graph";
import { useTodoStore } from "@/store/todo.store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import useEffectCheckTodoFromBacklog from "./hooks/check-todo-from-backlog.hook";
import useEffectGetAllUnaccomplishedTodo from "./hooks/get-unaccomplished-todo.hooks";
import { useUnaccomplishedTodoStore } from "./stores/unaccomplished-todo.store";

const AllUnaccomplishedTodo = ({
    checkTodoUseCase,
    getTodoByIdForEditionUseCase,
}: DependenciesOf<
    InteractorGraph,
    "checkTodoUseCase" | "getTodoByIdForEditionUseCase"
>) => {
    const todos = useUnaccomplishedTodoStore((state) => state.todos);
    useEffectCheckTodoFromBacklog();
    useEffectGetAllUnaccomplishedTodo();
    const router = useRouter();

    return (
        <FlatList
            className="p-4"
            data={todos}
            renderItem={({ item }) => (
                <Card
                    size="md"
                    className="mb-4 flex flex-row items-start justify-start gap-4"
                >
                    <Checkbox
                        className="mt-1"
                        value={"unchecked"}
                        size="md"
                        onChange={() => {
                            checkTodoUseCase.execute({
                                timestamp: new Date(),
                                input: {
                                    todoId: item.id,
                                },
                            });
                        }}
                    >
                        <CheckboxIndicator>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                    </Checkbox>
                    <View>
                        <Pressable
                            onPress={() => {
                                useTodoStore.getState().resetTodoSelectToEdit();
                                getTodoByIdForEditionUseCase.execute({
                                    input: {
                                        idTodo: item.id,
                                    },
                                    timestamp: new Date(),
                                });
                                router.push(`/${item.id}`);
                            }}
                        >
                            <Text
                                size="lg"
                                bold
                            >
                                {item.title}
                            </Text>
                        </Pressable>
                        <Text>{item.description}</Text>
                        <View className="flex flex-row items-center gap-2 mt-2">
                            {item.labels.map((label) => (
                                <View
                                    key={label.id}
                                    className="px-2 py-1 rounded-full"
                                    style={{
                                        backgroundColor: label.color,
                                    }}
                                >
                                    <Text className="font-semibold">
                                        #{label.name}
                                    </Text>
                                </View>
                            ))}
                        </View>
                        {item.dueDate && (
                            <Text>{item.dueDate.toISOString()}</Text>
                        )}
                    </View>
                </Card>
            )}
        />
    );
};

export default injectComponent(AllUnaccomplishedTodo, InteractorGraph);
