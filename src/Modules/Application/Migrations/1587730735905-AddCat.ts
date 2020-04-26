import { MigrationInterface, QueryRunner } from "typeorm";

export class AddCat1587730735905 implements MigrationInterface {

    public name = "AddCat1587730735905";

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `cat` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `cat`");
    }

}
