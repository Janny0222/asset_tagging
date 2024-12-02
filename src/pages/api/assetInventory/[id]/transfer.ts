import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const {company_id} = req.body;
        try {
            await AssetInventory.sync()
            const specificComputer = await AssetInventory.update({ company_id }, { where: { id }});

            return res.status(200).json({ message: "Table inventory updated successfully" });

        } catch (error) {
            console.error({ message: "Error editing data", error });
        }
    }
}