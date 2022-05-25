import React from "react";

export default function Search(props) {
  return (
    <div className="col col-sm-4 m-3 ">
      <input
        className="form-control"
        placeholder="Type Something to Search"
        value={props.value}
        onChange={(event) => {
          props.setsearchValue(event.target.value);
        }}
      />
    </div>
  );
}
