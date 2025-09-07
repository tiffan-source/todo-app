import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    GetLabelByIdRepositoryInput,
    GetLabelByIdRepositoryOutput,
    IGetLabelByIdRepository,
} from "todo-usecase";
import { LabelRepoSaveModel } from "../common/repository.model";
import { ILabelFactory } from "todo-entity";

export class GetLabelByIdAsyncStorageRepository
    implements IGetLabelByIdRepository
{
    constructor(private labelFactory: ILabelFactory) {}

    async getLabelById(
        input: GetLabelByIdRepositoryInput
    ): Promise<GetLabelByIdRepositoryOutput> {
        try {
            const existingLabels = await AsyncStorage.getItem("labels");
            const labelsArray = existingLabels
                ? JSON.parse(existingLabels)
                : [];
            const label = labelsArray.find(
                (label: LabelRepoSaveModel) => label.id === input
            );
            if (!label) {
                throw new Error("Label not found");
            }
            let labelEntity = this.labelFactory.createWithId(
                label.id,
                label.name
            );
            labelEntity.setColor(label.color);
            return labelEntity;
        } catch (error) {
            console.error("Error getting label by ID:", error);
            throw new Error("Failed to get label by ID");
        }
    }
}
