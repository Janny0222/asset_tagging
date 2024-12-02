import  { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/models/CategoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Category.sync();
    const { id } = req.query;
    if (req.method === 'GET') {
        try {
            const category = await Category.findOne({ where: { id } });
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            } else {
                return res.status(200).json(category);
            }
        } catch (error) {
            if (error instanceof Error) {
                return res.status(500).json({ message: error.message });
            }
        }
    }
}