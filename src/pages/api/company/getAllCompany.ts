import { Company } from "@/models/CompanyModel";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Company.sync();
    if (req.method === "GET") {
        try {
            const allCompanies = await Company.findAll();
            return res.status(200).json(allCompanies);
        } catch (error) {
            console.error({ message: "Error adding company", error });
        }
    }
}