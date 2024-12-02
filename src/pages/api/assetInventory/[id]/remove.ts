import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        try {
            const specificAsset = await AssetInventory.findByPk(Number(id));

            if(!specificAsset) {
                return res.status(400).json({ message: 'Inventory not found' });
            }

            await specificAsset.update({ is_active: 3 });
            return res.status(200).json({ message: "Data has been successfully removed", data: specificAsset });
        } catch (error) {
            console.error({ message: "Error editing data", error });
        }
    }
}