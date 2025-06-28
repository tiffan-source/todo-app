import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import TodoCreationForm from "@/components/todo-creation/todo-creation-form/TodoCreationForm";

const CreateTodo = () => {
    return (
        <>
            <TodoCreationForm />
        </>
    );
};

export default CreateTodo;
