import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Migrate1739989366123 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                    unsigned: true,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '63'
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '127',
                    isUnique: true,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    length: '127',
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                }, {
                    name: 'updatedAt',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP()',
                },
                {
                    name: 'role',
                    type: 'int',
                    default: '1'
                }
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users');
    }

}
