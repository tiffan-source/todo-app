import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Controller, useForm } from "react-hook-form";
import { injectComponent, DependenciesOf } from "react-obsidian";
import { TodoCreationGraph } from "@/configs/todo-creation/todo-creation.graph";

type TodoCreationForms = {
    title: string;
    description: string;
};

const TodoCreationForm = ({
    createTodoController,
}: DependenciesOf<TodoCreationGraph, "createTodoController">) => {
    const { control, handleSubmit, formState } = useForm<TodoCreationForms>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const createTodoSubmit = (data: TodoCreationForms) => {
        console.log("Creating Todo with data:", data);
    };

    return (
        <Box className="flex-1 p-4">
            <Controller
                control={control}
                name="title"
                rules={{
                    required: "Title is required",
                }}
                render={({ field: { value, onChange } }) => (
                    <Input
                        size="lg"
                        className="mb-4"
                    >
                        <InputField
                            placeholder="New Task"
                            value={value}
                            onChange={onChange}
                        />
                    </Input>
                )}
            />

            <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                    <Textarea
                        size="lg"
                        className="mb-4"
                    >
                        <TextareaInput
                            placeholder="Enter detailed description..."
                            value={value}
                            onChange={onChange}
                        />
                    </Textarea>
                )}
            />

            <Button onPress={handleSubmit(createTodoSubmit)}>
                <ButtonText>Create</ButtonText>
            </Button>
        </Box>
    );
};

export default injectComponent(TodoCreationForm, TodoCreationGraph);
