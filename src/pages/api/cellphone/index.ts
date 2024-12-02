import { NextApiRequest, NextApiResponse } from "next";
import { CellphoneInventory } from "@/models/CellphoneModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const allCellphones = await CellphoneInventory.findAll();
            return res.status(200).json(allCellphones);
        } catch (error) {
            console.error({ message: "Error getting data", error });
        }
    } else if (req.method === "POST") {
        const { name, department, brand, cost, specs, email_password, table_name, cp_details, date_ordered, date_deployed, plan, inclusion, remarks } = req.body;
        try {
            const newCellphone = await CellphoneInventory.create({ name, department, brand, cost, specs, email_password, table_name, cp_details, date_ordered, date_deployed, plan, inclusion, remarks });
            return res.status(200).json({ message: "Cellphone added successfully", data: newCellphone });
        } catch (error) {
            console.error({ message: "Error adding data", error });
        }
    }
}