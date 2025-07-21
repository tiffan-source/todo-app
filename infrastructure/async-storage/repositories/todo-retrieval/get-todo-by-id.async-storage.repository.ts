import AsyncStorage from "@react-native-async-storage/async-storage";
import { ILabelFactory, ITodo, ITodoFactory } from "todo-entity";
import {
    GetTodoByIdRepositoryInput,
    GetTodoByIdRepositoryOutput,
    IGetTodoByIdRepository,
} from "todo-usecase";
import {
    LabelRepoSaveModel,
    TodoRepoSaveModel,
} from "../common/repository.model";

export class GetTodoByIdAsyncStorageRepository
    implements IGetTodoByIdRepository
{
    constructor(
        private readonly todoFactory: ITodoFactory,
        private readonly labelFactory: ILabelFactory
    ) {}

    async execute(
        input: GetTodoByIdRepositoryInput
    ): Promise<GetTodoByIdRepositoryOutput> {
        try {
            const jsonData = await AsyncStorage.getItem("todos");
            const jsonDataLabel = await AsyncStorage.getItem("labels");

            if (jsonData) {
                const todos: TodoRepoSaveModel[] = JSON.parse(jsonData);
                const labels: LabelRepoSaveModel[] = JSON.parse(
                    jsonDataLabel || "[]"
                );

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

                    if (todo.dueDate)
                        domainTodo.addDeadline(new Date(todo.dueDate));

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
