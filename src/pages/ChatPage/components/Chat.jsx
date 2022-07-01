import React, { useContext, useState, useRef, useCallback } from "react";
import { Box, Typography, TextField, IconButton } from "@mui/material";
import { useEffect } from "react";
import AuthContext from "../../../store/AuthContext";
import Pusher from "pusher-js";
import SendRoundedIcon from "@mui/icons-material/SendRounded";
import "./Chat.css";
import { setSeconds } from "date-fns/esm";

const Chat = (props) => {
  const bottomRef = useRef(null);
  const authCtx = useContext(AuthContext);
  const [messages, setMessages] = useState();
  const [text, setText] = useState();
  const [shift, setShift] = useState();

  const handleSubmit = () => {
    if (text) {
      fetch("http://localhost:8080/messages/send/", {
        method: "POST",
        body: JSON.stringify({
          user1: authCtx.id,
          user2: props.id,
          sender: authCtx.id,
          message: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.ok) {
            return res.json();
          } else {
            return res.json().then((data) => {
              let errorMessage = data.message;

              if (data && data.error && data.error.message) {
                errorMessage = data.error.message;
              }

              throw new Error(errorMessage);
            });
          }
        })
        .then((data) => {
          if (!messages) {
            setMessages(data);
            props.setId(data._id);
          }
        })
        .catch((err) => {});
    }
    setText("");
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    fetch("http://localhost:8080/messages/" + authCtx.id + "/" + props.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          setMessages(data);

          const pusher = new Pusher("fa9ed026dede4902b34e", {
            cluster: "ap2",
          });

          const channel = pusher.subscribe("private" + data._id);
          channel.bind("updated", (data) => {
            setMessages(data);
          });
        }
      });
  }, [props.id]);

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "98%",
            margin: "10px",
            minHeight: "50px",
            backgroundColor: "#1976d2",
            borderRadius: "13px",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              marginLeft: "30px",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {props.name}
          </Typography>
        </Box>
        <Box
          sx={{
            height: "100%",
            overflow: "auto",
          }}
          className="scrollbar"
        >
          {messages &&
            messages.chats &&
            messages.chats.map((message) => {
              return (
                <div
                  class={
                    message.sender === authCtx.id
                      ? "talk-bubble-right round"
                      : "talk-bubble-left round"
                  }
                >
                  <div class="talktext">
                    <p>{message.message}</p>
                  </div>
                </div>
              );
            })}
          <div ref={bottomRef} />
        </Box>

        <Box
          sx={{
            display: "flex",
            marginLeft: "10px",
            marginBottom: "10px",
            minHeight: "60px",
            width: "98%",
            backgroundColor: "#1976d2",
            alignItems: "center",
            borderRadius: "15px",
          }}
        >
          <TextField
            sx={{
              backgroundColor: "white",
              margin: "15px",
              marginLeft: "25px",
              borderRadius: "15px",
            }}
            onKeyDown={(event) => {
              if (event.key === "Shift") {
                setShift(true);
              }
            }}
            onKeyUp={(event) => {
              if (event.key === "Shift") {
                setShift(false);
              }
            }}
            onKeyPress={(event) => {
              if (!shift && event.code === "Enter") {
                event.preventDefault();
                handleSubmit();
              }
            }}
            onChange={(event) => {
              setText(event.target.value);
            }}
            value={text}
            size="small"
            id="message"
            fullWidth
            multiline
            maxRows={3}
            variant="outlined"
          />
          <IconButton
            onClick={handleSubmit}
            sx={{ color: "white", marginRight: "20px" }}
          >
            <SendRoundedIcon />
          </IconButton>
        </Box>
      </Box>
    </>
  );
};

export default Chat;
