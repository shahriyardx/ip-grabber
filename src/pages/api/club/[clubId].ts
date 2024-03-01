import { type TeamData } from "@/pages";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{
    error: boolean;
    message: string;
    data: null | TeamData;
  }>,
) {
  const club_id = req.query.clubId as string;
  const response = await fetch(
    `https://proclubs.ea.com/api/nhl/clubs/info?platform=ps5&clubIds=${club_id}`,
  );
  if (response.status !== 200) {
    return res.json({ error: true, message: response.statusText, data: null });
  }
  const data = (await response.json()) as Record<string, TeamData>;
  console.log(data);
  const team = data[club_id]!;

  return res.json({ error: false, message: "", data: team });
}
