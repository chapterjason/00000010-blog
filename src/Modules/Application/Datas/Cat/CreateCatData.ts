import { IsString } from "class-validator";
import { CreateCatContract } from "../../Contracts/Cat/CreateCatContract";

export class CreateCatData implements CreateCatContract {

    @IsString()
    public readonly name: string;

}
