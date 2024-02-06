import useSWR from "swr";
import React, { useState } from 'react';
import { ContestBody, ContestContainer, ContestHeader, ContestControl } from "@/components/conteststyles";
import { Title } from "@/components/sharedstyles";
import { ContestType, StatusCount } from "../../interfaces";
import ContestCard from "@/components/contestcard";
import { SearchInput } from "@/components/searchinput";
import { ContestFilter } from "@/components/contestsidebar";

const fetcher = (url: string) => fetch(url).then((res) => res.json())

export default function Contests() {
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<string>('');
  const { data, error, isValidating } = useSWR<{ contests: ContestType[]; statusCounts: StatusCount[] }>(`/api/contests?search=${search}&status=${filter}`, fetcher);

  if (error) return <div>Failed to load</div>;

  return (
    <ContestContainer>
      <ContestHeader>
        <Title>Contests</Title>
        <ContestControl>
          <ContestFilter data={data?.statusCounts} filter={filter} filterValue={setFilter} />
          <SearchInput value={search} searchValue={(event) => setSearch(event.target.value)} />
        </ContestControl>
      </ContestHeader>
      <ContestBody>
          {error && <div>Failed to load</div>}
          {isValidating && <div>Loading...</div>}
          {!isValidating && data?.contests?.map((c) => (
            <React.Fragment key={c.id}>
              <ContestCard contest={c}></ContestCard>
            </React.Fragment>
          ))}
      </ContestBody>
    </ContestContainer>
  );
}
