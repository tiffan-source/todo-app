import AddTodoButton from "@/components/todo-creation/add-todo-button/AddTodoButton";
import AllListedTodo from "@/components/todo-retrieval/all-listed-todo/AllListedTodo";
import { SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView className="flex-1">
            <AllListedTodo />
            <AddTodoButton />
        </SafeAreaView>
    );
}
