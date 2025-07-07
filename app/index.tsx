import AddTodoButton from "@/components/todo-creation/add-todo-button/AddTodoButton";
import { SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView
            style={{
                flex: 1,
            }}
        >
            <AddTodoButton />
        </SafeAreaView>
    );
}
