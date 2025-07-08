import { TodoTicketViewModel } from "@/back-for-front/shared/view-models/TodoTicketViewModel";
import {
    GetAllTodoOutput,
    GetUncompletedTodosOutput,
    IGetAllTodoPresenter,
    IGetUncompletedTodosPresenter,
    outputDto,
} from "todo-usecase";

export class GetAllUnaccomplishedTodoPresenter
    implements IGetUncompletedTodosPresenter<TodoTicketViewModel[]>
{
    private callback?: (data: TodoTicketViewModel[]) => void;

    present(output: outputDto<GetUncompletedTodosOutput>): void {
        this.callback?.(
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
                  }))
        );
    }

    setCallback(callback: (data: TodoTicketViewModel[]) => void): void {
        this.callback = callback;
    }
}
