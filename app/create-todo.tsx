import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Input, InputField } from "@/components/ui/input";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";

const CreateTodo = () => {
    return (
        <Box className="flex-1 p-4">
            <Input
                size="lg"
                className="mb-4"
            >
                <InputField placeholder="New Task" />
            </Input>

            <Textarea
                size="lg"
                className="mb-4"
            >
                <TextareaInput placeholder="Enter detailed description..." />
            </Textarea>

            <Button>
                <ButtonText>Create</ButtonText>
            </Button>
        </Box>
    );
};

export default CreateTodo;
