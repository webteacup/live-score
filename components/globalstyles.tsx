import { createGlobalStyle } from "styled-components";
import { Barlow } from 'next/font/google';


const barlow = Barlow({ weight: '100', subsets: ['latin',] })

const GlobalStyle = createGlobalStyle`
  html,
  body {
    color: ${({ theme }) => theme.colors.primary};
    padding: 0;
    margin: 0;
    font-family: ${barlow.style.fontFamily};
    background-color: #3d3d3d
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }
`;

export default GlobalStyle;
