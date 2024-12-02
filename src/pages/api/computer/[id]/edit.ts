import {NextApiRequest, NextApiResponse} from 'next';
import {ComputerInventory} from "@/models/ComputerInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { id } = req.query;
        try {
            await ComputerInventory.sync();
            const specificComputer = await ComputerInventory.findOne({ where: { id: id } });
            if (!specificComputer) {
                return res.status(400).json({ message: 'Table inventory not found' });
            } else {
                return res.status(200).json(specificComputer);
            }
        } catch (error) {
            console.error({ message: 'Error adding computers', error });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
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
            date_purchased,
            date_installed,
        } = req.body;
        try {
            await ComputerInventory.sync();
            const specificComputer = await ComputerInventory.update({name, department, cost, supplier, computer_type, monitor, remote_details, pc_details, specs, date_purchased, date_installed,}, { where: { id } });
                return res.status(200).json({ message: 'Table inventory updated successfully', data: specificComputer });
            
        } catch (error) {
            console.error({ message: 'Error editing data', error });
        }
    } 
}