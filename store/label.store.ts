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

    labelsSelected?: string[];

    labelsRetrieved?: {
        errorMessage?: string;
        success: boolean;
    };

    presentLabels: (output: outputDto<GetAllLabelOutput>) => void;

    resetLabelsSelected: () => void;
    setLabelsSelected: (labelIds: string[]) => void;
}

export const useLabelStore = create<LabelStore>()((set) => ({
    labels: [],
    labelsRetrieved: undefined,
    labelsSelected: [],

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

    resetLabelsSelected: () => set({ labelsSelected: [] }),
    setLabelsSelected: (labelIds: string[]) =>
        set({ labelsSelected: labelIds }),
}));

export const getAllLabelUseCase: IGetAllLabelPresenter = {
    present: (output: outputDto<GetAllLabelOutput>) => {
        useLabelStore.getState().presentLabels(output);
    },
};
