import {
    CreateTodoRepositoryInput,
    CreateTodoRepositoryOutput,
    ICreateTodoRepository,
} from "todo-usecase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoRepoSaveModel } from "../common/repository.model";

export class CreateTodoAsyncStorageRepository implements ICreateTodoRepository {
    async execute(
        input: CreateTodoRepositoryInput
    ): Promise<CreateTodoRepositoryOutput> {
        let newTodo: TodoRepoSaveModel = {
            id: input.getId(),
            title: input.getTitle(),
            description: input.getDescription(),
            labels: input.getLabels().map((label) => label.getId()),
            dueDate: input.getDueDate()?.toISOString(),
        };

        let previousTodos: TodoRepoSaveModel[] = [];
        try {
            const jsonData = await AsyncStorage.getItem("todos");
            if (jsonData) {
                previousTodos = JSON.parse(jsonData);
            }
            previousTodos.push(newTodo);
            await AsyncStorage.setItem("todos", JSON.stringify(previousTodos));
            return input;
        } catch (error) {
            console.error("Error saving todo:", error);
            throw new Error("Failed to save todo");
        }
    }
}
