import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    await AssetInventory.sync();
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const assetInventory = await AssetInventory.findOne({ where: { id: id } });
            if (!assetInventory) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json(assetInventory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving asset inventory" });
        }
    } else if (req.method === "PUT") {
        const { id } = req.query;
        const { person_in_charge, department, cost, supplier, model_number, asset_info, specs, company_id, category_id, invoice_date, invoice_number, date_deployed, remarks, date_returned } = req.body;
        try {
            const updatedAssetInventory = await AssetInventory.update({ person_in_charge, department, cost, supplier, model_number, asset_info, specs, company_id, category_id, invoice_date, invoice_number, date_deployed, remarks, date_returned }, { where: { id } });
            res.status(200).json({ message: "Table inventory updated successfully", data: updatedAssetInventory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating table inventory" });
        }
    }
}