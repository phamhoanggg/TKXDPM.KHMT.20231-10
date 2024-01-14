import axios from '../setup/CustomAxios';

export default class mediaService{
  async getAllMedia(){
    try {
      // make axios post request
      const res = await axios.get ('/products')
       return (res);
    } catch(error) {
        return error.response.data;
    }
  }

  async getCate(){
    try {
      // make axios post request
      const res = await axios.get ('/categories')
      return (res) ;
    } catch(error) {
        return error.response.data;
    }
    
   
  }
}
