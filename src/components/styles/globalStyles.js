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
        background: ${({ theme }) => theme.mainbg};
        color: ${({ theme }) => theme.text};
    }

    .dark-input:focus{
      background: ${({ theme }) => theme.mainbg};
      color: ${({ theme }) => theme.text};
    }

    .modal-styles .modal-content{
        background-color: ${({ theme }) => theme.modalbg};
      color: ${({ theme }) => theme.text};
    }

  
`;

export const lightTheme = {
  body: `#fff`,
  text: `#000`,
};

export const darkTheme = {
  modalbg: `#0D1117`,
  mainbg: `#0D1117`,
  cardbg: `#0D1117`,
  cardborder: `1px solid white`,
  text: `white`,
};
