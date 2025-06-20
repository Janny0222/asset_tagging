import { NextApiRequest, NextApiResponse } from "next";
import { SuppliesInventory } from "@/models/SuppliesInventoryModel";


export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    await SuppliesInventory.sync();
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const suppliesInventory = await SuppliesInventory.findOne({ where: { id: id } });
            if (!suppliesInventory) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json(suppliesInventory);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving asset inventory" });
        }
    }   else if (req.method === "PUT") {
        const { id } = req.query;
        const { item_code, item_name, manufacturer, description, item_cost, stocks, invoice_number, invoince_date } = req.body;
        try {
            const updatedSupplyInventory = await SuppliesInventory.update({ item_code, item_name, manufacturer, description, item_cost, stocks, invoice_number, invoince_date }, { where: { id } });
            res.status(200).json({ message: "Supply inventory updated successfully", data: updatedSupplyInventory });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating Supply inventory" });
        }
    }
    
}