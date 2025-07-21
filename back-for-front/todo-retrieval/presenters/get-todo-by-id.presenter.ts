import { TodoEditedViewModel } from "@/back-for-front/shared/view-models/TodoEditedViewModel";
import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import {
    GetTodoByIdOutput,
    IGetTodoByIdPresenter,
    outputDto,
} from "todo-usecase";

export class GetTodoByIdPresenter implements IGetTodoByIdPresenter {
    constructor(
        private readonly consumer: (viewModels: TodoEditedViewModel) => void
    ) {}

    present(output: outputDto<GetTodoByIdOutput>): void {
        const todo = output.result;
        console.log("GetTodoByIdPresenter output : ", output.result?.dueDate);
        if (todo) {
            this.consumer({
                todo: {
                    id: todo.todoId,
                    title: todo?.title || "",
                    description: todo?.description || "",
                    checked: todo?.doneDate !== undefined,
                    labels: todo?.labels
                        ? todo.labels.map((label) => ({
                              id: label.id,
                              name: label.name,
                              color: label.color || "",
                          }))
                        : [],
                    dueDate: todo?.dueDate ? todo.dueDate.toISOString() : "",
                },
            });
        }
    }
}
