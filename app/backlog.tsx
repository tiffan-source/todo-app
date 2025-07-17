import { View } from "react-native";
import React from "react";
import AllUnaccomplishedTodo from "@/components/todo-retrieval/all-unaccomplished-todo/AllUnaccomplishedTodo";

const Backlog = () => {
    return (
        <View>
            <AllUnaccomplishedTodo />
        </View>
    );
};

export default Backlog;
