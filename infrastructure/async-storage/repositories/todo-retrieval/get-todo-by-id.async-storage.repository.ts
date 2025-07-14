import AsyncStorage from "@react-native-async-storage/async-storage";
import { ITodo, ITodoFactory } from "todo-entity";
import {
    GetTodoByIdRepositoryInput,
    GetTodoByIdRepositoryOutput,
    IGetTodoByIdRepository,
} from "todo-usecase";
import { TodoRepoSaveModel } from "../common/repository.model";

export class GetTodoByIdAsyncStorageRepository
    implements IGetTodoByIdRepository
{
    constructor(private readonly todoFactory: ITodoFactory) {}

    async execute(
        input: GetTodoByIdRepositoryInput
    ): Promise<GetTodoByIdRepositoryOutput> {
        try {
            const jsonData = await AsyncStorage.getItem("todos");
            if (jsonData) {
                const todos: TodoRepoSaveModel[] = JSON.parse(jsonData);
                const todo = todos.find((todo) => todo.id === input);
                if (todo) {
                    const domainTodo: ITodo = this.todoFactory.createWithId(
                        todo.id,
                        todo.title
                    );
                    if (todo.description) {
                        domainTodo.describe(todo.description);
                    }
                    if (todo.doneDate) {
                        domainTodo.accomplish(new Date(todo.doneDate));
                    }
                    return domainTodo;
                }
            }
            return null;
        } catch (error) {
            console.error("Error retrieving todo from AsyncStorage:", error);
            throw new Error("Failed to retrieve todo from storage");
        }
    }
}
