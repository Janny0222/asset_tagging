import { Model, DataTypes } from 'sequelize'
import { sequelize } from '@/lib/db'
import { Company } from './CompanyModel';

class AssetDisposable extends Model {
    public id!: number;
    public asset_type!: string;
    public brand!: string;
    public serial_number!: string;
    public quantity!: string;
    public condition!: string;
    public reason_disposal!: string; // For Computer only
    public disposal_method!: string;
    public company_id!: number | string;
    public date_disposal!: string; 
    public approved_by!: string; // For Computer, Printer and Cellphone only
    public remarks!: string;
    public createdAt!: Date | null;
    public updatedAt!: Date | null;
}

AssetDisposable.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    asset_type: {
        type: DataTypes.STRING,
        allowNull: true
    },
    brand: {
        type: DataTypes.STRING,
        allowNull: true
    },
    serial_number: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    quantity: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    condition: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    reason_disposal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    disposal_method: {
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
    date_disposal: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    approved_by: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    remarks: {
        type: DataTypes.STRING,
        allowNull: true,
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
    modelName: 'AssetDisposable',
    tableName: 'asset_disposal',
    timestamps: true
})

export { AssetDisposable };