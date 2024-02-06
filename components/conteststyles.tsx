
import styled from "styled-components";


const ContestMain = styled.div`
  padding: 5rem 0;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CountryName = styled.p`
  margin: 0;
  padding: 0.2rem 0;
  line-height: 1.15;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
`;

const MatchName = styled.h4`
  margin: 0;
  padding: 0.2rem 0;
  line-height: 1.15;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
`;

const StatusText = styled.p<{ status: string }>`
  margin: 0;
  padding: 0.2rem 0;
  line-height: 1.15;
  font-size: 1.2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color:
  ${({ status }) => {
    switch (status) {
      case "canceled":
        return "#ef7384";
      case "finished":
        return "#52bc5e";
      case "inprogress":
        return "yellow";
      default:
        return "white";
    }
  }};
`;

const ScoreText = styled.h1`
  padding: 1rem 0;
  margin: 0;
  line-height: 1.5;
  font-size: 4rem;
  text-align: center;
  text-decoration: none;
`

const VersusInfo = styled.div`
  padding: 1rem 0;
  display: flex;
  justify-content: space-between;
  @media (max-width: 768px) {
    flex-direction: column; /* Change to column layout on smaller screens */
    align-items: center; /* Center align items when in column layout */
  }
`;

const TeamName = styled.h4`
  padding: 0 2rem;
  line-height: 1.15;
  font-size: 1.5rem;
  text-align: center;
  text-decoration: none;
  width: 300px;
  @media (min-width: 768px) {
    margin: auto
  }
`;

const StatusMetor = styled.div<{ status: string }>`
  width: 100px;
  height: 100px;
  border: double 0.2rem transparent;
  border-radius: 50%;
  background-image:
  ${({ status }) => {
    switch (status) {
      case "finished":
        return "linear-gradient(#3d3d3d, #3d3d3d), linear-gradient(green, green)";
      case "inprogress":
        return "linear-gradient(#3d3d3d, #3d3d3d), linear-gradient(to left, green 50%, grey 50%)";
      default:
        return "linear-gradient(#3d3d3d, #3d3d3d), linear-gradient(grey, grey)";
    }
  }};

  background-origin: border-box;
  background-clip: content-box, border-box;
  display:flex;
  justify-content: center;
  flex-direction: column;
`

const LiveStatusText = styled.h6`
  margin: 0;
  line-height: 1.15;
  font-size: 2rem;
  text-align: center;
  text-decoration: none;
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors?.secondary};
`

const ContestContainer = styled.div`
  padding: 0 0.5rem;
  max-width: 1400px;
  margin: auto;
`
const ContestHeader = styled.div`
  padding: 1rem 20px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const ContestBody = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust the gap between cards as needed */
  justify-content: space-around;
  padding: 20px;
  height: fit-content;
`;

const ContestList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px; /* Adjust the gap between cards as needed */
  justify-content: space-around;
  padding: 20px;
  height: fit-content;
`;

const ContestControl = styled.div`
  width: 100%;
  display: flex;

  @media (max-width: 768px) {
    display: block;
  }
`;
export { MatchName, CountryName, StatusText, ScoreText, VersusInfo, TeamName, ContestMain, StatusMetor, LiveStatusText, ContestContainer, ContestHeader, ContestBody, ContestList, ContestControl };