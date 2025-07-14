import { ServerAccountsModel } from '@/models/ServerAccountsModel';
import { NextApiRequest, NextApiResponse } from "next";
import { ServerAccountsProps } from "@/lib/definition";

export default async function handler(req: NextApiRequest , res: NextApiResponse) {
    await ServerAccountsModel.sync();
    const { id } = req.query;
    if (req.method === "GET") {
        try {
            const serverAcoounts = await ServerAccountsModel.findOne({ where: { id: id } });
            if (!serverAcoounts) {
                return res.status(404).json({ message: "No data found" });
            }
            res.status(200).json(serverAcoounts);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error retrieving server account" });
        }
    }   else if (req.method === "PUT") {
        const { name, department, server_user, server_password, status, remarks } = req.body;
        try {
            if (!name || !department || !server_user || !server_password || !status) {
                return res.status(400).json({ error: "All fields are required" });
            }
            const updatedServerAccount = await ServerAccountsModel.update({ name, department, server_user, server_password, status, remarks }, { where: { id } });
            res.status(200).json({ message: "Server Account updated successfully", data: updatedServerAccount });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Error updating Server Account" });
        }
    } else if (req.method === "DELETE") {
        try {
            const deletedServerAccount = await ServerAccountsModel.destroy({ where: { id } });
            if (!deletedServerAccount) {
                return res.status(404).json({ message: "Server account not found" });
            }
            res.status(200).json({ message: "Server account deleted successfully" });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Error deleting server account" });
        }
    }
    
}