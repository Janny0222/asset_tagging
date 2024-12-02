import { DataTypes, Model } from "sequelize";
import { sequelize } from "@/lib/db";
import { Status } from "./StatusModel";

class User extends Model {
    uid!: number;
    username!: string;
    email!: string;
    department!: string;
    password!: string;
    is_active!: boolean;
    createdAt!: Date;
    updatedAt!: Date;
}

User.init(
    {
        uid: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: true
        },
        department: {
            type: DataTypes.STRING,
            allowNull: true
        },
        password: {
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
        modelName: 'User', 
        tableName: 'users', 
        timestamps: true,

    }
);

export { User };