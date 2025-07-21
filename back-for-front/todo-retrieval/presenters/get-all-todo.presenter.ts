import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import {
    GetAllTodoOutput,
    IGetAllTodoPresenter,
    outputDto,
} from "todo-usecase";

export class GetAllTodoPresenter implements IGetAllTodoPresenter {
    constructor(
        private readonly consumer: (viewModels: TodoTicketViewModel[]) => void
    ) {}

    present(output: outputDto<GetAllTodoOutput>): void {
        this.consumer?.(
            output.result === undefined
                ? []
                : output.result.map((todo) => ({
                      id: todo.todoId,
                      title: todo.title,
                      description: todo.description,
                      checked: todo.doneDate !== undefined,
                      labels: todo.labels
                          ? todo.labels.map((label) => ({
                                id: label.id,
                                name: label.name,
                                color: label.color || "",
                            }))
                          : [],
                      dueDate: todo.dueDate
                          ? todo.dueDate.getDate() +
                            "/" +
                            (todo.dueDate.getMonth() + 1)
                          : "",
                  }))
        );
    }
}
