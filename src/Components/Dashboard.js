import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { CTX } from "./Store";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  grow: {
    flexGrow: "1",
  },
  textCenter: {
    textAlign: "center",
  },
  chatHeader: {
    flexGrow: "1",
    backgroundColor: theme.palette.primary.main,
    color: "#FFF",
    textAlign: "center",
  },
  topicsWindow: {
    width: "200px",
    backgroundColor: theme.palette.grey[800],
    height: "calc(100vh - 122px)",
    maxHeight: "100%",
    color: "#FFF",
    display: "inline-flex",
    float: "left",
    flexDirection: "column",
  },
  chatWindow: {
    height: "calc(100vh - 222px)",
    borderRadius: 0,
    overflowY: "auto",
  },
  chatWindowContent: {
    backgroundColor: theme.palette.grey[500],
  },
  footer: {
    padding: "1.5rem",
    display: "flex",
    justifyContent: "space-between",
  },
  flex: {
    display: "flex",
  },
  alignCenter: {
    alignItems: "center",
  },
  spacing: {
    marginRight: "20px",
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const { allChats, sendChatMsg, user } = React.useContext(CTX);
  const topics = Object.keys(allChats);

  const [value, setValue] = useState("");

  const [activeTopic, setActiveTopic] = useState(topics[0]);
  return (
    <div>
      <div className={classes.root}>
        <div className={classes.chatHeader}>
          <h1>REACT CHAT APPLICATION</h1>
          <h3>{activeTopic}</h3>
        </div>
      </div>
      <div className={classes.topicsWindow}>
        {topics.map((topic, idx) => {
          return (
            <List component="nav" key={idx}>
              <ListItem
                button
                onClick={(e) => setActiveTopic(e.target.innerText)}
              >
                <ListItemIcon>{/* <InboxIcon /> */}</ListItemIcon>
                <ListItemText primary={topic} />
              </ListItem>
            </List>
          );
        })}
      </div>
      <div className={classes.chatWindowContainer}>
        <Card className={classes.chatWindow} variant="outlined">
          {allChats[activeTopic].map((msg, idx) => {
            return (
              <CardContent
                key={idx}
                className={`${classes.flex} ${classes.chatWindowContent} ${classes.alignCenter}`}
              >
                <Avatar
                  alt={msg.from}
                  src="dummy.jpg"
                  className={classes.spacing}
                />
                <Typography>{msg.msg}</Typography>
              </CardContent>
            );
          })}
        </Card>
        <div className={classes.footer}>
          <TextField
            className={classes.grow}
            id="standard-basic"
            label="Type here ..."
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <Button
            onClick={() => {
              sendChatMsg({ from: user, msg: value, topic: activeTopic });
              setValue("");
            }}
            variant="contained"
            color="primary"
          >
            Send
          </Button>
        </div>
      </div>
    </div>
  );
}
