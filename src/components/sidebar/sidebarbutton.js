import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import {IconContext} from "react-icons"
import "./sidebarbutton.css"

export default function SidebarButton(props) {

  const location = useLocation();

  const isActive = location.pathname === props.to;

  const btnClass = isActive? "body-btn active":" body-btn";
  return (
    <Link to ={props.to}>
      <div className= {btnClass}>
        <IconContext.Provider value ={{ size:"24px", className:"btn-icon"}}>
        {props.icon}
        <p className="title-btn">{props.title}</p>

        </IconContext.Provider>
      </div>
    </Link>
  )
}
