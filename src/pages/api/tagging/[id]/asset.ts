import { NextApiRequest, NextApiResponse } from "next";
import { Tagging } from "@/models/TaggingModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id, asset_type } = req.query;
    if (req.method === "GET") {
        try {
            const taggings = await Tagging.findAll({where: {table_id: id, asset_type: asset_type },
            });
            if (!taggings) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json( taggings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving taggings" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}