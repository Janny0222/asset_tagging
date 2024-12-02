import { NextApiRequest, NextApiResponse } from "next";
import { ComputerInventory } from "@/models/ComputerInventoryModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "POST") {
        const {
            name,
            department,
            cost,
            supplier,
            computer_type,
            monitor,
            remote_details,
            pc_details,
            specs,
            table_name,
            date_purchased,
            date_installed,
            date_returned,
            is_active
        } = req.body;

        try {
            await ComputerInventory.sync();
            const newComputer = await ComputerInventory.create({
                name,
                department,
                cost,
                supplier,
                computer_type,
                monitor,
                remote_details,
                pc_details,
                specs,
                table_name,
                date_purchased,
                date_installed,
                date_returned,
                is_active
            });
            res.status(201).json({message: 'Successfully Added new Computer Data', data: newComputer});
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    } else if(req.method === "GET") {
         try {
            const computers = await ComputerInventory.findAll();
            res.status(200).json(computers);
         } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal Server Error" });
         }
    } else {
        res.status(405).json({ error: "Method not allowed" });
    }
}