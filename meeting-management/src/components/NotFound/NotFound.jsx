import React from "react";

export default function NotFound() {
  return (
    <>
      <div className="container">
       
        <div className="imageContainer" style={{width:"600px"}}>
          <img
            className="w-100"
            src={require("../../image/404_error_with_a_landscape-rafiki.png")}
            alt="not found page"
          />
        </div>
      </div>
    </>
  );
}
