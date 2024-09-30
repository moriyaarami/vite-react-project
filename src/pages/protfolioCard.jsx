/* import { useParams } from "react-router-dom";
import { useCard } from "../hooks/useCard";
import cardsService from "../service/cardService";
async function ProtfolioCard() {

    const { id } = useParams;
    const card = useCard(id);

    if (!card) return <div>Loading...</div>;

    return (<>
        <div className="rounded d-flex justify-content-center align-items-center m-2" style={{ backgroundColor: "#54535370" }}>
            <div className="card rounded-5 m-5 p-5" style={{ width: "40vw" }}>
                <img src={data.image.url} className="card-img-top" alt={data.image.alt} />
                <div className="card-body">
                    <h2 className="card-title">{data.title}</h2>
                    <h5 className="card-text">{data.subtitle}</h5>
                    <h6 className="card-text pb-4">{data.description}</h6>
                    <p className="card-text "><i className="bi bi-building"></i>   {`${data.address.country}, ${data.address.city}, ${data.address.street}`}</p>
                    <p className="card-text"><i className="bi bi-telephone"></i>  {data.phone}</p>
                    {data.web && <p className="card-text"><i className="bi bi-phone"></i>  {data.web}</p>}

                    <p className="card-text"><i className="bi bi-envelope"></i>   {data.email}</p>
                    <p>Bissness Number: <span>{data.bizNumber}</span></p>
                </div>

            </div>
        </div>
    </>)
}

export default ProtfolioCard; */