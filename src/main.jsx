import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import './index.css'
import StarRating from "./components/StarRating.jsx";
import Test from "./components/Test.jsx";



ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
    {/*   <StarRating
      maxRating={5}
      color="yellow"
      size={48}
      className="test"
      messages={["Terrible", "Bad", "Okay", "Good", "Amazing"]}
      defaultRating = {3}
    />
    <StarRating maxRating={5} color="green" size={100} />
    <Test />*/}
  </React.StrictMode>
);
