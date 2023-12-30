import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTables1703950285141 implements MigrationInterface {
    name = 'CreateTables1703950285141'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`post_settings\` (\`postId\` int NOT NULL, \`commentable\` tinyint NOT NULL DEFAULT 0, \`shareable\` tinyint NOT NULL DEFAULT 0, PRIMARY KEY (\`postId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`content\` varchar(255) NULL, \`userId\` int NOT NULL, \`settingsPostId\` int NULL, UNIQUE INDEX \`REL_0582e0ce5f4f42f99fd654f1e2\` (\`settingsPostId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`post\` ADD CONSTRAINT \`FK_0582e0ce5f4f42f99fd654f1e22\` FOREIGN KEY (\`settingsPostId\`) REFERENCES \`post_settings\`(\`postId\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_0582e0ce5f4f42f99fd654f1e22\``);
        await queryRunner.query(`DROP INDEX \`REL_0582e0ce5f4f42f99fd654f1e2\` ON \`post\``);
        await queryRunner.query(`DROP TABLE \`post\``);
        await queryRunner.query(`DROP TABLE \`post_settings\``);
    }

}
