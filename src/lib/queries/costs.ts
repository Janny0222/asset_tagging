import { sequelize } from "../db";
import { QueryTypes } from "sequelize";

export async function getTotalCostbyCategoryAndCompanyId(category_id: number) {
    const [results]: any = await sequelize.query(
        `SELECT SUM(CAST(REPLACE(cost, ',', '') AS UNSIGNED)) AS totalCost FROM asset_inventories WHERE category_id = :category_id`,
        {
            replacements: { category_id },
            type: QueryTypes.SELECT,
        }
    )
    return results.totalCost ?? 0;
}