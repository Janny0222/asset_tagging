import {NextApiRequest, NextApiResponse} from 'next';
import {CellphoneInventory} from "@/models/CellphoneModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
     if (req.method === 'PUT') {
        const { id } = req.query;
        try {
            await CellphoneInventory.sync();
            const specificComputer = await CellphoneInventory.update({ is_active: 1,}, { where: { id } });
                return res.status(200).json({ message: 'Data has been successfully actived', data: specificComputer });
            
        } catch (error) {
            console.error({ message: 'Error editing data', error });
        }
    }
}