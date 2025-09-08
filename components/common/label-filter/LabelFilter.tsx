import { useLabelStore } from "@/store/label.store";
import React, { use } from "react";
import { useSelectLabelHook } from "./hooks/select-label.hook";
import { FlatList } from "react-native";
import { Button, ButtonText } from "@/components/ui/button";

function LabelFilter() {
    let { labels, labelsSelected, enableLabelSelection } = useSelectLabelHook();

    return (
        <FlatList
            horizontal
            data={labels}
            renderItem={({ item }) => (
                <Button
                    className="rounded-full mr-4 mb-4"
                    variant={
                        labelsSelected?.includes(item.id) ? "solid" : "outline"
                    }
                    onPress={() => {
                        enableLabelSelection(item.id);
                    }}
                >
                    <ButtonText>{item.name}</ButtonText>
                </Button>
            )}
            keyExtractor={(item) => item.id}
        />
    );
}

export default LabelFilter;
