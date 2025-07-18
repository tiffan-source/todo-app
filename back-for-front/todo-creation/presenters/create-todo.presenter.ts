import { TodoCreatedViewModel } from "@/back-for-front/shared/view-models/TodoCreatedViewModel";
import {
    CreateTodoOutput,
    ICreateTodoPresenter,
    outputDto,
} from "todo-usecase";

export class CreateTodoPresenter implements ICreateTodoPresenter {
    constructor(
        private readonly consumer: (viewModels: TodoCreatedViewModel) => void
    ) {}

    present(output: outputDto<CreateTodoOutput>): void {
        this.consumer?.(
            output.error
                ? { success: false, errorMessage: output.error[0].message }
                : { success: true, errorMessage: "" }
        );
    }
}
