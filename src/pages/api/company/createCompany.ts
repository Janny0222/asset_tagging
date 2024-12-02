import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/models/CompanyModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Company.sync();
    if (req.method === 'POST') {
        const { name, code, table_name, logo_image } = req.body;
        try {
            

            const companyExists = await Company.findOne({ where: { name } });
            if (companyExists) {
                return res.status(400).json({ message: 'Company already exists' });
            }
            const company = await Company.create({ name, code, table_name, logo_image });
            return res.status(200).json(company);
        } catch (error) {
            console.error({ message: 'Error adding company', error });
        }
    }
}