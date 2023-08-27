import React from "react";
import { ThreeCircles } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="flex flex-col justify-center items-center h-full space-y-3">
      <div>
        {" "}
        <h1 className="text-2xl md:text-4xl font-semibold">
          <span className="font-bold text-secondary hover:text-primary">
            Todo
          </span>
          &nbsp;
          <span className="font-bold text-primary hover:text-secondary">
            App
          </span>
        </h1>
      </div>
      <div>
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor="#F15A24"
          innerCircleColor="#233180"
          middleCircleColor="#4fa94d"
        />
      </div>
    </div>
  );
};

export default Loader;
