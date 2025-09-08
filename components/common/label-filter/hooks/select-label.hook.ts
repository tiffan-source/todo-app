import { useLabelStore } from "@/store/label.store";
import { useRouter, usePathname } from "expo-router";
import { useState } from "react";

export let useSelectLabelHook = () => {
    const { labels, labelsSelected, setLabelsSelected } = useLabelStore();
    const router = useRouter();
    const pathname = usePathname();

    let enableLabelSelection = (labelId: string) => {
        if (!labelsSelected) {
            setLabelsSelected([labelId]);
            return;
        }
        if (labelsSelected.includes(labelId)) {
            // remove label from selection
            setLabelsSelected(labelsSelected.filter((id) => id !== labelId));
        } else {
            // add label to selection
            setLabelsSelected([...labelsSelected, labelId]);
        }
        router.replace(pathname);
    };

    return {
        labels,
        labelsSelected,
        enableLabelSelection,
    };
};
