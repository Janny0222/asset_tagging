import { Monitor } from '@/models/MonitorModel';
import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { Company } from '@/models/CompanyModel';

class ComputerInventory extends Model {
    public id!: number;
    public name!: string;
    public department!: string;
    public cost!: string;
    public supplier!: string;
    public computer_type!: string;
    public monitor!: number;
    public remote_details!: string;
    public pc_details!: string;
    public specs!: string;
    public table_name!: number;
    public date_ordered!: string;
    public date_installed!: string;
    public date_returned!: string;
    public is_active!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
}

ComputerInventory.init(
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        supplier: {
            type: DataTypes.STRING,
            allowNull: false
        },
        computer_type: {
            type: DataTypes.STRING,
            allowNull: true
        },
        monitor: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Monitor,
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        remote_details: {
            type: DataTypes.STRING,
            allowNull: true
        },
        pc_details: {
            type: DataTypes.STRING,
            allowNull: true
        },
        specs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        remarks: {
            type: DataTypes.STRING,
            allowNull: true
        },
        table_name: {
            type: DataTypes.INTEGER,
            allowNull: true,
            references: {
                model: Company,
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        date_ordered: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_installed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_returned: {
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
            },
            onDelete: 'cascade',
            onUpdate: 'cascade'
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
        modelName: 'ComputerInventory',
        tableName: 'computer_inventories',
        timestamps: true
    }
)

export { ComputerInventory }