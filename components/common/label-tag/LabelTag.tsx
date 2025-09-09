import { Text, View } from "react-native";
import React from "react";
import { LabelUI } from "../../../models/Label";

const LabelTag = ({ label }: { label: LabelUI }) => {
    return (
        <View
            key={label.id}
            className="px-2 py-1 rounded-full"
            style={{
                backgroundColor: label.color,
            }}
        >
            <Text className="font-semibold text-white">#{label.name}</Text>
        </View>
    );
};

export default LabelTag;
