import {
    GetAllLabelOutput,
    IGetAllLabelPresenter,
    outputDto,
} from "todo-usecase";
import { create } from "zustand";

interface LabelStore {
    labels: {
        id: string;
        name: string;
        color: string;
    }[];

    labelsRetrieved?: {
        errorMessage?: string;
        success: boolean;
    };

    presentLabels: (output: outputDto<GetAllLabelOutput>) => void;
}

export const useLabelStore = create<LabelStore>()((set) => ({
    labels: [],
    labelsRetrieved: undefined,

    presentLabels: (output: outputDto<GetAllLabelOutput>) => {
        let { error, success, result } = output;
        if (success && result) {
            set({
                labels: result.map((label) => ({
                    id: label.id,
                    name: label.name,
                    color: label.color || "#000000",
                })),
                labelsRetrieved: {
                    errorMessage: undefined,
                    success,
                },
            });
        } else {
            set({
                labelsRetrieved: { errorMessage: error?.[0].message, success },
            });
        }
    },
}));

export const getAllLabelUseCase: IGetAllLabelPresenter = {
    present: (output: outputDto<GetAllLabelOutput>) => {
        useLabelStore.getState().presentLabels(output);
    },
};
