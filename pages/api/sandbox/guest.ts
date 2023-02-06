// ./pages/api/sandbox/guest.ts

/* Next */
import { NextApiRequest, NextApiResponse } from "next";

/* Prisma */
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    return await createInquiry(req, res)
  } else {
    return res.status(405).json({ message: 'Method not allowed', success: false })
  }
}

async function createInquiry(req: NextApiRequest, res: NextApiResponse) {
  const body = req.body
  try {
    const entry = await prisma.inquiry.create({
      data: {
        guest: body.guest,
        message: body.message
      }
    })
    return res.status(200).json(entry)
  } catch (error) {
    console.error('Request error', error)
    res.status(500).json({ error: 'Error', success: false })
  }
}