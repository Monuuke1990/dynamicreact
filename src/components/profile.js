import React, { Component } from "react";
import axios from "axios";
 import { makeStyles } from "@material-ui/core/styles";

import Mystyle from "../mystyle.css";
import {
  CardMedia,
  Button,
  CardContent,
  CardActions,
  CardActionArea,
  Card,
  TextField,
  Grid,
  MenuIcon,
  IconButton,
  AppBar,
  Toolbar,
  Typography
} from "@material-ui/core";

import services from "../services";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom";

export default class Profile extends Component {
  constructor(){
    super();
    this.state = {
      filter: "",
      data: [],
      show: false,
      newUser: {
        Email: "",
        Name: "",
        Description: "",
        Image: ""
      }
  }
}
  async componentDidMount() {
    let data = await services.getUsers();
    data = data.data;
    console.log(data);
    this.setState({
      data: data
    });
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  showModal = () => {
    alert("safs");
    this.setState({ show: true });
  };

  hideModal = () => {
    this.setState({ show: false });
  }
  inputhandle = e => {
    e.preventDefault();

    this.setState({ newUser: {...this.state.newUser, [e.target.name]: e.target.value }});
    console.log({ [e.target.name]: [e.target.value] });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    let user =  await services.setData(this.state.newUser);
    console.log(user);
     this.setState({
       data: [...this.state.data, user]
     });
  };

filechange=(e)=>{
  console.log("image taken");
  this.setState({file:e.target.files[0]});
  // https://medium.com/@mahesh_joshi/reactjs-nodejs-upload-image-how-to-upload-image-using-reactjs-and-nodejs-multer-918dc66d304c
}
  render() {
    const baseUrl = "http://localhost:1337";
    const { filter, data } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = data.length && data.filter(item => {
      return Object.keys(item).some(key =>{
        console.log(item[key])
        if(typeof(item[key]) === 'string')
          return item[key] &&item[key].toLowerCase().includes(lowercasedFilter)
      });
    });

    return (
      <div>
        <AppBar position="static">
          <Toolbar variant="dense" className="Pro_nav">
            <Typography variant="h6">UX/UI Profession</Typography>
          </Toolbar>
        </AppBar>

        <div className="Wrapper_main">
          <button type="button" onClick={this.showModal}>
            open
          </button>
          <Grid container spacing={3}>
            <Grid item md={12} xs={12}>
              <TextField
                id="input-with-icon-grid"
                label="Search"
                value={filter}
                onChange={this.handleChange}
                className="search-box"
              />
            </Grid>

            {filteredData.length && filteredData.map(item => (
              <Grid item md={3} xs={12}>
                <Card key={item.id} className="card_hover">
                  <CardActionArea>
                    <CardMedia
                      style={{ backgroundImage: `url(${item.Image.length ? baseUrl + item.Image[0].url: ""}) ` }}
                      className="Avatar"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="h2">
                        {item.Name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.Description}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        component="p"
                      >
                        {item.Email}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  <CardActions>
                    {/*<Button className="btn-profile">Learn More</Button>*/}
                    <Link
                      to={`/profileDetails/` + item.id}
                      className="btn-profile"
                    >
                      Learn More
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>

        <main>
          <Modal show={this.state.show} handleClose={this.hideModal}>
            <form onSubmit={this.handleSubmit}>
            
              <TextField
                label="FullName"
                name="Name"
                type="text"
                value={this.state.newUser.Name}
                id={this.state.newUser.Name}
                onChange={this.inputhandle}
              />

<TextField
                label="Description"
                name="Description"
                type="text"
                value={this.state.newUser.Description}
                id={this.state.newUser.Description}
                onChange={this.inputhandle}
              />
              <TextField
                label="Email"
                name="Email"
                type="text"
                value={this.state.newUser.Email}
                id={this.state.newUser.Email}
                onChange={this.inputhandle}
              />
               <br/>  <br/>  <br/>   
              <input type="file" name="myImage" onChange= {this.filechange} /><br/>  <br/>  
              <input type="submit" value="Submit" /><br/>  <br/>  
            </form>
          </Modal>
        </main>
      </div>
    );
  }
}

const Modal = ({ handleClose, show, children }) => {
  const showHideClassName = show ? "modal display-block" : "modal display-none";

  return (
    <div className={showHideClassName}>
      <section className="modal-main">
        {children}
        <button onClick={handleClose}>close</button>
      </section>
    </div>
  );
};
