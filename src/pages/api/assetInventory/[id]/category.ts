import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    AssetInventory.sync();
    if (req.method === "GET") {
        const {id, company_id} = req.query;
        
        try {
            const getAllActiveAsset = await AssetInventory.findAll({ where: {category_id: id, company_id: company_id, is_active: 1} });
            const getAllInactiveAsset = await AssetInventory.findAll({ where: {category_id: id, company_id: company_id, is_active: 2} });
            
            return res.status(200).json({ getAllActiveAsset, getAllInactiveAsset});
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    }
}