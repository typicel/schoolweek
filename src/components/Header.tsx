import React from "react";

interface Props {
  title: string;
}

const Header = ({ title }: Props) => {
  return (
    <header>
      <h1>
        <span role="img" aria-label="pencil">
          ✏️
        </span>
        {title}
      </h1>
    </header>
  );
};

export default Header;
