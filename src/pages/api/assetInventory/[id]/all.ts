import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id } = req.query;
        try {
            await AssetInventory.sync();
            const getAssetInventory = await AssetInventory.findAll({
                where: { company_id: id },
                order: [['category_id', 'ASC']],
            });
            return res.status(200).json(getAssetInventory);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}