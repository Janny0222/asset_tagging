import { NextApiRequest, NextApiResponse } from "next";
import { Tagging } from "@/models/TaggingModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {tagging, asset_id, asset_type, table_id } = req.body;
        await Tagging.sync()
        try {
            const taggingExists = await Tagging.findOne({ where: { asset_id, table_id } });
            if (taggingExists) {
                return res.status(400).json({ message: 'This data is already tagged.' });
            }
            const newTagging = await Tagging.create({tagging, asset_id, asset_type, table_id });
            return res.status(200).json({ message: "Tagging added successfully", data: newTagging });
        } catch (error) {
            console.error({ message: "Error adding tagging", error });
        }
    } else if (req.method === "GET") {
        await Tagging.sync()
        const {  tagging } = req.query
        try {
            const allTaggings = await Tagging.findAll()
            const specificTaggings = await Tagging.findOne({ where: { tagging: tagging } });
            
            return res.status(200).json({allTaggings, specificTaggings});
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    }
}