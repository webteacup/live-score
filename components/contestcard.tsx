import Link from "next/link";
import { ContestType } from "../interfaces";
import styled from "styled-components";


const Card = styled.div`
  border: 1px solid grey;
  border-radius: 8px;
  padding: 20px;
  width: 400px; /* Adjust the width of each card as needed */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  @media (max-width: 1366px) {
    width: 300px
  }

  @media (max-width: 992px) {
    width: 40%
  }

  @media (max-width: 768px) {
    width: 80%
  }

  &:hover,
  :focus,
  :active {
    border-color: #0070f3;
    cursor: pointer;
  }
`

export default function ContestCard({ contest }: { contest: ContestType }) {
  return (
    <Card data-testid="contest-card">
      <Link href={`/contests/${contest.id}`}>{contest.name}</Link>
    </Card>
  );
}