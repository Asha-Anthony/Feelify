import React, { useCallback } from 'react'
import Webcam from "react-webcam";
import { useRef , useState} from "react";
export default function Camera() {

    const webCamRef = useRef(null);
    const[ imgSrc , setImage ] = useState(null);

    const click = useCallback(()=>{
        const imgSrc = webCamRef.current.getScreenshot();
        setImage(imgSrc);
    },[webCamRef]);

    const reclick =() =>{
        setImage(null);
    }

  return (
    <div className="container">
    {imgSrc ? (
      <img src={imgSrc} alt="webcam" />
    ) : (
      <Webcam height={600} width={600} ref={webCamRef} mirrored={true} screenshotFormat="image/jpeg" />
    )}
    <div className="btn-container">
    {imgSrc ? (
          <button onClick={reclick}>RECLICK !</button>
        ) : (
          <button onClick={click}>CLICK!</button>
        )}
    </div>
  </div>
  )
}
