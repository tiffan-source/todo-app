import { useState } from "react";

export const useLabelInputHook = () => {
    const [label, setLabel] = useState<string>("");
    const [tags, setTags] = useState<string[]>([]);

    const handleLabelTypingInput = (text: string) => {
        setLabel(text);
        if (text.at(-1) === " ") {
            const newTag = text.trim();
            if (newTag && !tags.includes(newTag)) {
                const formattedTag = newTag
                    .replace(/\s+/g, "")
                    .replace(/^./, (c) => c.toUpperCase());
                setTags([...tags, formattedTag]);
            }
            setLabel("");
        }
    };

    const removeTagOnPress = (index: number) => {
        setTags(tags.filter((_, i) => i !== index));
    };

    return {
        label,
        tags,
        handleLabelTypingInput,
        removeTagOnPress,
    };
};
