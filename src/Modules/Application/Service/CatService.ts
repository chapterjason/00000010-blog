import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateCatData } from "../Datas/Cat/CreateCatData";
import { EditCatData } from "../Datas/Cat/EditCatData";
import { Cat } from "../Entities/Cat";
import { BasicEntityService } from "./BasicEntityService";

export class CatService extends BasicEntityService<Cat, CreateCatData, EditCatData> {

    public constructor(@InjectRepository(Cat) repository: Repository<Cat>) {
        super();
        this.repository = repository;
    }

    public async create(data: CreateCatData) {
        return this.internalCreate(data, Cat);
    }

}
