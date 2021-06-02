import { Link } from "react-router-dom";
import { useCart } from "../contexts";
import { FiShoppingCart } from 'react-icons/fi';
export default function CartButtonHandler(isItemInCart, itemInProduct) {
    const { cartDispatch } = useCart();
    if (isItemInCart) {
        return (
            <>
                <Link to="/cart">
                    <button
                        class="from-product view-cart ">
                        <FiShoppingCart />
                        {" "}
                            View Cart</button>
                </Link>
            </>
        )
    }
    return (
        <>
            <button
                class="from-product to-cart"
                type="button"
                onClick={() => {
                    cartDispatch({
                        query: "ADD_TO_CART",
                        item: itemInProduct
                    });
                }}
            >
                + {" "}Add to Cart
            </button>
        </>
    )
}
