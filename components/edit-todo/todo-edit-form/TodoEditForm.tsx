import InputSuggestion from "@/components/common/input-suggestion/InputSuggestion";
import { Box } from "@/components/ui/box";
import { Button, ButtonSpinner, ButtonText } from "@/components/ui/button";
import {
    FormControl,
    FormControlError,
    FormControlErrorIcon,
    FormControlErrorText,
} from "@/components/ui/form-control";
import { AlertCircleIcon, CalendarDaysIcon, Icon } from "@/components/ui/icon";
import { Input, InputField } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { DependenciesOf, injectComponent } from "react-obsidian";
import { useEditDateHook } from "./hooks/edit-date.hook";
import useEditLabelHook from "./hooks/edit-label.hook";
import { useEditTodoFormHook } from "./hooks/edit-todo-form.hook";
import { InteractorGraph } from "@/main/interactor.graph";
import { useTodoStore } from "@/store/todo.store";

type TodoEditionForms = {
    title: string;
    description: string;
};

const TodoEditForm = ({
    editTodoUseCase,
}: DependenciesOf<InteractorGraph, "editTodoUseCase">) => {
    let todo = useTodoStore((state) => state.todoSelectToEdit);

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm<TodoEditionForms>({
        values: {
            title: todo?.title || "",
            description: todo?.description || "",
        },
    });

    const {
        handleLabelTypingInput,
        tags,
        label,
        removeTagOnPress,
        labelSuggestions,
        handleSelectSuggestion,
    } = useEditLabelHook();

    const { date, setDate } = useEditDateHook();

    const { errorMessage, waitingForEdition, setWaitingForEdition } =
        useEditTodoFormHook();

    if (!todo) {
        return <Text>Loading</Text>;
    }

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
                            <Input
                                size="xl"
                                className="border-0"
                            >
                                <InputField
                                    className="font-bold "
                                    size="6xl"
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
                    placeholder="Add tags (e.g. #work, #urgent)"
                />

                <Box className="flex-row justify-between items-center gap-2">
                    <Box className="flex-row items-center">
                        <Icon
                            as={CalendarDaysIcon}
                            size="xl"
                        />
                        <Box>
                            {date &&
                                (() => {
                                    return (
                                        <DateTimePicker
                                            value={date}
                                            mode="date"
                                            display="default"
                                            minimumDate={new Date()}
                                            onChange={(event, date) => {
                                                if (date) {
                                                    setDate(date);
                                                }
                                            }}
                                        />
                                    );
                                })()}
                        </Box>
                    </Box>
                    <Box>
                        <Switch
                            size="md"
                            isDisabled={false}
                            value={date !== undefined}
                            onToggle={() => {
                                setDate(date ? undefined : new Date());
                            }}
                        />
                    </Box>
                </Box>

                <Text className="text-error-500">{errorMessage}</Text>

                <Button
                    onPress={handleSubmit((data) => {
                        editTodoUseCase.execute({
                            timestamp: new Date(),
                            input: {
                                todoId: todo.id,
                                newData: {
                                    title: data.title,
                                    description: data.description,
                                    labelIds: tags
                                        .filter((tag) => tag.id)
                                        .map((tag) => tag.id as string),
                                    newLabelTitles: tags
                                        .filter((tag) => !tag.id)
                                        .map((tag) => tag.name),
                                    dueDate: date,
                                },
                            },
                        });
                        setWaitingForEdition(true);
                    })}
                >
                    {waitingForEdition && <ButtonSpinner />}
                    <ButtonText>Save</ButtonText>
                </Button>
            </Box>
        </TouchableWithoutFeedback>
    );
};

export default injectComponent(TodoEditForm, InteractorGraph);
