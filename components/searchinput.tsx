import React, { ChangeEvent } from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  height: fit-content;
  width: 100%;
  &:focus {
    border-color: #007bff;
  }
`;

interface SearchInputProps {
  value: string;
  searchValue: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const SearchInput: React.FC<SearchInputProps> = ({ value, searchValue }) => {
  return (
    <>
      <StyledInput
        placeholder="Input Search Value"
        value={value}
        onChange={searchValue}
      />
    </>
  );
};
