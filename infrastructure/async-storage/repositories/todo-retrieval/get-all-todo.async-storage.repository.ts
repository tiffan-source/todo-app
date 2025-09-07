import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILabelFactory, ITodo, ITodoFactory } from "todo-entity";
import {
    GetAllTodoRepositoryInput,
    GetAllTodoRepositoryOutput,
    IGetAllTodoRepository,
} from "todo-usecase";
import {
    LabelRepoSaveModel,
    TodoRepoSaveModel,
} from "../common/repository.model";

export class GetAllTodoAsyncStorageRepository implements IGetAllTodoRepository {
    constructor(
        private readonly todoFactory: ITodoFactory,
        private readonly labelFactory: ILabelFactory
    ) {}

    async getAllTodos(
        input: GetAllTodoRepositoryInput
    ): Promise<GetAllTodoRepositoryOutput> {
        try {
            const jsonDataTodo = await AsyncStorage.getItem("todos");
            const jsonDataLabel = await AsyncStorage.getItem("labels");
            const { filters } = input;

            if (jsonDataTodo) {
                const todos: TodoRepoSaveModel[] = JSON.parse(jsonDataTodo);
                const labels: LabelRepoSaveModel[] = JSON.parse(
                    jsonDataLabel || "[]"
                );
                let result: ITodo[] = [];
                // Convert raw todos to domain model using the factory
                todos.forEach((todo: TodoRepoSaveModel) => {
                    const domainTodo: ITodo = this.todoFactory.createWithId(
                        todo.id,
                        todo.title
                    );
                    if (todo.description) {
                        domainTodo.describe(todo.description);
                    }

                    for (const labelId of todo.labels ?? []) {
                        const label = labels.find(
                            (label) => label.id === labelId
                        );
                        if (label) {
                            const domainLabel = this.labelFactory.createWithId(
                                label.id,
                                label.name
                            );
                            domainLabel.setColor(label.color);
                            domainTodo.addLabel(domainLabel);
                        }
                    }

                    if (todo.dueDate) {
                        domainTodo.addDeadline(new Date(todo.dueDate));
                    }

                    if (todo.doneDate) {
                        domainTodo.accomplish(new Date(todo.doneDate));
                    }

                    if (filters?.dueDate) {
                        if (!this.dueDateFilter(domainTodo, filters.dueDate)) {
                            return; // Skip if due date does not match
                        }
                    }

                    if (filters?.done !== undefined) {
                        if (!this.doneFilter(domainTodo, filters.done)) {
                            return; // Skip if done status does not match
                        }
                    }

                    result.push(domainTodo);
                });
                return result;
            } else {
                return [];
            }
        } catch (error) {
            console.error("Error retrieving todos from storage:", error);
            throw new Error("Failed to retrieve todos from storage");
        }
    }

    private dueDateFilter(todo: ITodo, dueDate: Date[]): boolean {
        let myDueDate = todo.getDueDate();

        return (
            myDueDate !== undefined &&
            dueDate.find((date) => {
                return (
                    date.getFullYear() === myDueDate.getFullYear() &&
                    date.getMonth() === myDueDate.getMonth() &&
                    date.getDate() === myDueDate.getDate()
                );
            }) !== undefined
        );
    }

    private doneFilter(todo: ITodo, done: boolean): boolean {
        return done
            ? todo.getDoneDate() !== undefined
            : todo.getDoneDate() === undefined;
    }
}
