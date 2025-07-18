import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import {
    GetAllLabelOutput,
    IGetAllLabelPresenter,
    outputDto,
} from "todo-usecase";

export class GetAllLabelPresenter implements IGetAllLabelPresenter {
    constructor(
        private readonly consumer: (viewModels: LabelViewModel[]) => void
    ) {}

    present(output: outputDto<GetAllLabelOutput>): void {
        this.consumer?.(
            output.result === undefined
                ? []
                : output.result.map((label) => ({
                      id: label.id,
                      name: label.name,
                      color: label.color || "",
                  }))
        );
    }
}
