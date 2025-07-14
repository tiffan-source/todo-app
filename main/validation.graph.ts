import { graph, ObjectGraph, singleton, provides } from "react-obsidian";
import { ICreateTodoValidation } from "todo-usecase";
import { CreateTodoValidation } from "todo-usecase-default";

@singleton()
@graph()
export class ValidationGraph extends ObjectGraph {
    @provides()
    createTodoValidation(): ICreateTodoValidation {
        return new CreateTodoValidation();
    }
}
