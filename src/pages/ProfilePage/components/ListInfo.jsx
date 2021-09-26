import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Divider, Chip, Button } from "@mui/material";

const ListInfo = () => {
  return (
    <List>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Name" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>Rahash Agarwal</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Bio" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Mollitia eos
          a sapiente tempora, perspiciatis alias error. Nobis accusantium unde
          perspiciatis possimus quidem iste ab id totam eveniet ducimus? Facere,
          dolor.
        </ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="College" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>Jadavpur University</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Specialization" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>Computer Science Engineering</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Year of Graduation" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>2024</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Connect" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>Instagram: __rahash__</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Skills" />
      </Divider>
      <ListItem className="list-item">
        <ListItemText>Rahash Agarwal</ListItemText>
      </ListItem>
      <Divider variant="middle" textAlign="left">
        <Chip color="primary" variant="outlined" label="Your Items" />
      </Divider>
      <ListItem className="list-item">
        <Button variant="contained">Become a Seller</Button>
      </ListItem>
    </List>
  );
};

export default ListInfo;
