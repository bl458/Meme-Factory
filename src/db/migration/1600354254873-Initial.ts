import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1600354254873 implements MigrationInterface {
    name = 'Initial1600354254873'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `user` (`id` int NOT NULL AUTO_INCREMENT, `email` varchar(255) NOT NULL, `pw` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `image` (`id` int NOT NULL AUTO_INCREMENT, `size` int NOT NULL, `url` varchar(255) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `IDX_602959dc3010ff4b4805ee7f10` (`url`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("CREATE TABLE `user_session` (`id` int NOT NULL AUTO_INCREMENT, `token` varchar(256) NOT NULL, `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `userId` int NULL, UNIQUE INDEX `REL_b5eb7aa08382591e7c2d1244fe` (`userId`), PRIMARY KEY (`id`)) ENGINE=InnoDB");
        await queryRunner.query("ALTER TABLE `image` ADD CONSTRAINT `FK_dc40417dfa0c7fbd70b8eb880cc` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
        await queryRunner.query("ALTER TABLE `user_session` ADD CONSTRAINT `FK_b5eb7aa08382591e7c2d1244fe5` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("ALTER TABLE `user_session` DROP FOREIGN KEY `FK_b5eb7aa08382591e7c2d1244fe5`");
        await queryRunner.query("ALTER TABLE `image` DROP FOREIGN KEY `FK_dc40417dfa0c7fbd70b8eb880cc`");
        await queryRunner.query("DROP INDEX `REL_b5eb7aa08382591e7c2d1244fe` ON `user_session`");
        await queryRunner.query("DROP TABLE `user_session`");
        await queryRunner.query("DROP INDEX `IDX_602959dc3010ff4b4805ee7f10` ON `image`");
        await queryRunner.query("DROP TABLE `image`");
        await queryRunner.query("DROP INDEX `IDX_e12875dfb3b1d92d7d7c5377e2` ON `user`");
        await queryRunner.query("DROP TABLE `user`");
    }

}
