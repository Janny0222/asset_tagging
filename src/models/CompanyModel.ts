import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'

class Company extends Model {
    public id!: number;
    public name!: string;
    public code!: string;
    public table_name!: string;
    public logo_image!: string
    public is_active!: number;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

Company.init(
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
        code: {
            type: DataTypes.STRING,
            allowNull: false
        },
        table_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        logo_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: 'statuses',
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
        modelName: 'Company',
        tableName: 'company',
        timestamps: true
    }
);
export { Company }