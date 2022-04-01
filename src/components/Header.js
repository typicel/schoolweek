import React from "react";

const Header = (props) => {
  return (
    <header>
      <h1>
        <span role="img" aria-label="pencil">
          ✏️
        </span>
        {props.title}
      </h1>
    </header>
  );
};

export default Header;
