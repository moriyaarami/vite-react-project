import { useEffect, useState } from "react";
import cardsService from "../service/cardService";

function useAllMyCards(userToken) {
    const [cards, setCards] = useState([]);

    useEffect(() => {
        const getMyCards = async () => {
            const { data } = await cardsService.getAllMyCards(userToken);
            setCards(data);
        };

        getMyCards();
    }, []);

    return cards;

}

export default useAllMyCards;