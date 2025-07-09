import { TodoCheckViewModel } from "@/back-for-front/shared/view-models/TodoCheckViewModel";
import {
    IMarkTodoAsCompletedPresenter,
    MarkTodoAsCompletedOutput,
    outputDto,
} from "todo-usecase";

export class MarkTodoAsCompletedPresenter
    implements IMarkTodoAsCompletedPresenter<TodoCheckViewModel>
{
    private callback?: (output: TodoCheckViewModel) => void;

    present(output: outputDto<MarkTodoAsCompletedOutput>): void {
        // Implementation of the present method
        // This method will handle the output of the MarkTodoAsCompletedInteractor
        if (output.success && output.result) {
            const viewModel: TodoCheckViewModel = {
                success: true,
                todoId: output.result.todoId,
            };
            this.callback?.(viewModel);
        } else {
            const viewModel: TodoCheckViewModel = {
                success: false,
                errorMessage: output.error
                    ? output.error[0].message
                    : "An error occurred",
            };
            this.callback?.(viewModel);
        }
    }

    setCallback(callback: (output: TodoCheckViewModel) => void): void {
        // Implementation of the setCallback method
        // This method will set a callback to be called with the output
        this.callback = callback;
    }
}
