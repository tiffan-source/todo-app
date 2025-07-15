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
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import useTodoCreationForm from "./hooks/create-todo-form.hooks";
import { Text } from "@/components/ui/text";
import useLabelInputHook from "./hooks/label-input.hook";
import { ControllerGraph } from "@/main/controller.graph";
import InputSuggestion from "@/components/common/input-suggestion/InputSuggestion";

type TodoCreationForms = {
    title: string;
    description: string;
};

const TodoCreationForm = ({
    createTodoController,
}: DependenciesOf<ControllerGraph, "createTodoController">) => {
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

    const {
        handleLabelTypingInput,
        tags,
        label,
        removeTagOnPress,
        labelSuggestions,
        handleSelectSuggestion,
    } = useLabelInputHook();

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

                <Box className="flex-row flex-wrap gap-2 mb-2">
                    {tags.map((tag, index) => (
                        <Text
                            onPress={() => removeTagOnPress(index)}
                            key={index}
                            className="text-primary-950 font-semibold"
                        >
                            #{tag.name}
                        </Text>
                    ))}
                </Box>

                <InputSuggestion
                    onChange={handleLabelTypingInput}
                    suggestions={labelSuggestions.map((s) => ({
                        value: s.id,
                        label: s.name,
                    }))}
                    value={label}
                    onSelectSuggestion={handleSelectSuggestion}
                />

                <Text className="text-error-500">{creationError}</Text>

                <Button
                    onPress={handleSubmit((data) => {
                        createTodoController.createTodo(
                            data.title,
                            data.description,
                            tags
                                .filter((tag) => tag.id)
                                .map((tag) => tag.id as string),
                            tags.filter((tag) => !tag.id).map((tag) => tag.name)
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

export default injectComponent(TodoCreationForm, ControllerGraph);
