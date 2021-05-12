import { Link } from "react-router-dom";
import { useCart } from "../contexts";
export default function CartButtonHandler(isItemInCart, itemInProduct) {
    const { cartDispatch } = useCart();
    if (isItemInCart) {
        return (
            <>
                <Link to="/cart">
                    <button
                        style={{
                            backgroundColor: "#adefd1ff", color: "black", fontWeight: "bold"
                        }}
                        class="product-to-cart">View Cart</button>
                </Link>
            </>
        )
    }
    return (
        <>
            <button
                class="product-to-cart"
                type="button"
                style={{ backgroundColor: "#00203fff", color: "white", fontWeight: "bold" }}
                onClick={() => {
                    cartDispatch({
                        query: "ADD_TO_CART",
                        item: itemInProduct
                    });
                }}
            >
                Add to Cart
            </button>
        </>
    )
}
