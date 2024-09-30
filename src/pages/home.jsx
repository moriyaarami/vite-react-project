import { useEffect, useState } from "react";
import Card from "../commponets/common/card";

function Home() {

    const [data, setData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        fetch("https://monkfish-app-z9uza.ondigitalocean.app/bcard2/cards")
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw response;
            })
            .then(data => {
                setData(data);

            })
            .catch(error => {
                setError(error);
            })
    }, []);

    return (
        <>
            {error && <div className="text-center">{error}</div>}
            <div className="text-center">
                <h1>CardS</h1>
                <p>here you can find cards from all categories</p>
            </div>
            <div className=" d-flex flex-wrap justify-content-center overflow-y-scroll gap-4 p-2" style={{ maxHeight: "75vh" }}>
                {data.length <= 0 ? <div>loading...</div> :
                    data.map(card => {
                        return <Card key={card._id} props={card} />
                    })
                }
            </div>


        </>
    )
}

export default Home;