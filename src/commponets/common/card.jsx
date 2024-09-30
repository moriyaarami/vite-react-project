
import { Link } from "react-router-dom"


function Card({ props, token = false }) {

    return <>
        <div className="card" style={{ width: "18rem" }}>
            <img src={props.image.url} className="card-img-top" alt={props.image.alt} style={{ width: "18rem", height: "14rem" }} />
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <p className="card-text">{props.description
                }</p>
                <p><b>address:</b> <span>{`${props.address.country} ,${props.address.city} ,${props.address.street}`}</span></p>

                <p><b>phone:</b> <span>{props.phone}</span></p>

                <p><b>card number:</b> <span>{props.bizNumber}</span></p>

                <a href={`tel:${props.phone}`} className="btn"><i className="bi bi-telephone-fill"></i></a>

                {/*  <a href="#" className="btn" onClick={() => handleLike(props._id)}><i className="bi bi-heart"></i></a> */}

                <div className="d-flex justify-content-end gap-2 pt-3">
                    {token ? <> <Link to={`delete/${props._id}`} className="btn btn-light">Delte</Link>
                        <Link to={`edit/${props._id}`} className="btn btn-dark">Edit</Link></> : null}
                    {/* 
                    <Link to={`info/${props._id}`} className="btn btn-secondary">More Info</Link> */}
                </div>

            </div>

        </div >
    </>
}

export default Card;