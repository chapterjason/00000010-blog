import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as path from "path";
import { CatController } from "./Controllers/CatController";
import { HomeController } from "./Controllers/HomeController";
import { Cat } from "./Entities/Cat";
import { CatService } from "./Service/CatService";

@Module({
    controllers: [
        HomeController,
        CatController,
    ],
    providers: [
        CatService,
    ],
    imports: [
        TypeOrmModule.forRoot(require(path.join(__dirname, "../../../ormconfig.js"))),
        TypeOrmModule.forFeature([Cat]),
    ],
})
export class ApplicationModule {

}
