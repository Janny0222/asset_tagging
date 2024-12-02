import { NextApiRequest, NextApiResponse } from "next";
import { CellphoneInventory } from "@/models/CellphoneModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === "PUT") {
        const { id } = req.query;
        const {table_name} = req.body;
        try {
            await CellphoneInventory.sync()
            const specificComputer = await CellphoneInventory.update({ table_name }, { where: { id }});

            return res.status(200).json({ message: "Data has been successfully transfer" });

        } catch (error) {
            console.error({ message: "Error editing data", error });
        }
    }
}