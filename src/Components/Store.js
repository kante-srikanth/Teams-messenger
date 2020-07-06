import React from "react";
import io from "socket.io-client";

export const CTX = React.createContext();

const initialState = {
  General: [
    { from: "USER1", msg: "Hi1 There general" },
    { from: "USER2", msg: "Hi2 There general" },
    { from: "USER3", msg: "Hi3 There general" },
  ],
  Internal: [
    { from: "USER1", msg: "Hi1 There internal" },
    { from: "USER2", msg: "Hi2 There internal" },
    { from: "USER3", msg: "Hi3 There internal" },
  ],
};
function reducer(state, action) {
  const { from, msg, topic } = action.payload;

  switch (action.type) {
    case "RECEIVE_MESSAGE":
      return {
        ...state,
        topic: [
          ...state[topic],
          {
            from,
            msg,
          },
        ],
      };

    default: {
      return state;
    }
  }
}
let socket;

function sendChatMsg(value) {
  socket.emit("chat-msg", value);
}

export default function Store(props) {
  const [allChats, dispatch] = React.useReducer(reducer, initialState);

  console.log(allChats);

  if (!socket) {
    socket = io(":3001");
    socket.on("chat-msg", function (data) {
      dispatch({ type: "RECEIVE_MESSAGE", payload: data });
    });
  }

  const user = `user ${Math.floor(Math.random() * 100)}`;

  return (
    <CTX.Provider value={{ allChats, sendChatMsg, user }}>
      {props.children}
    </CTX.Provider>
  );
}
