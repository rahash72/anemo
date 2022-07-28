import React, { useContext, useState, useEffect } from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";
import Appbar from "./components/Appbar";
import AuthContext from "../../store/AuthContext";
import Ecommerce from "./components/Ecommerce";

const useStyles = makeStyles((theme) => ({
  appBar: {
    backgroundColor: "white",
    marginTop: "10px",
    marginBottom: "10px",
  },
}));

const EcommercePage = () => {
  const authCtx = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("All");
  const [items, setItems] = useState(null);

  useEffect(() => {
    const titleTemp = title ? title : "All";
    fetch(
      "http://localhost:8080/ecomm/" +
        authCtx.id +
        "/" +
        category +
        "/" +
        titleTemp,
      {
        method: "GET",
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
      })
      .then((data) => {
        console.log(data);
        setItems(data);
      });
  }, [title, category]);

  const classes = useStyles();
  return (
    <>
      <AppBar className={classes.appBar} position="static">
        <Toolbar>
          <Appbar
            title={title}
            setTitle={setTitle}
            category={category}
            setCategory={setCategory}
          />
        </Toolbar>
      </AppBar>
      <Ecommerce items={items} />
    </>
  );
};

export default EcommercePage;
