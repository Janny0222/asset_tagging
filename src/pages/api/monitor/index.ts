import { NextApiRequest, NextApiResponse } from 'next';
import { Monitor } from '@/models/MonitorModel';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'POST') {
        const { assigned_to, brand, model, cost, serial_number, port_compatibility_id, company_table, date_purchased, date_installed } = req.body;
        try {
            await Monitor.sync()
            
            const existingMonitor = await Monitor.findOne({ where: { serial_number } });
            if (existingMonitor) {
                return res.status(400).json({ message: 'Monitor already exists' });
            }
            const newMonitor = await Monitor.create({ assigned_to, brand, model, cost, serial_number, port_compatibility_id, company_table, date_purchased, date_installed });
            return res.status(200).json({message: 'Monitor added successfully', data: newMonitor});
        } catch (error) {
            console.error({message: 'Error adding monitors', error})
        }
    } else if ( req.method === 'GET') {
        try {
            const specificCompany = await Monitor.findAll();
            return res.status(200).json(specificCompany);
        } catch (error) {
            console.error({message: 'Error adding monitors', error})
        }
    }
}