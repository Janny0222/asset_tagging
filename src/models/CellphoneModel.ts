import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'
import { Company } from './CompanyModel'
import { Status } from './StatusModel'

class CellphoneInventory extends Model {
    public id!: number
    public name!: string
    public department!: string
    public brand!: string
    public cost!: string
    public cp_details!: string
    public plan!: string
    public inclusion!: string
    public email_password!: string
    public specs!: string
    public remarks!: string
    public table_name!: number
    public date_ordered!: string
    public date_deployed!: string
    public date_returned!: string
    public is_active!: number
    public createdAt!: Date
    public updatedAt!: Date
}

CellphoneInventory.init(
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
        brand: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cost: {
            type: DataTypes.STRING,
            allowNull: true
        },
        cp_details: {
            type: DataTypes.STRING,
            allowNull: true
        },
        plan: {
            type: DataTypes.STRING,
            allowNull: true
        },
        inclusion: {
            type: DataTypes.STRING,
            allowNull: true
        },
        specs: {
            type: DataTypes.STRING,
            allowNull: true
        },
        email_password: {
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
        date_deployed: {
            type: DataTypes.STRING,
            allowNull: true
        },
        date_returned: {
            type: DataTypes.STRING,
            allowNull: true
        },
        is_active: {
            type: DataTypes.INTEGER,
            allowNull: true,
            defaultValue: 1,
            references: {
                model: Status,
                key: 'id'
            },
            onUpdate: 'cascade',
            onDelete: 'cascade'
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: null
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: null
        }
    },
    {
        sequelize,
        modelName: 'CellphoneInventory',
        tableName: 'cellphone_inventories',
        timestamps: true
    }
)

export { CellphoneInventory }