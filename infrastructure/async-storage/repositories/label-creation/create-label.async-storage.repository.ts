import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    CreateLabelRepositoryInput,
    CreateLabelRepositoryOutput,
    ICreateLabelRepository,
} from "todo-usecase";
import { LabelRepoSaveModel } from "../common/repository.model";

export class CreateLabelAsyncStorageRepository
    implements ICreateLabelRepository
{
    async execute(
        label: CreateLabelRepositoryInput
    ): Promise<CreateLabelRepositoryOutput> {
        try {
            const existingLabels = await AsyncStorage.getItem("labels");
            const labelsArray = existingLabels
                ? JSON.parse(existingLabels)
                : [];
            let newLabel: LabelRepoSaveModel = {
                id: label.getId(),
                name: label.getName(),
                color: label.getColor(),
            };
            labelsArray.push(newLabel);
            await AsyncStorage.setItem("labels", JSON.stringify(labelsArray));

            return label;
        } catch (error) {
            console.error("Error saving label:", error);
            throw new Error("Failed to save label");
        }
    }
}
