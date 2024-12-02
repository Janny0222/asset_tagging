import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'
import { Status } from './StatusModel';
import { Company } from './CompanyModel';
import { Category } from './CategoryModel';

class AssetInventory extends Model {
    public id!: number;
    public person_in_charge!: string;
    public department!: string;
    public cost!: string;
    public supplier!: string;
    public model_number!: string;
    public asset_info!: string; // For Computer only
    public specs!: string;
    public remarks!: string;
    public company_id!: number | string;
    public category_id!: number | string;
    public invoice_date!: string;
    public invoice_number!: string; 
    public date_deployed!: string; // For Computer, Printer and Cellphone only
    public date_returned!: string;
    public is_active!: number;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

AssetInventory.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    person_in_charge: {
        type: DataTypes.STRING,
        allowNull: true
    },
    department: {
        type: DataTypes.STRING,
        allowNull: true
    },
    cost: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    supplier: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    model_number: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    asset_info: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    specs: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    company_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Company,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
    category_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Category,
            key: 'id'
        }
    },
    invoice_date: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    invoice_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_deployed: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    date_returned: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    is_active: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        references: {
            model: Status,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
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
    }
}, {
    sequelize,
    modelName: 'AssetInventory',
    tableName: 'asset_inventories',
    timestamps: true
})

export { AssetInventory };