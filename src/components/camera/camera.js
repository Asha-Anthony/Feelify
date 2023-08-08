import React, { useCallback } from 'react'
import Webcam from "react-webcam";
import { useRef , useState } from "react";
import { useNavigate } from "react-router-dom";
import './camera.css';
import {
  PopupboxManager,
  PopupboxContainer
} from 'react-popupbox';


export default function Camera() {

    const webCamRef = useRef(null);
    const[ imgSrc , setImage ] = useState(null);
    const[emotion , setEmotion] = useState();
    const[flag , setFlag] = useState(false);
    const[url,setUrl] = useState();

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
  return (
    <div className="container">
   {
  imgSrc ? (
    flag ? (
      <>
          <h2> You seem {emotion}</h2>
          <br></br>
          <button onClick={()=>playPlaylist(url)}>GO TO TUNE</button>
          <br></br><br></br>
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
          <><button onClick={reclick}>RECLICK</button> &nbsp;&nbsp;
          <button onClick={handleUpload}>UPLOAD</button>
          </>
        
        ) : (
          <button onClick={click}>CLICK!</button>
        )}
    </div>
  </div>
  )
}
