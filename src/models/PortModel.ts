import { Model, DataTypes } from 'sequelize';
import { sequelize } from '@/lib/db';

class Port extends Model {
    public id!: number;
    public name!: string;
    public date_created!: Date | null;
}

Port.init(
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
        date_created: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null,
        },
    },
    {
        sequelize,
        modelName: 'Port',
        tableName: 'ports',
        timestamps: false,
    }
);

export { Port };
