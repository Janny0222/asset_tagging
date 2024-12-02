import { NextApiRequest, NextApiResponse } from "next";
import { ComputerInventory } from "@/models/ComputerInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const {table_name} = req.body;
        try {
            await ComputerInventory.sync()
            const specificComputer = await ComputerInventory.update({ table_name }, { where: { id }});

            return res.status(200).json({ message: "Table inventory updated successfully" });

        } catch (error) {
            console.error({ message: "Error editing data", error });
        }
    }
}