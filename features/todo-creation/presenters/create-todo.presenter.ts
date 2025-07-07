import {
    CreateTodoCallbackOutput,
    CreateTodoOutput,
    ICreateTodoPresenter,
    outputDto,
} from "todo-usecase";

export class CreateTodoPresenter implements ICreateTodoPresenter {
    private onPresent: (data: CreateTodoCallbackOutput) => void = (
        data: CreateTodoCallbackOutput
    ) => {
        console.log("Default onPresent called with data:", data);
    };

    present(output: outputDto<CreateTodoOutput>): void {
        console.log("Presenting output:", output);
        this.onPresent(
            output.error
                ? { success: false, errorMessage: output.error[0].message }
                : { success: true, errorMessage: "" }
        );
    }

    setCallback(onPresent: (output: CreateTodoCallbackOutput) => void): void {
        this.onPresent = onPresent;
    }
}
