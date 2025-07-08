import AddTodoButton from "@/components/todo-creation/add-todo-button/AddTodoButton";
import AllListedTodo from "@/components/todo-retrieval/all-unaccomplished-todo/AllUnaccomplishedTodo";
import { SafeAreaView } from "react-native";

export default function Index() {
    return (
        <SafeAreaView className="flex-1">
            <AllListedTodo />
            <AddTodoButton />
        </SafeAreaView>
    );
}
