import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import {
    IMarkTodoAsCompletedPresenter,
    MarkTodoAsCompletedOutput,
    outputDto,
} from "todo-usecase";

export class MarkTodoAsCompletedPresenter
    implements IMarkTodoAsCompletedPresenter
{
    constructor(
        private readonly consumer: (viewModels: TodoCheckViewModel) => void
    ) {}

    present(output: outputDto<MarkTodoAsCompletedOutput>): void {
        // Implementation of the present method
        // This method will handle the output of the MarkTodoAsCompletedInteractor
        if (output.success && output.result) {
            const viewModel: TodoCheckViewModel = {
                success: true,
                todoId: output.result.todoId,
            };
            this.consumer(viewModel);
        } else {
            const viewModel: TodoCheckViewModel = {
                success: false,
                errorMessage: output.error
                    ? output.error[0].message
                    : "An error occurred",
            };
            this.consumer(viewModel);
        }
    }
}
