import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    AssetInventory.sync();
    if (req.method === "GET") {
        try {
            const getAssetInventory = await AssetInventory.findAll({
                
                order: [
                    ['category_id', 'ASC'],
                ]
            });
            
            return res.status(200).json(getAssetInventory);
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    } else if (req.method === "POST") {
        const { person_in_charge, department, cost, supplier, model_number, asset_info, specs, company_id, category_id, invoice_date, invoice_number, date_deployed, remarks, date_returned } = req.body;
        try {
            if(!invoice_number || !cost || !model_number) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const newAssetInventory = await AssetInventory.create({ person_in_charge, department, cost, supplier, model_number, asset_info, specs, company_id, category_id, invoice_date, invoice_number, date_deployed, remarks, date_returned });
            return res.status(200).json({ message: "Asset added successfully", data: newAssetInventory });
        } catch (error) {
            console.error({ message: "Error adding asset", error });
        }
    }
}