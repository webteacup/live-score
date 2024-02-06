export type StatusType = {
  code: number;
  type: "finished" | "canceled" | "inprogress" | "notstarted"; // Adjust if there are other possible types
};

export type TeamType = {
  id: number;
  name: string;
  slug: string;
  gender: "M" | "F" | string; // Adjust if there are other possible types
  subTeams: any[]; // Adjust the type if sub-teams have a specific structure
};

export type StatusCount = {
  value: string;
  count: number;
  text: string;
}

export type ScoreType = {
  current: number;
  period1: number;
  normaltime: number;
};

export type ContestType = {
  id: string;
  name: string;
  competitionId: string;
  competition: string;
  countryId: string;
  country: string;
  timestamp: number;
  date: string;
  time: string;
  status: StatusType;
  round: {
    round: number;
  };
  homeTeam: TeamType;
  awayTeam: TeamType;
  homeScore: ScoreType;
  awayScore: ScoreType;
  liveStatus: string; // Adjust if there are other possible types
};


export type ResponseError = {
  status: number;
  message: string;
};