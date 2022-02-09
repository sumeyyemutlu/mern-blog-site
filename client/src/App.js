import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import PostsList from "./components/PostsList";
import {
  CssBaseline,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import PenIcon from "@material-ui/icons/Create";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  container: {
    marginTop: theme.spacing(3),
  },
}));

const App = () => {
  const classes = useStyles(); //yukarıda oluşturduğumuz classları kullanabilmek için değişkene attık
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg">
      <AppBar position="static" color="inherit" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.container}
            color="inherit"
          />
          <Typography variant="h6" color="secondary" className={classes.title}>
            <a href="http://localhost:3000/posts">Blogify</a>
          </Typography>
          <Button color="primary" variant="outlined" startIcon={<PenIcon />}>
            Yeni yazı
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.container}>
        <Grid item xs ={12}>
          <Router>
            <Switch>
              <Route exact path="/posts" component={PostsList} />
            </Switch>
            <Redirect from="/" to="/posts" /> {//url / da kalırsa onu /posts a götür demek.
            }
          </Router>
      </Grid>
      </Grid>
      </Container>
    </>
  );
};
export default App;
