import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.mainbg};
        color: ${({ theme }) => theme.text};
    }

    .task-styles {
        background: ${({ theme }) => theme.cardbg};
        width: 18rem;
        border: ${({ theme }) => theme.cardborder};
        pointer: hover;
    }

    .dark-input{
        background: $
    }

  
`;

export const lightTheme = {
  body: `#fff`,
  text: `#000`,
};

export const darkTheme = {
  mainbg: `#121212`,
  cardbg: `#242338`,
  cardborder: `1px solid white`,
  text: `white`,
};
