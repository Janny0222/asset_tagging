import {NextApiRequest, NextApiResponse} from 'next';
import {ComputerInventory} from "@/models/ComputerInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method === 'PUT') {
        const { id } = req.query;
        try {
            await ComputerInventory.sync();
            const specificComputer = await ComputerInventory.update({ is_active: 2,}, { where: { id } });
                return res.status(200).json({ message: 'Table inventory updated successfully', data: specificComputer });
            
        } catch (error) {
            console.error({ message: 'Error editing data', error });
        }
    } else if (req.method === 'GET') {
        const { id } = req.query;
        try {
            await ComputerInventory.sync();
            const inactiveCount = await ComputerInventory.count({ where: {is_active: 2, table_name: id } });
            const specificComputer = await ComputerInventory.findAll({ where: {is_active: 2, table_name: id } });
            if (!specificComputer) {
                return res.status(400).json({ message: 'Inventory not found' });
            } else {
                return res.status(200).json({specificComputer, inactiveCount});
            }
        } catch (error) {
            console.error({ message: 'Error adding computers', error });
        }
    }
}