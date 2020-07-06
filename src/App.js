import React from "react";
import "./App.css";
import Dashboard from "./Components/Dashboard";
import { makeStyles } from "@material-ui/core/styles";
import Store from "./Components/Store";

const useStyles = makeStyles((theme) => ({
  root: {
    height: "100vh",
    width: "100vw",
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Store>
        <Dashboard />
      </Store>
    </div>
  );
}

export default App;
