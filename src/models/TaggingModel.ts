import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';
import { Company } from './CompanyModel';
import { Category } from './CategoryModel';
import { AssetInventory } from './AssetInventoryModel';

class Tagging extends Model {

    public id!: number;
    public asset_id!: number;
    public asset_table!: string;
    public tagging!: string;
    public table_id!: number;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

Tagging.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        tagging: {
            type: DataTypes.STRING,
            allowNull: true
        },
        asset_id: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: AssetInventory,
                key: 'id'
            }
        },
        asset_type: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Category,
                key: 'id'
            }
        },
        table_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Company,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false
        }

    },{
        sequelize,
        modelName: 'Tagging',
        tableName: 'taggings',
        timestamps: true
    })

export { Tagging }