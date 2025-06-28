import { ICreateTodoRepository } from "todo-usecase";
import { ITodo } from "todo-entity";
import { MMKV } from "react-native-mmkv";

export class CreateTodoMMKV implements ICreateTodoRepository {
    constructor(private readonly storage: MMKV) {}

    async execute(todo: ITodo): Promise<ITodo> {
        const todos = this.storage.getString("todos");
        if (!todos) {
            this.storage.set("todos", JSON.stringify([todo]));
            return todo;
        }

        const todosArray: ITodo[] = JSON.parse(todos);
        todosArray.push(todo);
        this.storage.set("todos", JSON.stringify(todosArray));

        return todo;
    }
}
