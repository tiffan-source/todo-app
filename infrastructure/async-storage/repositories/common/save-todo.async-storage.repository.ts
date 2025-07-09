import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodoFactory } from "todo-entity";
import {
    ISaveTodoRepository,
    SaveTodoRepositoryInput,
    SaveTodoRepositoryOutput,
} from "todo-usecase";
import { TodoRepoSaveModel } from "./repository.model";

export class SaveTodoAsyncStorageRepository implements ISaveTodoRepository {
    async execute(
        todo: SaveTodoRepositoryInput
    ): Promise<SaveTodoRepositoryOutput> {
        try {
            console.log("Saving todo to AsyncStorage:", todo);
            const jsonData = await AsyncStorage.getItem("todos");
            let todos: TodoRepoSaveModel[] = jsonData
                ? JSON.parse(jsonData)
                : [];

            const existingIndex = todos.findIndex((t) => t.id === todo.getId());

            if (existingIndex === -1) {
                throw new Error("Todo not found");
            }

            let doneDate: Date | undefined = todo.getDoneDate();

            todos[existingIndex] = {
                id: todo.getId(),
                title: todo.getTitle(),
                description: todo.getDescription(),
                doneDate: doneDate ? doneDate.toISOString() : undefined,
            };

            // Save back to AsyncStorage
            await AsyncStorage.setItem("todos", JSON.stringify(todos));

            return todo;
        } catch (error) {
            throw new Error("Failed to save todo to storage", { cause: error });
        }
    }
}
