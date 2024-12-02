import { NextApiRequest, NextApiResponse } from "next";
import { Company } from "@/models/CompanyModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "GET") {
        try {
            const { id } = req.query;
            const specificCompany = await Company.findOne({ where: { id } });
            if (!specificCompany) {
                return res.status(400).json({ message: "Company Not found" });
            } else {
                return res.status(200).json(specificCompany);
            }
        } catch (error) {
            console.error({ message: "Error adding company", error });
        }
    } else if (req.method === 'PUT') {
        const { id } = req.query;
        const { name, code, table_name, logo_image } = req.body;
        try {
            const updatedCompany = await Company.update({ name, code, table_name, logo_image }, { where: { id } });
            return res.status(200).json({ message: 'Company updated successfully', data: updatedCompany });
        } catch (error) {
            console.error({ message: 'Error updating company', error });
        }
    }
}