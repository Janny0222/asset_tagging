import { NextApiRequest, NextApiResponse } from "next";
import { DeployedSuppliesModel } from "@/models/DeploySuppliesModel";
import { SuppliesInventory } from "@/models/SuppliesInventoryModel";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    DeployedSuppliesModel.sync();
    if (req.method === "GET") {
        try {
            const getDeployedSupplies = await DeployedSuppliesModel.findAll();
            return res.status(200).json(getDeployedSupplies);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        const { item_code, person_in_charge, quantity, date_deployed, remarks } = req.body;
        try {
            const supplyQty = await SuppliesInventory.findOne({ where: { item_code } });
            if (supplyQty!.stocks! < 1 || supplyQty!.stocks! < quantity) {
                return res.status(404).json({ message: "Insufficient Stock" });
            }

            supplyQty!.stocks! -= quantity;

            const newDeployedSupply = await DeployedSuppliesModel.create({
                item_code,
                person_in_charge,
                quantity,
                date_deployed,
                remarks
            });

            await supplyQty!.save();
            return res.status(200).json({ message: "Supply deployed successfully", data: newDeployedSupply });
            
        } catch (error) {
            console.error({ message: "Error finding supply", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}