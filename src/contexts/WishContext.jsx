import axios from "axios";
import { createContext, useEffect, useState } from "react";


export const WishListContext = createContext();

export default function WishListProvider({ children }) {
  const [wishListItem, setWishListItem] = useState([]);

  async function getAllWishList() {
   
      const {data} = await axios.get("https://route-ecommerce.onrender.com/api/v1/wishlist", {
        headers: {
          token: localStorage.getItem("token"),
        },
      });

      setWishListItem(data); 
   console.log(data);
  }

 

  useEffect(() => {
    getAllWishList();
  }, []); 

  

  return (
    <WishListContext.Provider value={{ wishListItem, setWishListItem }}>
      {children}
    </WishListContext.Provider>
  );
}
