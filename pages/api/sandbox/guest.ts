// ./pages/api/sandbox/guest.ts

/* Next */
import { NextApiRequest, NextApiResponse } from "next";

/* Prisma */
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

export default async function guest(req: NextApiRequest, res: NextApiResponse) {
    if (req.body.guest && req.body.message) {
        const data = await prisma.guest.create({ data: req.body });
        res.status(200).json({ data: data })
    } else {
        res.status(500).json({ error: "something went wrong" })
    }
}
  