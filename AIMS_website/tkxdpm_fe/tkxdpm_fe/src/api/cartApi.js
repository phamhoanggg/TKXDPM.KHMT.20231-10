import axios from '../setup/CustomAxios';


const getCart = async() => {

    try {
      // make axios post request
      const res = await axios.get ('/carts/productincarts')
      return res;
    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export const updateCart= async(idOfProduct, quantity) => {
    
    try {
      const res = await axios.post (`/carts/${idOfProduct}/productincarts`, {
        quantity
      })
      return res;

    } catch(error) {
        return error.response.data;
    }
    
   
  }

  export default getCart;