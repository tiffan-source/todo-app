import { Card } from "@/components/ui/card";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { useTodoStore } from "@/store/todo.store";
import React from "react";
import { View, FlatList, Pressable } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import { Text } from "@/components/ui/text";
import useEffectGetAllTodoDueToday from "./hooks/get-all-todo-due-today.hooks";
import useEffectCheckTodoFromToday from "./hooks/check-todo-from-today.hook";
import { InteractorGraph } from "@/main/interactor.graph";
import { useTodayTodoStore } from "./stores/today-todo.store";
import { useRouter } from "expo-router";
import LabelFilter from "@/components/common/label-filter/LabelFilter";
import LabelTag from "@/components/common/label-tag/LabelTag";
import { Box } from "@/components/ui/box";

const AllTodoDueToday = ({
    checkTodoUseCase,
    getTodoByIdForEditionUseCase,
}: DependenciesOf<
    InteractorGraph,
    "checkTodoUseCase" | "getTodoByIdForEditionUseCase"
>) => {
    const todos = useTodayTodoStore((state) => state.todos);
    useEffectGetAllTodoDueToday();
    useEffectCheckTodoFromToday();
    const router = useRouter();

    return (
        <Box className="p-4">
            <LabelFilter />
            <FlatList
                className="mt-4"
                data={todos}
                renderItem={({ item }) => (
                    <Card
                        size="md"
                        className="mb-4 flex flex-row items-start justify-start gap-4"
                    >
                        <Checkbox
                            className="mt-1"
                            value={"unchecked"} // This must always be unchecked
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
                                    useTodoStore
                                        .getState()
                                        .resetTodoSelectToEdit();
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
                            {item.description && (
                                <Text>{item.description}</Text>
                            )}
                            <View className="flex flex-row items-center gap-2">
                                {item.labels.map((label) => (
                                    <LabelTag
                                        key={label.id}
                                        label={label}
                                    />
                                ))}
                            </View>
                        </View>
                    </Card>
                )}
            />
        </Box>
    );
};

export default injectComponent(AllTodoDueToday, InteractorGraph);
