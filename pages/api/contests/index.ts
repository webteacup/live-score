import { NextApiResponse, NextApiRequest } from "next";
import contestData from "../../../utils/sports.json";
import { ContestType, ResponseError, StatusCount } from "../../../interfaces";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ contests: ContestType[]; statusCounts: StatusCount[] } | ResponseError>
) {
  try {
    const contests: ContestType[] = contestData as ContestType[];

    // Apply filters
    let filteredContests = contests;

    // Filter by status
    const statusFilter = req.query.status as string;
    let statusCounts: Record<string, number> = {};

    
    // Add overall count with value: ""
    const overallCount = filteredContests.length;
    statusCounts[""] = overallCount;
    
    if (statusFilter && ["finished", "canceled", "inprogress", "notstarted"].includes(statusFilter)) {
      filteredContests = contests.filter((contest) => {
        const matchStatus = contest.status.type === statusFilter;
        // Increment status count
        if (!statusCounts[contest.status.type]) {
          statusCounts[contest.status.type] = 1;
        } else {
          statusCounts[contest.status.type]++;
        }
        return matchStatus;
      });
    } else {
      // If no status filter, count contests for each status
      statusCounts = contests.reduce((acc, contest) => {
        if (!acc[contest.status.type]) {
          acc[contest.status.type] = 1;
        } else {
          acc[contest.status.type]++;
        }
        return acc;
      }, statusCounts);
    }

    // Convert statusCounts to an array of objects with text
    const statusCountsArray: StatusCount[] = Object.entries(statusCounts).map(([value, count]) => ({
      value,
      count,
      text: mapStatusToText(value),
    }));

    // Search by contest name
    const searchQuery = req.query.search as string;
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      filteredContests = filteredContests.filter((contest) =>
        contest.name.toLowerCase().includes(lowercasedQuery)
      );
    }

    return res.status(200).json({ contests: filteredContests, statusCounts: statusCountsArray });
  } catch (error) {
    const responseError: ResponseError = {
      status: 500,
      message: "Internal Server Error",
    };
    return res.status(responseError.status).json(responseError);
  }
}

// Helper function to map status to text
function mapStatusToText(status: string): string {
  switch (status) {
    case "finished":
      return "Result";
    case "inprogress":
      return "Live";
    case "notstarted":
      return "Upcoming";
    case "":
      return "All";
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
}
