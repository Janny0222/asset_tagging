import {NextApiRequest, NextApiResponse} from 'next';
import { Monitor } from '@/models/MonitorModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        const { id } = req.query;
        try {
            await Monitor.sync()
            
            const specificMonitor = await Monitor.findOne({ where: { id: id } });
            if (!specificMonitor) {
                return res.status(400).json({ message: 'Monitor Not found' });
            } else {
                return res.status(200).json(specificMonitor);
            }
            
        } catch (error) {
            console.error({message: 'Error adding monitors', error})
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { assigned_to, brand, model, cost, serial_number, port_compatibility_id, date_purchased, date_installed } = req.body;
        try {
            await Monitor.sync()
            
            // const existingMonitor = await Monitor.findOne({ where: { serial_number } });
            // if (existingMonitor) {
            //     return res.status(400).json({ message: 'Monitor already exists' });
            // }
            const updatedMonitor = await Monitor.update({ assigned_to, brand, model, cost, serial_number, port_compatibility_id, date_purchased, date_installed }, { where: { id } });
            return res.status(200).json({ message: 'Monitor updated successfully', data: updatedMonitor });
        } catch (error) {
            console.error({message: 'Error updating monitor', error})
        }
    }
}