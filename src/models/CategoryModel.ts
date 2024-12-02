import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'
import { Status } from './StatusModel';

class Category extends Model {
    public id!: number;
    public name!: string;
    public is_active!: number;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

Category.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: Status,
                key: 'id'
            }
        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: true,
            defaultValue: null, 
        },
        updatedAt: {
            type: DataTypes.DATE,
            allowNull: true, 
            defaultValue: null, 
        },

    },
    {
        sequelize,
        modelName: 'Category',
        tableName: 'categories',
        timestamps: true
    }
);
export { Category }