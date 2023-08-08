import React, { useCallback } from 'react'
import Webcam from "react-webcam";
import { useRef , useState } from "react";
import { useNavigate } from "react-router-dom";
import './camera.css';



export default function Camera(props) {

    const webCamRef = useRef(null);
    const[ imgSrc , setImage ] = useState(null);
    const[emotion , setEmotion] = useState();
    const[flag , setFlag] = useState(false);
    const[url,setUrl] = useState();
    const[id,setID] = useState();

    const click = useCallback(()=>{
        const imgSrc = webCamRef.current.getScreenshot();
        setImage(imgSrc);
    },[webCamRef]);

    const reclick =() =>{
        setImage(null);
        setFlag(false)
    }

    const handleUpload = () => {
      if (!imgSrc) {
        return;
      }
  
      if (imgSrc) {
        // Create a Blob from the base64-encoded image data
        const blob = dataURItoBlob(imgSrc);
  
        // Create a FormData object to send the image to the server
        const formData = new FormData();
        formData.append('image', blob , 'latest.jpg');
     // console.log(formData);
      fetch('http://127.0.0.1:5000/upload', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log('Image uploaded successfully:', data);
          // You can handle the server response here, if needed
          setEmotion(data.emotion);
          setFlag(true);
          console.log(data.song);
          setUrl(data.song);
          setID(data.song_id)
        })
        .catch((error) => {
          console.error('Error uploading image:', error);
        });
      }
    }

    const dataURItoBlob = (dataURI) => {
      const byteString = atob(dataURI.split(',')[1]);
      const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      return new Blob([ab], { type: mimeString });
    };
    const navigate = useNavigate();
    const playPlaylist = (id) =>{
        navigate("/player",{state:{id:id}});
    }



    
    const add =() =>{
      console.log("in add"+props.username)
      fetch("http://127.0.0.1:5000//add_to_personal_collection", {
        method: 'POST',
        body: JSON.stringify({
          username: props.username,
          song_id:id,
        }), 
        headers: {
          'Content-type': 'application/json' 
        }
      }).then((res) =>
          res.json().then((data) => {
              console.log(data)
          })
      );
       
  }
  return (
    <div className="container">
   {
  imgSrc ? (
    flag ? (
      <>
          <h2> You seem {emotion}</h2>

      </>
    ) : (
      <div className='display'>
        <img  className="wimg"src={imgSrc} alt="webcam" />
      </div>
    )
  ) : (
    <Webcam className='cam' height={600} width={600} ref={webCamRef} mirrored={true} screenshotFormat="image/jpeg" />
  )
}
    <div className="btn-container">
    {imgSrc ? (
          flag ? (
            <>
          <button onClick={()=>playPlaylist(url)}>GO TO TUNE</button>&nbsp;&nbsp;
          <button onClick={()=>add()}>ADD TO LIBRARY</button>
          <br></br><br></br>
            <button onClick={reclick}>RECLICK</button>

            </>
          ) : (
            <><button onClick={reclick}>RECLICK</button> &nbsp;&nbsp;
            <button onClick={handleUpload}>UPLOAD</button>
            </>
          )


        
        ) : (
          <button onClick={click}>CLICK!</button>
        )}
    </div>
  </div>
  )
}
