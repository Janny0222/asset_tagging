import { Status } from "@/models/StatusModel";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    await Status.sync();
    if (req.method === "GET") {
        const { id } = req.query;
        try {
            const allStatus = await Status.findOne({ where: { id } });
            return res.status(200).json(allStatus);
        } catch (error) {
            console.error({ message: "Error adding monitors", error });
        }
    }
}