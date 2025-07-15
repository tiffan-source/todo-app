import { IGetAllLabelInteractor } from "todo-usecase";

export class GetAllLabelController {
    constructor(private readonly getAllLabelUseCase: IGetAllLabelInteractor) {}

    getAllLabels() {
        return this.getAllLabelUseCase.execute({
            input: {} as never,
            timestamp: new Date().toISOString(),
        });
    }
}
