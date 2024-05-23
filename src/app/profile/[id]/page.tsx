import React from "react";

function page({ params }: any) {
  console.log(params, "params");

  return (
    <div className="flex justify-center items-center h-screen">{params.id}</div>
  );
}

export default page;
