import React from "react";

const Pagination = ({ total }) => {
  const tab = [];
  for (let i = 1; i <= Math.ceil(total / 5); i++) {
    tab.push(i);
  }
  return (
    <div id="pages">
      {tab.map((el) => {
        return (
          <a key={el} className="btn btn-light" href={`/bugList/page/${el}`}>
            {el}
          </a>
        );
      })}
    </div>
  );
};

export default Pagination;
