import {NextApiRequest, NextApiResponse} from 'next';
import {ComputerInventory} from "@/models/ComputerInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method === 'PUT') {
        const { id } = req.query;
        
        try {
            await ComputerInventory.sync();
            const specificComputer = await ComputerInventory.findByPk(Number(id));
            if(!specificComputer) {
                return res.status(400).json({ message: 'Inventory not found' });
            }
            await specificComputer.update({ is_active: 3 });
            return res.status(200).json({ message: 'Table inventory updated successfully', data: specificComputer });
        } catch (error) {
            console.error({ message: 'Error editing data', error });
        }
    } 
}