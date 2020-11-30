import React from "react"

function PantryCard(props){

    return(
        <div className="card" style={{width: '18rem'}}>
            <img src={props.image} className="card-img-top" alt={props.name}/>
            <div className="card-body">
                <h5 className="card-title">{props.name}</h5>
                <p className="card-text">{props.description}</p>
                <p>Total weight: {props.weight} lbs</p>
            </div>
        </div>
    );
}

export default PantryCard;