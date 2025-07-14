import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'

class ServerAccountsModel extends Model {
    public id!: number;
    public name!: string;
    public department!: string;
    public server_user!: string;
    public server_password!: string;
    public status!: string; // Active, Inactive, etc.
    public remarks!: string;
    public company_id!: number | string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

ServerAccountsModel.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    server_user: {
        type: DataTypes.STRING,
        allowNull: false
    },
    server_password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Active'
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'ServerAccountsModel',
    tableName: 'server_accounts',
    timestamps: true,
});

export { ServerAccountsModel };