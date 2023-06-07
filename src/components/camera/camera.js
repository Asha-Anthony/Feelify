import React from 'react'
import Webcam from "react-webcam";
import { useRef , useState} from "react";
export default function Camera() {

    const webCamRef = useRef(null);
    const[ imgSrc , setImage ] = useState(null);
  return (
    <div className="container">
    <Webcam height={600} width={600} ref ={webCamRef} />
  </div>
  )
}
