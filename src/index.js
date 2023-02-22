import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import "github-fork-ribbon-css/gh-fork-ribbon.css";
import {RoomProvider} from "@dpapi/react";


ReactDOM.render(<RoomProvider><App /></RoomProvider>, document.getElementById("root"));
