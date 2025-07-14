import { View, FlatList } from "react-native";
import React from "react";
import useGetAllTodo from "./hooks/get-unaccomplished-todo.hooks";
import { Card } from "@/components/ui/card";
import {
    Checkbox,
    CheckboxIcon,
    CheckboxIndicator,
} from "@/components/ui/checkbox";
import { CheckIcon } from "@/components/ui/icon";
import { Text } from "@/components/ui/text";
import { DependenciesOf, injectComponent } from "react-obsidian";
import { ControllerGraph } from "@/main/controller.graph";

const AllUnaccomplishedTodo = ({
    checkTodoController,
}: DependenciesOf<ControllerGraph, "checkTodoController">) => {
    const { todos } = useGetAllTodo();

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
                        <Text
                            size="lg"
                            bold
                        >
                            {item.title}
                        </Text>
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
                    </View>
                </Card>
            )}
        />
    );
};

export default injectComponent(AllUnaccomplishedTodo, ControllerGraph);
