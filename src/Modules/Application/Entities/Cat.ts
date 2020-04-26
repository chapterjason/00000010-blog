/* eslint-disable no-magic-numbers */
import { MaxLength, MinLength } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { CatContract } from "../Contracts/Cat/CatContract";

@Entity()
export class Cat implements CatContract {

    @PrimaryGeneratedColumn()
    public id: number;

    @Column({ length: 255 })
    @MinLength(3)
    @MaxLength(25)
    public name: string;

}
