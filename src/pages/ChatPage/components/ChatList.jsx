import React, { useState, useEffect, useContext } from "react";
import {
  List,
  ListItemButton,
  ListItemText,
  Divider,
  Box,
  TextField,
  Typography,
  Button,
} from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import DatePicker from "@mui/lab/DatePicker";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AuthContext from "../../../store/AuthContext";
import NewPeople from "./NewPeople";
import Pusher from "pusher-js";

const ChatList = (props) => {
  const authCtx = useContext(AuthContext);
  const [chats, setChats] = useState([]);
  const [addChat, setAddChat] = useState(false);
  const [isNew, setIsNew] = useState(false);

  const handleAddChat = () => {
    setAddChat(!addChat);
  };

  useEffect(() => {
    fetch("http://localhost:8080/messages/get/" + authCtx.id)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        if (data) {
          const pusher = new Pusher("fa9ed026dede4902b34e", {
            cluster: "ap2",
          });

          const channel = pusher.subscribe("private" + data._id);
          channel.bind("updated", (data) => {
            setChats(data.chatList);
          });

          setChats(data.chatList);
          return () => {
            pusher.unsubscribe("private" + data._id);
          };
        } else {
          const pusher = new Pusher("fa9ed026dede4902b34e", {
            cluster: "ap2",
          });

          const channel = pusher.subscribe("private" + authCtx.id);
          channel.bind("inserted", (data) => {
            setChats(data.chatList);
            setIsNew(true);
          });

          return () => {
            pusher.unsubscribe("private" + authCtx.id);
          };
        }
      });
  }, [addChat, isNew]);

  return (
    <>
      {!addChat && (
        <>
          <Button
            sx={{ marginTop: "2vh" }}
            onClick={handleAddChat}
            variant="contained"
            fullWidth
          >
            New Chat
          </Button>
          {!chats.length && (
            <Typography marginTop="40vh" textAlign="center" variant="subtitle1">
              No Chats Found
            </Typography>
          )}
          {chats.length !== 0 && (
            <List sx={{ width: "100%", bgcolor: "background.paper" }}>
              <Typography
                textAlign="center"
                variant="h4"
                sx={{ marginTop: "10px", fontWeight: "bold" }}
              >
                Chats
              </Typography>
              <Box style={{ maxHeight: "65vh", overflow: "auto" }}>
                {chats.map((chat) => {
                  return (
                    <>
                      <ListItemButton
                        key={chat.user2._id}
                        onClick={() => {
                          props.setName(chat.user2.name);
                          props.setId(chat.user2._id);
                          props.handleChat(true);
                        }}
                      >
                        <ListItemText
                          primary={chat.user2.name}
                          secondary={chat.lastMessage}
                        />
                      </ListItemButton>
                      <Divider />
                    </>
                  );
                })}
              </Box>
            </List>
          )}
        </>
      )}
      {addChat && (
        <>
          <Button
            sx={{ marginTop: "2vh" }}
            onClick={handleAddChat}
            variant="outlined"
            fullWidth
          >
            BACK
          </Button>
          <NewPeople
            setName={props.setName}
            handleShowProfile={props.handleChat}
            setId={props.setId}
          />
        </>
      )}
    </>
  );
};

export default ChatList;
