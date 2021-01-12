import {MigrationInterface, QueryRunner} from "typeorm";

export class ClientMigration1610392451675 implements MigrationInterface {
    name = 'ClientMigration1610392451675'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "clients" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "gender" integer NOT NULL, "born_date" TIMESTAMP NOT NULL, "age" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "cityId" integer, CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "Cities" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "stateId" integer, CONSTRAINT "PK_21ae4232868104702703893428e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "states" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "uf" character varying(2) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_09ab30ca0975c02656483265f4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "clients" ADD CONSTRAINT "FK_171d9491df6bc1c86b2b887f4b7" FOREIGN KEY ("cityId") REFERENCES "Cities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "Cities" ADD CONSTRAINT "FK_daa4b1f8186660f70b937064db0" FOREIGN KEY ("stateId") REFERENCES "states"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Cities" DROP CONSTRAINT "FK_daa4b1f8186660f70b937064db0"`);
        await queryRunner.query(`ALTER TABLE "clients" DROP CONSTRAINT "FK_171d9491df6bc1c86b2b887f4b7"`);
        await queryRunner.query(`DROP TABLE "states"`);
        await queryRunner.query(`DROP TABLE "Cities"`);
        await queryRunner.query(`DROP TABLE "clients"`);
    }

}
