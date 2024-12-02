import {NextApiRequest, NextApiResponse} from 'next';
import { AssetInventory } from "@/models/AssetInventoryModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await AssetInventory.sync();
     if (req.method === 'PUT') {
        const { id } = req.query;
        try {
            await AssetInventory.sync();
            const specificAsset = await AssetInventory.update({ is_active: 2,}, { where: { id } });
                return res.status(200).json({ message: 'Table inventory updated successfully', data: specificAsset });
            
        } catch (error) {
            console.error({ message: 'Error editing data', error });
        }
    }
}