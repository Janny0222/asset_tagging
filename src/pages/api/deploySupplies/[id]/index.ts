import { NextApiRequest, NextApiResponse } from "next";
import { DeployedSuppliesModel } from "@/models/DeploySuppliesModel";

export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    await DeployedSuppliesModel.sync();
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const deployedSupplies = await DeployedSuppliesModel.findOne({ where: { id: id } });
            if (!deployedSupplies) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json(deployedSupplies);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving asset inventory" });
        }
    }
}