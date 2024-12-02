import { NextApiRequest, NextApiResponse } from "next";
import { CellphoneInventory } from "@/models/CellphoneModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const { id } = req.query;
    if(req.method === 'GET') {
        
        try {
            await CellphoneInventory.sync();
            const specificCellphone = await CellphoneInventory.findOne({ where: { id } });
            if(!specificCellphone) {
                return res.status(400).json({ message: 'Cellphone Not found' });
            } else {
                return res.status(200).json(specificCellphone);
            }
        } catch (error) {
            console.error({ message: 'Error adding computers', error });
        }
    } else if (req.method === 'PUT') {
        const { name, department, brand, cost, specs, email_password, table_name, cp_details, date_ordered, date_deployed, plan, inclusion, remarks } = req.body;
            try {
                await CellphoneInventory.sync();

                const updatedCellphone = await CellphoneInventory.update({name, department, brand, cost, specs, email_password, table_name, cp_details, date_ordered, date_deployed, plan, inclusion, remarks
                }, { where: { id } });
                return res.status(201).json({ message: 'Cellphone updated successfully', data: updatedCellphone });
        } catch (error) {
            console.error({ message: 'Error updating cellphone', error });
        }
    }
}