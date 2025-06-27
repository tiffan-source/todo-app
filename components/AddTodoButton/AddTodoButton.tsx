import React from "react";
import { Button, ButtonIcon } from "@/components/ui/button";
import { AddIcon } from "@/components/ui/icon";
import { useRouter } from "expo-router";

const AddTodoButton = () => {
    const router = useRouter();
    return (
        <Button
            size="xl"
            onPress={() => {
                router.push("/create-todo");
            }}
            action="secondary"
            className="self-center absolute bottom-12 p-4"
        >
            <ButtonIcon
                as={AddIcon}
                className="font-bold"
            />
        </Button>
    );
};

export default AddTodoButton;
