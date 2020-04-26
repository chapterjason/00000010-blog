import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { CreateCatData } from "../Datas/Cat/CreateCatData";
import { EditCatData } from "../Datas/Cat/EditCatData";
import { Cat } from "../Entities/Cat";
import { CatService } from "../Service/CatService";

@Controller("/api/cats")
export class CatController {

    protected service: CatService;

    public constructor(service: CatService) {
        this.service = service;
    }

    @Get()
    public async index() {
        return this.service.find();
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    public async create(@Body() catData: CreateCatData) {
        const cat: Cat = await this.service.create(catData);

        return cat;
    }

    @Get("/:id")
    public async view(@Param("id") id: string) {
        const cat: Cat = await this.service.findOne(parseInt(id, 10));

        return cat;
    }

    @Patch("/:id")
    public async edit(@Body() catData: EditCatData, @Param("id") id: string) {
        const cat: Cat = await this.service.update(parseInt(id, 10), catData);

        return cat;
    }

    @Delete("/:id")
    public async delete(@Param("id") id: string) {
        return this.service.delete(parseInt(id, 10));
    }

}
