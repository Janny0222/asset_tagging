import { NextApiRequest, NextApiResponse } from "next";
import { CellphoneInventory } from "@/models/CellphoneModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            await CellphoneInventory.sync();
            const activeCount = await CellphoneInventory.count({ where: { table_name: id, is_active: 1 } });
            const inactiveCount = await CellphoneInventory.count({ where: { table_name: id, is_active: 2 } });

            // Get active computers
            const activeCellphone = await CellphoneInventory.findAll({ where: { table_name: id, is_active: 1 } });
            // Get inactive computers
            const inactiveCellphone = await CellphoneInventory.findAll({ where: { table_name: id, is_active: 2 } });
            return res.status(200).json({ activeCount, inactiveCount, activeCellphone, inactiveCellphone });
        } catch (error) {
            console.error({ message: 'Error adding computers', error });
        }
    }
}