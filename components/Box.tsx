import React from "react";
import {twMerge} from "tailwind-merge";

interface BoxProps{
    children: React.ReactNode;
    classname?: string;
}

const Box: React.FC<BoxProps> = ({
    children,
    classname
}) => {

  return(
      //this div has some basic classes that defines the css look and has a merge that will receive from other component other classes
      <div className={twMerge(`bg-neutral-900 rounded-lg h-fit w-full`,
          classname)}>
          {children}
      </div>
  );
}

export default Box;