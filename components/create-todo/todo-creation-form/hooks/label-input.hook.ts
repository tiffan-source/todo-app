import { LabelViewModel } from "@/back-for-front/shared/view-models/LabelViewModel";
import { AppGraph } from "@/main/app.grah";
import { ControllerGraph } from "@/main/controller.graph";
import { PresenterGraph } from "@/main/presenter.graph";
import { useLabelStore } from "@/store/label.store";
import { useEffect, useState } from "react";
import { DependenciesOf, injectHook } from "react-obsidian";

const useLabelInputHook = ({
    getAllLabelController,
}: DependenciesOf<
    [ControllerGraph, PresenterGraph],
    "getAllLabelController"
>) => {
    const [label, setLabel] = useState<string>("");
    const [tags, setTags] = useState<{ id?: string; name: string }[]>([]);
    const [labelSuggestions, setLabelSuggestions] = useState<LabelViewModel[]>(
        []
    );
    const allLabels = useLabelStore((state) => state.labels);

    const handleLabelTypingInput = (text: string) => {
        setLabel(text);

        const suggestions = allLabels
            .filter(
                (l) =>
                    l.name.toLowerCase().includes(text.trim().toLowerCase()) &&
                    !tags.map((tag) => tag.name).includes(l.name)
            )
            .slice(0, 3); // Limiter à 3 suggestions

        setLabelSuggestions(suggestions);

        if (text.at(-1) === " ") {
            const newTag = text.trim();
            if (newTag && !tags.map((tag) => tag.name).includes(newTag)) {
                const formattedTag = newTag
                    .replace(/\s+/g, "")
                    .replace(/^./, (c) => c.toUpperCase());
                setTags([...tags, { name: formattedTag }]);
            }
            setLabel("");
        }
    };

    const removeTagOnPress = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    const handleSelectSuggestion = (suggestion: {
        value: string;
        label: string;
    }) => {
        setTags([...tags, { id: suggestion.value, name: suggestion.label }]);
        setLabel("");
        setLabelSuggestions([]);
    };

    useEffect(() => {
        getAllLabelController.getAllLabels();
    }, []);

    return {
        label,
        tags,
        handleLabelTypingInput,
        removeTagOnPress,
        labelSuggestions,
        handleSelectSuggestion,
    };
};

export default injectHook(useLabelInputHook, AppGraph);
