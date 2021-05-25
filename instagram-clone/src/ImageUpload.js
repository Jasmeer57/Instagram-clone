import React, {useState} from 'react'
import {Button} from "@material-ui/core";
import {storage, db} from "./firebase";

function ImageUpload() {
  const [caption, setCaption] = useState('');
  const [progress,setProgress] = useState(0);
  const [image,setImage] = useState(null);

  const handleChange = (e) =>{
    if(e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = () =>{
      const uploadTask =  storage.ref(`images/${image.name}`).put(image);
      
      uploadTask.on(
        "state_changed",
        (snapshot)=>{
          const progress = Math.round(
            (snapshot.bytesTransferred/snapshot.totalBytes)*100
          );
            setProgress(progress);
        },
        (error) =>{
          // Error Function
          console.log(error);
          alert(error.message);
        },
        ()=>{
          // complete function
          storage
          .ref("images")
          .child(image.name)
          .getDownloadURL()
          .then(url=>{
            // post image inside db
            db.collection("post").add({
              timestamp: firebase.firestore.FieldValue.serverTimestamp
              caption: caption,
              imageUrl: url
              username: username
            })
          })
        }
      )
      
  }
  
    return (
        <div>
      {/* Caption Input */}
      {/* File Picker */}
      {/* Post Button */}
      <input type = "text" placeholder= "Enter a Caption.."onChange={event=>setCaption(event.target.value)}value={caption}/>
      <input type = "file" onChange={handleChange}/>
      <Button onClick={handleUpload}>Upload</Button>
    </div>
    )
}

export default ImageUpload
