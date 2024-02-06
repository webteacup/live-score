import { NextApiRequest, NextApiResponse } from "next";
import contestData from "../../../utils/sports.json";
import type { ContestType, ResponseError } from "../../../interfaces";

export default function contestHandler(
  req: NextApiRequest,
  res: NextApiResponse<ContestType | ResponseError>,
) {
  const { query } = req;
  const { id } = query;
  const contests: ContestType[] = contestData as ContestType[];
  const contest = contests.find((p) => p.id === id);

  // User with id exists
  return contest
    ? res.status(200).json(contest)
    : res.status(404).json({ status:404, message: `User with id: ${id} not found.` });
}