import { Labour } from "./labour.model"

export class LabourResponse {
    providers: Array<Labour> = [];
    directContractors: Array<Labour> = [];
    total: Array<Labour> = []
}