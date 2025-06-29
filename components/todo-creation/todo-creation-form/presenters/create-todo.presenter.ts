import {
    CreateTodoOutput,
    ICreateTodoPresenter,
    outputDto,
} from "todo-usecase";

export class CreateTodoPresenter implements ICreateTodoPresenter {
    present(output: outputDto<CreateTodoOutput>): void {}
}
