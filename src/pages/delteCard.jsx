import { useEffect } from "react";
import cardsService from "../service/cardService";
import { useNavigate, useParams } from "react-router-dom";


function CardDelete() {
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const deleteCard = async () => {
            await cardsService.deleteCard(id).catch(() => { });
            navigate("/my-card");
        };

        deleteCard();
    }, [id, navigate]);
    return null;
};

export default CardDelete;