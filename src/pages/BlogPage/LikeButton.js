import React from "react";
import { Badge, Button } from "@material-ui/core";
import { FavoriteBorderOutlined } from "@material-ui/icons";
import { useState, useEffect } from "react";

const LikeButton = (props) => {
  const [CurrentCount, setCurrentCount] = useState(0);

  const HandleClick = () => {
    setCurrentCount(CurrentCount + props.incrementBy);
  };

  return (
    <div>
      <Button onClick={HandleClick}>
        <Badge badgeContent={CurrentCount} color="primary">
          <FavoriteBorderOutlined />
        </Badge>
      </Button>
    </div>
  );
};

export default LikeButton;
