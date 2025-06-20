import { NextApiRequest, NextApiResponse } from "next";
import { ReturnSuppliesModel } from "@/models/ReturnSuppliesModel";
import { SuppliesInventory } from "@/models/SuppliesInventoryModel";
import { DeployedSuppliesModel } from "@/models/DeploySuppliesModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    ReturnSuppliesModel.sync();
    if (req.method === "GET") {
        try {
            const getReturnedSupplies = await ReturnSuppliesModel.findAll();
            return res.status(200).json(getReturnedSupplies);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        const { item_code, person_in_charge, quantity, date_deployed, date_returned, remarks } = req.body;
        try {
            const supplyQty = await SuppliesInventory.findOne({ where: { item_code } });
            if (supplyQty!.stocks! < 1 || supplyQty!.stocks! < quantity) {
                return res.status(404).json({ message: "Insufficient Stock" });
            }

            const deployQty = await DeployedSuppliesModel.findOne({ where: { item_code, person_in_charge } });
            if (!deployQty) {
                return res.status(404).json({ message: "No deployed supply found for this item and person in charge" });
            }

            if(deployQty.quantity < quantity) {
                return res.status(400).json({ message: "Return quantity exceeds deployed quantity" });
            }
            deployQty.quantity -= quantity;
            await deployQty.save();

            supplyQty!.stocks! += quantity;
            await supplyQty!.save();
            
            const returnedSupplies = await ReturnSuppliesModel.create({
                item_code,
                person_in_charge,
                quantity,
                date_deployed,
                date_returned,
                remarks
            });

            return res.status(200).json({ message: "Supply deployed successfully", data: returnedSupplies });
            
        } catch (error) {
            console.error({ message: "Error finding supply", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    }
}