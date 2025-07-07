import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { TodoCreationGraph } from "@/main/todo-creation/todo-creation.graph";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, Text, TouchableWithoutFeedback } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import useTodoCreationForm from "./hooks/create-todo-form.hooks";

type TodoCreationForms = {
    title: string;
    description: string;
};

const TodoCreationForm = ({
    createTodoController,
}: DependenciesOf<TodoCreationGraph, "createTodoController">) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TodoCreationForms>({
        defaultValues: {
            title: "",
            description: "",
        },
    });

    const { creationError, waitingForCreation, setWaitingForCreation } =
        useTodoCreationForm();

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Box className="flex-1 p-4">
                <Controller
                    control={control}
                    name="title"
                    key="title"
                    rules={{
                        required: "Title is required",
                    }}
                    render={({ field: { value, onChange } }) => (
                        <FormControl
                            className="mb-4"
                            isInvalid={!!errors.title}
                        >
                            <Input size="lg">
                                <InputField
                                    placeholder="New Task"
                                    value={value}
                                    onChangeText={onChange}
                                />
                            </Input>
                            <FormControlError>
                                <FormControlErrorIcon as={AlertCircleIcon} />
                                <FormControlErrorText>
                                    {errors.title?.message}
                                </FormControlErrorText>
                            </FormControlError>
                        </FormControl>
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
                                onChangeText={onChange}
                            />
                        </Textarea>
                    )}
                />

                <Text className="text-error-500">{creationError}</Text>

                <Button
                    onPress={handleSubmit((data) => {
                        createTodoController.createTodo(
                            data.title,
                            data.description
                        );
                        setWaitingForCreation(true);
                    })}
                >
                    {waitingForCreation && <ButtonSpinner />}
                    <ButtonText>Create</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    );
};

export default injectComponent(TodoCreationForm, TodoCreationGraph);
