import { ServerAccountsProps } from "@/lib/definition";
import { NextApiRequest, NextApiResponse } from "next";

import { ServerAccountsModel } from "@/models/ServerAccountsModel";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    ServerAccountsModel.sync();
    const { company_id } = req.query;
    if (req.method === "GET") {
        try {
            const serverAccounts = await ServerAccountsModel.findAll({ where: { company_id } });
            return res.status(200).json(serverAccounts);
        } catch (error) {
            console.error({ message: "Error getting data", error });
            return res.status(500).json({ message: "Internal Server Error" });
        }
    } else if (req.method === "POST") {
        const { name, department, server_user, server_password, status, remarks }: ServerAccountsProps = req.body;
        try {
            const newServerAccount = await ServerAccountsModel.create({ name, company_id, department, server_user, server_password, status, remarks });
            return res.status(200).json({ message: "Server account added successfully", data: newServerAccount });
        } catch (error) {
            console.error({ message: "Error adding server account", error });
            return res.status(500).json({ message: "Error adding server account" });
        }
    }
}