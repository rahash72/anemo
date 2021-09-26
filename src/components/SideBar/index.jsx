import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import { FormControl, IconButton } from "@mui/material";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuRoundedIcon from "@mui/icons-material/MenuRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import StoreOutlinedIcon from "@mui/icons-material/StoreOutlined";
import { useHistory } from "react-router";

export default function SideBar(props) {
  const [state, setState] = React.useState(false);
  const history = useHistory();

  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState(open);
  };

  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
    >
      <List>
        <ListItem button onClick={() => history.push("/blog")}>
          <ListItemIcon>
            <ForumOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"Blog"} />
        </ListItem>
        <ListItem button onClick={() => history.push("/ecommerce")}>
          <ListItemIcon>
            <StoreOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary={"E-commerce"} />
        </ListItem>
        <ListItem button onClick={() => history.push("/findpeople")}>
          <ListItemIcon>
            <PersonSearchOutlinedIcon />
          </ListItemIcon>

          <ListItemText primary={"Find People"} />
        </ListItem>
        {/* <ListItem button onClick={() => history.push("/chat")}>
          <ListItemIcon>
            <MessageOutlinedIcon />
          </ListItemIcon>

          <ListItemText primary={"Chat"} />
        </ListItem> */}
        <ListItem button onClick={() => history.push("/profile")}>
          <ListItemIcon>
            <AccountCircleOutlinedIcon />
          </ListItemIcon>

          <ListItemText primary={"Profile"} />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button onClick={props.Logout}>
          <ListItemIcon>
            <LogoutRoundedIcon />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <div>
      <React.Fragment>
        <IconButton onClick={toggleDrawer(true)}>
          <MenuRoundedIcon style={{ color: "#297f87" }} />
        </IconButton>
        <Drawer anchor="right" open={state} onClose={toggleDrawer(false)}>
          {list()}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
