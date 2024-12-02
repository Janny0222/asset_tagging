import { NextApiRequest, NextApiResponse } from 'next';
import { Monitor } from '@/models/MonitorModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const { id } = req.query;
        try {
            await Monitor.sync()
            
            const specificCompany = await Monitor.findAll({ where: { company_table: id } });
            if (!specificCompany) {
                return res.status(400).json({ message: 'Company Not found' });
            } else { 
                return res.status(200).json(specificCompany);
            }
            
        } catch (error) {
            console.error({message: 'Error adding monitors', error})
        }
    }
}