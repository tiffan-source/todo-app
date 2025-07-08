import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodo, ITodoFactory } from "todo-entity";
import {
    GetAllTodoRepositoryOutput,
    IGetAllTodoRepository,
} from "todo-usecase";
import { TodoRepoSaveModel } from "@/infrastructure/async-storage/repositories/common/repository.model";

export class GetAllTodoAsyncStorageRepository implements IGetAllTodoRepository {
    constructor(private readonly todoFactory: ITodoFactory) {}

    async execute(): Promise<GetAllTodoRepositoryOutput> {
        try {
            const jsonData = await AsyncStorage.getItem("todos");
            if (jsonData) {
                const todos: TodoRepoSaveModel[] = JSON.parse(jsonData);
                let result: ITodo[] = [];
                // Convert raw todos to domain model using the factory
                todos.forEach((todo: TodoRepoSaveModel) => {
                    const domainTodo = this.todoFactory.createWithId(
                        todo.id,
                        todo.title
                    );
                    if (todo.description) {
                        domainTodo.description = todo.description;
                    }
                    result.push(domainTodo);
                });

                return result;
            } else {
                return [];
            }
        } catch (error) {
            throw new Error("Failed to retrieve todos from storage");
        }
    }
}
