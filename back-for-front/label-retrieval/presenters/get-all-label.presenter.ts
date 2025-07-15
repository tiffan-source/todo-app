import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import {
    GetAllLabelOutput,
    IGetAllLabelPresenter,
    outputDto,
} from "todo-usecase";

export class GetAllLabelPresenter
    implements IGetAllLabelPresenter<LabelViewModel[]>
{
    private callback?: (data: LabelViewModel[]) => void;

    present(output: outputDto<GetAllLabelOutput>): void {
        this.callback?.(
            output.result === undefined
                ? []
                : output.result.map((label) => ({
                      id: label.id,
                      name: label.name,
                      color: label.color || "",
                  }))
        );
    }

    setCallback(callback: (output: LabelViewModel[]) => void): void {
        this.callback = callback;
    }
}
