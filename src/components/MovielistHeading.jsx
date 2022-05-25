import React from "react";

export default function MovielistHeading(props) {
  return (
    <div className="col m-3">
      <h1>{props.heading}</h1>
    </div>
  );
}
