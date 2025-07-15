import { ICreateTodoInteractor } from "todo-usecase";

export class CreateTodoController {
    constructor(private readonly createTodoUseCase: ICreateTodoInteractor) {}

    createTodo = (
        title: string,
        description?: string,
        labelIds?: string[],
        labelTitles?: string[]
    ) => {
        this.createTodoUseCase.execute({
            input: {
                title,
                description,
                newLabelTitles: labelTitles,
                labelIds,
            },
            timestamp: new Date().toISOString(),
        });
    };
}
