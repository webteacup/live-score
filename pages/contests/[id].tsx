import { useRouter } from "next/router";
import useSWR from "swr";

import type { ContestType, ResponseError } from "../../interfaces";
import { Container, ErrorText } from "@/components/sharedstyles";
import { CountryName, MatchName, ScoreText, StatusText, VersusInfo, TeamName, ContestMain, StatusMetor, LiveStatusText } from "@/components/conteststyles";
import { formatDate } from "../../lib/dateformat";

const fetcher = async (url: string) => {
  const res = await fetch(url)
  const data = await res.json();
  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
}

const statusText = (status: string, date: number): string => {
  switch(status) {
    case "inprogress":
      return 'LIVE';
    case "finished":
      return 'FULLTIME';
    case "notstarted":
      return formatDate(date);
    default:
      return status;
  }
} 
export default function ContestPage() {
  const { query } = useRouter();
  const { data, error, isLoading, isValidating } = useSWR<
    ContestType,
    ResponseError
  >(() => (query.id ? `/api/contests/${query.id}` : null), fetcher);

  if (error) return <Container><ContestMain><ErrorText>{error.message}</ErrorText></ContestMain></Container>;
  if (isLoading) return <Container><ContestMain>Loading</ContestMain></Container>;
  if (!data) return null;

  return (
    <>
      <Container>
        <ContestMain>
          {isValidating ? (<>
            <p>Validating...</p>
          </>) : (<>
            <CountryName>
              {data.country}
            </CountryName>
            <MatchName>
              {data.name}
            </MatchName>
            <StatusText status={data.status.type}>{statusText(data.status.type, data.timestamp)}</StatusText>
            <ScoreText>
              {data.homeScore.current} - {data.awayScore.current}
            </ScoreText>
            <VersusInfo>
              <TeamName>{data.homeTeam.name}</TeamName>
              <StatusMetor status={data.status.type}>
                <LiveStatusText>{(data.liveStatus != 'Canceled') ? data.liveStatus : ''}</LiveStatusText>
              </StatusMetor>
              <TeamName>{data.awayTeam.name}</TeamName>
            </VersusInfo>
          </>)}
        </ContestMain>
      </Container>
    </>
  )
}