import {
    CreateTodoRepositoryInput,
    CreateTodoRepositoryOutput,
    ICreateTodoRepository,
} from "todo-usecase";
import AsyncStorage from "@react-native-async-storage/async-storage";

export class CreateTodoAsyncStorageRepository implements ICreateTodoRepository {
    async execute(
        input: CreateTodoRepositoryInput
    ): Promise<CreateTodoRepositoryOutput> {
        const jsonData = JSON.stringify(input);
        try {
            await AsyncStorage.setItem("todos", jsonData);
            return input;
        } catch (error) {
            console.error("Error saving todo:", error);
            throw new Error("Failed to save todo");
        }
    }
}
