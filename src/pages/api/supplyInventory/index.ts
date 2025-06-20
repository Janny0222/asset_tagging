import { NextApiRequest, NextApiResponse } from "next";
import { SuppliesInventory } from "@/models/SuppliesInventoryModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    SuppliesInventory.sync();
    if (req.method === "GET") {
        try {
            const getSuppliesInventory = await SuppliesInventory.findAll();
            return res.status(200).json(getSuppliesInventory);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        const { item_code, item_name, manufacturer, description, item_cost, stocks, invoice_number, invoice_date } = req.body;
        try {
            
            const newSuppliesInventory = await SuppliesInventory.create({ item_code, item_name, manufacturer, description, item_cost, stocks, invoice_number, invoice_date });
            return res.status(200).json({ message: "Supply added successfully", data: newSuppliesInventory });
        } catch (error) {
            console.error({ message: "Error adding supply", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}