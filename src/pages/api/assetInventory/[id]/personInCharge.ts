import { NextApiRequest, NextApiResponse } from "next";
import { AssetInventory } from "@/models/AssetInventoryModel";
import { Op } from "sequelize";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        const { id, person_in_charge } = req.query;
        console.log("ID:", id, "Person in Charge:", person_in_charge);
        try {
            await AssetInventory.sync();
            const getAssetInventory = await AssetInventory.findAll({
                where: { company_id: id, person_in_charge: {
                    [Op.like]: `%${person_in_charge}%` // Using Op.like for partial matching
                } }
            });

            if( getAssetInventory.length === 0) {
                return res.status(404).json({ message: "No asset inventory found for the given person in charge." });
            }
            return res.status(200).json(getAssetInventory);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else {
        return res.status(405).json({ message: "Method Not Allowed" });
    }
}