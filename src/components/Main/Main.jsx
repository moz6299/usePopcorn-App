import React, { useState } from "react";
import { average, tempMovieData, tempWatchedData } from "../../../data";
import ListBox from "./Box";


const Main = ({ children }) => {
  return <main className="main">{children}</main>;
};

export default Main;
