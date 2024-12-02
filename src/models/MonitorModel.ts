import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'
import { Status } from './StatusModel';
import { Port } from './PortModel';
import { Company } from './CompanyModel';

class Monitor extends Model {
    public id!: number;
    public brand!: string;
    public model!: string;
    public cost!: string;
    public serial_number!: string;
    public is_active!: number;
    public date_purchased!: string;
    public date_installed!: string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

Monitor.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        model: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        serial_number: {
            type: DataTypes.STRING,
            allowNull: true
        },
        port_compatibility_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Port,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        company_table: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Company,
                key: 'id',
            },
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
        },
        is_active_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1,
            references: {
                model: Status,
                key: 'id',
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        date_purchased: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null, 
        },
        date_installed: {
            type: DataTypes.STRING,
            allowNull: true,
            defaultValue: null, 
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
        modelName: 'Monitor',
        tableName: 'monitor_table',
        timestamps: true
    }
);
export { Monitor }