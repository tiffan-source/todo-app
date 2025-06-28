import AddTodoButton from "@/components/todo-creation/add-todo-button/AddTodoButton";
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
