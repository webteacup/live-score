import React, { useState } from "react";
import styled from "styled-components";
import { StatusCount } from "../interfaces";

const ContestSideBar = styled.div`
  margin-right: 1rem;
  background: white;
  color: #3d3d3d;
  position: relative;
  @media (max-width: 768px) {
    display: block;
    margin: 1rem 0;
  }
`;

const ContestSideBarHeader = styled.div`
  padding: 8px;
  font-size: 16px;
  width: 300px;
  border: 1px solid #ccc;
  cursor: pointer;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const ContestSideBarBody = styled.div<{ isopen: string }>`
  position: absolute;
  top: 50px;
  display: ${(props) => (props.isopen == "true" ? "block" : "none")};
  width: 100%;
`;

const SelectButton = styled.div<{active: string}>`
  width: 300px;
  border: solid 1px grey;
  padding: 8px;
  cursor: pointer;
  align-items: center;
  background: ${(props) => (props.active == "true" ? "#a3a3a3" : "white")};
  display: flex;
  &:hover {
    background-color: #a3a3a3;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Badge = styled.div`
  background: black;
  color: white;
  font-size: 12px;
  padding: 0.5rem;
  width: 50px;
  text-align: center;
  margin: auto 0 auto auto;
`

interface SearchInputProps {
  data: StatusCount[] | undefined,
  filter: string;
  filterValue: (event: string) => void;
}

interface FilterType {
  value: string,
  text: string
}

export const ContestFilter: React.FC<SearchInputProps> = ({ data, filter, filterValue }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState<FilterType>({value:'', text:'All'})

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const setFilterValue = (item:FilterType) => {
    setIsSidebarOpen(false);
    setActiveFilter(item)
    filterValue(item.value)
  };

  return (
    <>
      <ContestSideBar>
        <ContestSideBarHeader onClick={handleSidebarToggle}>
          Filters - {activeFilter.text}
        </ContestSideBarHeader>
        <ContestSideBarBody isopen={isSidebarOpen.toString()}>
          {data?.map((item, index) => 
            <React.Fragment key={index}>
              <SelectButton active={(item.value == filter).toString()} onClick={() => setFilterValue(item)}>
                {item.text}
                <Badge>
                  {item.count}
                </Badge>
              </SelectButton>
            </React.Fragment>
          )}

        </ContestSideBarBody>
      </ContestSideBar>
    </>
  );
};
