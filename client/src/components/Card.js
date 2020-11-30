import React from "react";
import Moment from 'react-moment';
import "./Card.css";

function Card(props) {

  return (
    <div className="card" style={{ width: "22rem" }}>
      <img src={props.image} className="card-img-top" alt="Plant" />
      <div className="card-body">

        <h3 className="card-title"><b>{props.title}</b></h3>

        <p className="plantName">
          <b>Crop Planted:</b> {props.name}
        </p>

        <p className="card-text">
          <b>Planted on</b> {props.datePlanted} <b>over</b> {props.sqft}
           <b> sq.ft.</b>
        </p>

        <p className="card-text"><b>Status:</b> {props.status}</p>

        <p className="card-text">
          <b>Field Notes:</b> {props.description}
        </p>

        <p classname="postInfo card-text">
          posted by {props.user} on <Moment format="MM/DD/YYYY">{props.postDate}</Moment>
        </p>

        <div className="row">
          <p className="btn btn-success col-5">
           Edit Post
          </p>

          <div className="col-2"></div>

          <p onClick={props.function} className="btn btn-danger">
            Delete
          </p>

        </div>
        
      </div>
    </div>
  );
}

export default Card;
