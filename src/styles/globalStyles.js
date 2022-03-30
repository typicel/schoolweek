import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    body {
        background-color: ${({ theme }) => theme.mainbg};
        color: ${({ theme }) => theme.text};
    }

    .task-styles {
        background: ${({ theme }) => theme.cardbg};
        color: ${({ theme }) => theme.text};
        width: 20rem;
        border: ${({ theme }) => theme.cardborder};
    }

    .dark-input{
        background-color: ${({ theme }) => theme.mainbg};
        color: ${({ theme }) => theme.text};
    }

    .dark-input:focus{
      background: ${({ theme }) => theme.mainbg};
      color: ${({ theme }) => theme.text};
    }

    .title-bold{
      font-weight: bold;
    }

    .modal-styles{
        background-color: ${({ theme }) => theme.modalbg};
        color: ${({ theme }) => theme.text};
    }

  
`;

export const lightTheme = {
  cardborder: "none",
  body: `#fff`,
  text: `#000`,
};

export const darkTheme = {
  invert: "invert(1)",
  modalbg: `#0D1117`,
  mainbg: `#0D1117`,
  cardbg: `#0D1117`,
  cardborder: `1px solid #949494`,
  text: `white`,
};
