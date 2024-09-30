import { useState } from "react";
import Card from "../commponets/common/card";
import EditCard from "./editCard";
import useAllMyCards from "../hooks/useAllMyCards";
import { getJWT, getUser } from "../service/userService";
import { Link } from "react-router-dom";


function MyCards() {
    const userToken = getJWT();

    const cards = useAllMyCards(userToken);

    return <>
        <h1 className="text-center text-secondary">My-Cards</h1>
        {cards.length == 0 ? <div className="text-center">
            <h3>You have no cards</h3>
            <h5>Lets create your first card</h5>

        </div> : <>
            <div className=" d-flex flex-wrap justify-content-center overflow-y-scroll gap-4 p-2" style={{ maxHeight: "75vh" }}>
                {cards.map((card) => <Card key={card._id} props={card} token={true}></Card>)}
            </div></>
        }

    </>
}

export default MyCards;