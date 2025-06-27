import AddTodoButton from "@/components/AddTodoButton/AddTodoButton";
import { Text, View } from "react-native";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
            }}
        >
            <AddTodoButton />
        </View>
    );
}
