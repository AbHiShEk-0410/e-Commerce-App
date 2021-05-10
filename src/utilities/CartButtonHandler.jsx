import { Link } from "react-router-dom";
import { useCart } from "../contexts";
export default function CartButtonHandler(isItemInCart, itemInProduct) {
    const { cartDispatch } = useCart();
    if (isItemInCart) {
        return (
            <>
                <Link
                    to="/cart"
                >
                    <button>View Cart</button>
                </Link>

            </>
        )
    }
    return (
        <>
            <button
                class="add-to-cart"
                type="button"
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
