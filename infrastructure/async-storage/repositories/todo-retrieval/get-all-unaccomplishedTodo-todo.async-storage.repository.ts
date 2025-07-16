import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILabelFactory, ITodo, ITodoFactory } from "todo-entity";
import {
    GetUncompletedTodosRepositoryOutput,
    IGetUncompletedTodosRepository,
} from "todo-usecase";
import {
    LabelRepoSaveModel,
    TodoRepoSaveModel,
} from "@/infrastructure/async-storage/repositories/common/repository.model";

export class GetAllUnaccomplishedTodoTodoAsyncStorageRepository
    implements IGetUncompletedTodosRepository
{
    constructor(
        private readonly todoFactory: ITodoFactory,
        private readonly labelFactory: ILabelFactory
    ) {}

    async execute(): Promise<GetUncompletedTodosRepositoryOutput> {
        try {
            const jsonDataTodo = await AsyncStorage.getItem("todos");
            const jsonDataLabel = await AsyncStorage.getItem("labels");

            if (jsonDataTodo) {
                const todos: TodoRepoSaveModel[] = JSON.parse(jsonDataTodo);
                const labels: LabelRepoSaveModel[] = JSON.parse(
                    jsonDataLabel || "[]"
                );
                let result: ITodo[] = [];
                // Convert raw todos to domain model using the factory
                todos.forEach((todo: TodoRepoSaveModel) => {
                    if (todo.doneDate) {
                        return; // Skip completed todos
                    }
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
}
