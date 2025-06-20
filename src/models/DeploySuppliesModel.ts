
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '@/lib/db';

class DeployedSuppliesModel extends Model {
    public id!: number;
    public item_code!: string;
    public person_in_charge!: string;
    public quantity!: number;
    public date_deployed!: string;
    public remarks?: string;
}

DeployedSuppliesModel.init(
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
        person_in_charge: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        date_deployed: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true,
        },
    },
    {
        sequelize,
        modelName: 'DeployedSuppliesModel',
        tableName: 'deployed_supplies',
        timestamps: false,
    }
);
export { DeployedSuppliesModel };