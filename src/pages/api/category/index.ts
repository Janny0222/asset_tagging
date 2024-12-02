import { NextApiRequest, NextApiResponse } from "next";
import { Category } from "@/models/CategoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        Category.sync();
        try {
            const categories = await Category.findAll({});
            return res.status(200).json(categories);
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    } else if (req.method === "POST") {
        const { name } = req.body;
        try {
            const categoryExists = await Category.findOne({ where: { name } });
            if (categoryExists) {
                return res.status(400).json({ message: 'This category already exists' });
            }
            const newCategory = await Category.create({ name });
            return res.status(200).json({ message: "Category added successfully", data: newCategory });
        } catch (error) {
            console.error({ message: "Error adding category", error });
        }
    }
}