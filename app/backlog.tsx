import { View } from "react-native";
import React from "react";
import AllUnaccomplishedTodo from "@/components/backlog/all-unaccomplished-todo/AllUnaccomplishedTodo";

const Backlog = () => {
    return (
        <View>
            <AllUnaccomplishedTodo />
        </View>
    );
};

export default Backlog;
