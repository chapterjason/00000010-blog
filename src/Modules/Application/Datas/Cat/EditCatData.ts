import { IsString } from "class-validator";
import { EditCatContract } from "../../Contracts/Cat/EditCatContract";

export class EditCatData implements EditCatContract {

    @IsString()
    public readonly name: string;

}
