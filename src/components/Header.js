import React from "react";

const Header = ({ type }) => {
  return (
    <header>
      <h1>
        <span role="img" aria-label="pencil">
          ✏️
        </span>
        {type}
      </h1>
    </header>
  );
};

export default Header;
