import { AddContext } from "../../App";
import { useContext } from "react";

export default function Cartlength (){
    const { cartItems, setCartItems} = useContext(AddContext);
    return  <div className="rounded-xl bg-red-600 px-2 absolute text-xs mt-3 ml-4">{cartItems.length}</div>
}