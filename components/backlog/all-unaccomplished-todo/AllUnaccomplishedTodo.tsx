import { Card } from "@/components/ui/card";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { ControllerGraph } from "@/main/controller.graph";
import { useSelectTodoForEditionStore } from "@/store/select-todo-for-edition.store";
import { useTodoStore } from "@/store/todo.store";
import { useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, View } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import useEffectCheckTodoFromBacklog from "./hooks/check-todo-from-backlog.hook";
import useEffectGetAllUnaccomplishedTodo from "./hooks/get-unaccomplished-todo.hooks";

const AllUnaccomplishedTodo = ({
    checkTodoController,
    getTodoByIdController,
    getAllLabelController,
}: DependenciesOf<
    ControllerGraph,
    "checkTodoController" | "getTodoByIdController" | "getAllLabelController"
>) => {
    const todos = useTodoStore((state) => state.todos);
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
                        value={item.checked ? "checked" : "unchecked"} // This must always be unchecked
                        size="md"
                        onChange={() => {
                            checkTodoController.checkTodo(item.id);
                        }}
                    >
                        <CheckboxIndicator>
                            <CheckboxIcon as={CheckIcon} />
                        </CheckboxIndicator>
                    </Checkbox>
                    <View>
                        <Pressable
                            onPress={() => {
                                useSelectTodoForEditionStore
                                    .getState()
                                    .clearEditionTodo();
                                getAllLabelController.getAllLabels();
                                getTodoByIdController.getTodoById(item.id);
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
                        {item.dueDate && <Text>{item.dueDate}</Text>}
                    </View>
                </Card>
            )}
        />
    );
};

export default injectComponent(AllUnaccomplishedTodo, ControllerGraph);
