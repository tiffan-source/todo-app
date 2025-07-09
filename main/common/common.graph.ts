import { SaveTodoAsyncStorageRepository } from "@/infrastructure/async-storage/repositories/common/save-todo.async-storage.repository";
import { graph, ObjectGraph, provides, singleton } from "react-obsidian";
import { ITodoFactory } from "todo-entity";
import { TodoFactory } from "todo-entity-default";
import { ISaveTodoRepository } from "todo-usecase";

@graph()
@singleton()
export class CommonGraph extends ObjectGraph {
    // This class can be used to define common dependencies or utilities
    // that can be shared across different graphs in the application.
    // Currently, it is empty but can be extended in the future.

    @provides()
    todoFactory(): ITodoFactory {
        return new TodoFactory();
    }

    @provides()
    saveTodoRepository(): ISaveTodoRepository {
        return new SaveTodoAsyncStorageRepository();
    }
}
