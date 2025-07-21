import { TodoEditedViewModel } from "@/back-for-front/shared/view-models/TodoEditedViewModel";
import { EditTodoOutput, IEditTodoPresenter, outputDto } from "todo-usecase";

export class EditTodoPresenter implements IEditTodoPresenter {
    constructor(
        private readonly consumer: (viewModel: TodoEditedViewModel) => void
    ) {}

    present(output: outputDto<EditTodoOutput>): void {
        if (output.success && output.result) {
            this.consumer({
                successEdition: true,
                todo: {
                    id: output.result.todoId,
                    title: output.result.title,
                    description: output.result.description,
                    checked: output.result.doneDate !== undefined,
                    labels: (output.result.labels ?? []).map((label) => ({
                        id: label.id,
                        name: label.name,
                        color: label.color ?? "",
                    })),
                    dueDate: output.result.dueDate
                        ? output.result.dueDate.toISOString()
                        : undefined,
                },
            });
        } else {
            this.consumer({
                successEdition: false,
                errorMessageEdition: output.error?.[0]?.message,
            });
        }
    }
}
