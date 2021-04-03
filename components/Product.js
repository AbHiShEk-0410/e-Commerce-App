import { data } from "../utilities/database"

export function Product() {
    return (
        <>
            {data.map((item) => {
                <>
                    <div key={item.id}>
                        <img src={item.image}></img>
                        <h1>{item.name}</h1>
                        <h2>{item.brand}</h2>
                        <h2>{item.price}</h2>
                        <h3>{item.rating}</h3>
                    </div>
                </>
            })}
        </>
    )
}