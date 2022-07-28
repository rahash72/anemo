import React from "react";
import {
  Grid,
  Typography,
  Card,
  CardHeader,
  Avatar,
  CardMedia,
  CardContent,
} from "@mui/material";
import CurrencyRupeeRoundedIcon from "@mui/icons-material/CurrencyRupeeRounded";

const Ecommerce = ({ items }) => {
  return (
    <>
      <Grid container spacing={2}>
        {items &&
          items.map((item) => {
            return (
              <>
                <Grid item xs={12} md={6}>
                  <Card sx={{ width: "100%" }}>
                    <CardHeader
                      avatar={
                        <Avatar sx={{ bgcolor: "red" }} aria-label="recipe">
                          {item.username[0]}
                        </Avatar>
                      }
                      title={item.title}
                      subheader={item.username}
                    />
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                    <CardContent>
                      <Typography variant="body2" color="text.secondary">
                        <CurrencyRupeeRoundedIcon fontSize="15px" />
                        {item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </>
            );
          })}
        {!items && (
          <Typography
            sx={{
              fontSize: "20px",
              marginTop: "20vh",
              textAlign: "center",
              display: "flex",
              width: "100%",
              alignContent: "center",
              justifyContent: "center",
            }}
          >
            No Items To Display!
          </Typography>
        )}
      </Grid>
    </>
  );
};

export default Ecommerce;
