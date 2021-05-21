import './App.css';
import React, { useEffect, useState } from "react";
import Post from './Post.js'
import {auth, db} from './firebase';
import Modal from '@material-ui/core/Modal';
import {makeStyles} from '@material-ui/core/styles';
import {Button, Input} from '@material-ui/core';



  function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }));

function App() {
  const classes = useStyles();
  const [modalStyle]=useState(getModalStyle);

  const [post, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [user,setUser]=useState(null);

  useEffect(() => {
    auth.onAuthStateChanged((authUser) => {
    if (authUser) {
    // user has logged in
    console.log(authUser);
    setUser(authUser);
    if (authUser.displayName){
      // don't update username
    } else{
      // if we just created someone
      return authUser.updateProfile({
        displayName:username,
      }); 
    }
    } else {
    // user has logged out
    setUser(null);
    }
  })
}, [user,username]);

  useEffect(() =>{
    db.collection('posts').onSnapshot(snapshot => {
    setPosts(snapshot.docs.map(doc=>({
      id: doc.id,
      post: doc.data()
    }))); 
  })
  }, []);

  const signUp = (event)=> {
    event.preventDefault();

    auth.createUserWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message))
  }
  return (
    <div className="app">
          <Modal
            open={open}
            onClose={()=>setOpen(false)}>
            <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
              <center>
                <img
                className="app__headerImage"
                src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                alt=""
              />
              </center>
            <Input 
            placeholder="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
            placeholder="email"
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            />
            <Input 
            placeholder="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            />
            <Button onClick={signUp}>Sign Up</Button>
          </form>
            </div>         
          </Modal>

      <div className="app__header">
      <img
        className="app_headerImage"
        src="https://instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
        alt=""/>
      </div>
     

    <Button type="submit" onClick ={()=>setOpen(true)}>Sign Up</Button>    


    <h1>Hello Jasmeer, you've started React.js</h1> 
    {
      post.map(({id, post}) => (
          <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
      ))
    }
    </div>
  );
}

export default App;
