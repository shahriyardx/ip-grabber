import { db } from "@/server/db"
import type { NextApiRequest, NextApiResponse } from "next"

type ResponseData = {
	success: boolean
	ip?: string
	agent?: string
	full_agent?: string
}

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<ResponseData>,
) {
	if (req.method === "GET") {
		const data = await db.registerIp.findFirst({
			where: {
				req_id: req.query.reqId as string,
			},
		})
		if (data) {
			res.status(200).json({ success: true, ...data })
		} else {
			res.status(200).json({ success: false })
		}
	} else {
		const ip = req.headers["x-forwarded-for"]
		const useragent = req.headers["user-agent"]

		if (!useragent) {
			return res.json({ success: false })
		}
		const idx1 = useragent.indexOf("(")
		const idx2 = useragent.indexOf(")")
		const agent = useragent.substring(idx1 + 1, idx2)

		const { reqId } = req.query as { reqId: string }
		const exists = await db.registerIp.findFirst({ where: { req_id: reqId } })

		if (!exists) {
			await db.registerIp.create({
				data: {
					ip: ip?.toString(),
					req_id: reqId,
					full_agent: useragent,
					fulfilled: true,
					visited: 1,
					agent,
				},
			})
		} else {
			await db.registerIp.updateMany({
				where: {
					req_id: reqId,
				},
				data: {
					agent,
					full_agent: useragent,
					ip: ip?.toString(),
					visited: { increment: 1 },
				},
			})
		}

		res.json({ success: true })
	}
}
