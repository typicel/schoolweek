import React from "react";

const CompletedList = ({ compList }) => {
  if (compList) {
    return (
      <div>
        <div className="card-group">
          {compList.map((item) => {
            <p>{item.task}</p>;
          })}
        </div>
      </div>
    );
  } else {
    console.log("FUCK YOU");
    return <></>;
  }
};

export default CompletedList;
