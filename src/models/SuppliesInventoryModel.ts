// const tableHead = [
//   { key: 'item_code', label: 'Item Code' },
//   { key: 'item_name', label: 'Item Name' },
//   { key: 'manufacturer', label: 'Manufacturer' },
//   { key: 'description', label: 'Description' },
//   { key: 'item_cost', label: 'Item Cost' },
//   { key: 'stocks', label: 'Stocks' },
// ]

import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/lib/db';

class SuppliesInventory extends Model {
    public id!: number;
    public item_code!: string;
    public item_name!: string;
    public manufacturer!: string;
    public description!: string;
    public item_cost!: number;
    public stocks!: number;
    public invoice_number!: string;
    public invoice_date!: Date;
}

SuppliesInventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        item_code: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        item_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        manufacturer: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        item_cost: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        stocks: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        invoice_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        invoice_date: {
            type: DataTypes.STRING,
            allowNull: true
        }
    },
    {
        sequelize,
        modelName: 'SuppliesInventory',
        tableName: 'supplies_inventory',
        timestamps: false,
    }
);
export { SuppliesInventory };