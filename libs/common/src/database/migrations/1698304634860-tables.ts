import { MigrationInterface, QueryRunner } from 'typeorm';

export class Tables1698304634860 implements MigrationInterface {
  name = 'Tables1698304634860';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`post\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(255) NOT NULL, \`scope\` varchar(255) NOT NULL, \`image_url\` varchar(1000) NOT NULL, \`author_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`relation_detail\` (\`id\` int NOT NULL AUTO_INCREMENT, \`relation_name\` varchar(255) NOT NULL, \`relation_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`relation\` (\`id\` int NOT NULL AUTO_INCREMENT, \`user_id\` int NOT NULL, \`friend_id\` int NOT NULL, \`relation_name\` varchar(255) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`point_use\` (\`id\` int NOT NULL AUTO_INCREMENT, \`point_id_use\` int NOT NULL, \`point_id\` int NOT NULL, \`amount\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`point\` (\`id\` int NOT NULL AUTO_INCREMENT, \`category\` varchar(255) NOT NULL, \`amount\` int NOT NULL, \`breakdown\` varchar(255) NOT NULL, \`expiration_date\` date NULL, \`user_id\` int NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(100) NOT NULL, \`password\` varchar(100) NOT NULL, \`username\` varchar(50) NOT NULL, \`leave_reason\` varchar(50) NULL, \`leave_reason_detail\` varchar(1000) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` ADD CONSTRAINT \`FK_2f1a9ca8908fc8168bc18437f62\` FOREIGN KEY (\`author_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`relation_detail\` ADD CONSTRAINT \`FK_3b07795a3f0bcad22e9e8076d98\` FOREIGN KEY (\`relation_id\`) REFERENCES \`relation\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`relation\` ADD CONSTRAINT \`FK_cccccbd41aa7ce4e0d0c3d5b5b7\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point_use\` ADD CONSTRAINT \`FK_cc8b26f836bfcad25b443f0b421\` FOREIGN KEY (\`point_id\`) REFERENCES \`point\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE \`point\` ADD CONSTRAINT \`FK_9399c30a2304f6948938f84b06d\` FOREIGN KEY (\`user_id\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`point\` DROP FOREIGN KEY \`FK_9399c30a2304f6948938f84b06d\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`point_use\` DROP FOREIGN KEY \`FK_cc8b26f836bfcad25b443f0b421\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`relation\` DROP FOREIGN KEY \`FK_cccccbd41aa7ce4e0d0c3d5b5b7\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`relation_detail\` DROP FOREIGN KEY \`FK_3b07795a3f0bcad22e9e8076d98\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`post\` DROP FOREIGN KEY \`FK_2f1a9ca8908fc8168bc18437f62\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``,
    );
    await queryRunner.query(`DROP TABLE \`user\``);
    await queryRunner.query(`DROP TABLE \`point\``);
    await queryRunner.query(`DROP TABLE \`point_use\``);
    await queryRunner.query(`DROP TABLE \`relation\``);
    await queryRunner.query(`DROP TABLE \`relation_detail\``);
    await queryRunner.query(`DROP TABLE \`post\``);
  }
}
