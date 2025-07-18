import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import { create } from "zustand";

interface LabelStore {
    labels: LabelViewModel[];
    setLabels: (labels: LabelViewModel[]) => void;
}

export const useLabelStore = create<LabelStore>()((set) => ({
    labels: [],
    setLabels: (labels: LabelViewModel[]) => set({ labels }),
}));
