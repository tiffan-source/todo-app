import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import {
    CreateTodoOutput,
    ICreateTodoPresenter,
    outputDto,
} from "todo-usecase";

export class CreateTodoPresenter
    implements ICreateTodoPresenter<TodoCreatedViewModel>
{
    private onPresent?: (output: TodoCreatedViewModel) => void;

    present(output: outputDto<CreateTodoOutput>): void {
        this.onPresent?.(
            output.error
                ? { success: false, errorMessage: output.error[0].message }
                : { success: true, errorMessage: "" }
        );
    }

    setCallback(onPresent: (output: TodoCreatedViewModel) => void): void {
        this.onPresent = onPresent;
    }
}
