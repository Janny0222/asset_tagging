import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class Status extends Model {
    public id!: number;
    public name!: string;
}

Status.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        sequelize,
        modelName: 'Status',
        tableName: 'statuses',
        timestamps: false,
    }
);

export { Status };
