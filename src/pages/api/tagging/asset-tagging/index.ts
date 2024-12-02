import { NextApiRequest, NextApiResponse } from "next";
import { Tagging } from "@/models/TaggingModel";
import { Op } from "sequelize";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { tagging } = req.query;
    if (req.method === "GET") {
        try {
            const taggings = await Tagging.findAll({ where: { tagging:{ [Op.like]: `%${tagging}%` } } });
            if (!taggings) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json(taggings);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving taggings" });
        }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}