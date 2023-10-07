import { db } from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  success: boolean;
  ip?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) {
  const data = await db.registerIp.findFirst({
    where: {
      req_id: req.query.reqId as string,
    },
  });
  if (data) {
    if (data.visited > 1) {
      res.status(200).json({ success: true, ip: data.ip });
    } else {
      res.status(200).json({ success: false });
    }
  } else {
    res.status(200).json({ success: false });
  }
}
