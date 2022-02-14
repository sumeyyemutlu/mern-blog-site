import React, {useState, useEffect} from "react";
import {useDispatch} from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import PostsList from "./components/PostsList";
import AddPostForm from "./components/AddPostForm";
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
import {fetchPosts} from "./actions/post";
import PostDetails from "./components/PostDetails";


const useStyles = makeStyles((theme) => ({//makeStyles içindekileri theme nesnesi ile kullanabiliyoruz.
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    fontFamily:'Zen Kaku Gothic Antique',
    fontWeight: "600",
    fontSize: "28px",
        
  },
  container: {
    marginTop: theme.spacing(3),
  },
  cr: {
    backgroundColor: "white",
  }

 
}));

const App = () => {
  const dispatch = useDispatch(); //bir action tanımlanacak
  const [open , setOpen] = useState(false);//varsayılan olarak açılacak kutu false
  //BURADA OPEN VARSAYILAN OLARAK FALSE KULLANILMASINI SAĞLAYAN VERİMİZİ TUTAR
  //setOpen ise veri değiştirildiğindeki halini tutar.

  useEffect(()=> {//normalde apiden postları getir işlevini componentDidMount içinde fetch ile url yapardık 
    //ama useEffect ile aciton getirmeye yarayan useDispatch kullanarak ilgili actionu getir dedik
    //o acitonun içinde de postlerın olduğu url bulunuyor.
    dispatch(fetchPosts())
  }, [dispatch])//didspatch işlemi bittikten sonra durdur dedik.

  const handleOpen = () => {//yazı ekle kısmına tıklanıldığında bir alan açılması için fonk.
    setOpen(true);//handleOPen olunca kutu açılacak
  }
  const handleClose = () => {
    setOpen(false) //burada kutu kapanacak
  }

  const classes = useStyles(); //yukarıda oluşturduğumuz classları kullanabilmek için değişkene attık
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" className={classes.cr}>
 
      <AppBar position="static" color="inherit" elevation={1} >
        <Toolbar>
          
          <IconButton
            edge="start"
            className={classes.container}
            color="inherit"
          />
          <Typography variant="h6" className={classes.title}>
            <a id="title" href="https://blogram-frontend.herokuapp.com/posts/">Blogram</a>
          </Typography>
          <Button variant="outlined" color="primary" startIcon={<PenIcon />} onClick={handleOpen}>
            Yeni yazı
          </Button>
        </Toolbar>
      </AppBar>
      <Grid container className={classes.container}>
        <Grid item xs ={12}>
          <Router>
            <Switch>
              <Route exact path="/posts" component={PostsList} />
              <Route exact path="/posts/:id" component={PostDetails} /> {
              //ilgili postun içeriğini görüntülemek için daha fazlaya tıklandığında 
              // id ile ompostun detayları gösterilecek zaten id yi postListte tanımlamıştık.
            }
            </Switch>
            <Redirect from="/" to="/posts" /> {// redirect: url / da kalırsa onu /posts a götür demek.
            }
          </Router>
      </Grid>
      </Grid>
      </Container>
      <AddPostForm open={open} handleClose={handleClose} />
    </>
  );
};
export default App;
