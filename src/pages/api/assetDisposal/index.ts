import { NextApiRequest, NextApiResponse } from "next";
import { AssetDisposable } from "@/models/AssetDisposable";
import { where } from "sequelize";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    AssetDisposable.sync();
    const {id} = req.query;
    if (req.method === "GET") {
        try {
            const getAssetDisposal = await AssetDisposable.findAll({where: {company_id: id}});
            return res.status(200).json(getAssetDisposal);
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    } else if (req.method === "POST") {
        const { asset_type, brand, serial_number, quantity, condition, reason_disposal, disposal_method, company_id, date_disposal, approved_by, remarks } = req.body;
        try {
            if(!condition) {
                return res.status(400).json({ message: "Missing required fields" });
            }
            const newAssetDisposal = await AssetDisposable.create({ asset_type, brand, serial_number, quantity, condition, reason_disposal, disposal_method, company_id, date_disposal, approved_by, remarks });
            return res.status(200).json({ message: "Asset added successfully", data: newAssetDisposal });
        } catch (error) {
            console.error({ message: "Error adding asset", error });
        }
    }
}