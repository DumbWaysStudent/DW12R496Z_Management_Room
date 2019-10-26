import * as types from './../types'
import axios from 'axios'
import env from './../../../env'

export const heandleGetCustomer = (token) => ({  
    type: types.GET_CUSTOMERS,
    payload: axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
      },
      url: `${env.apiUrl}/customers`
      
      }),
});  

export const heandleCustomer = (token,id) => ({  
    type: types.GET_CUSTOMERS,
    payload: axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'authorization': `Bearer ${token}`
      },
      url: `${env.apiUrl}/customer/${id}`
      
      }),
}); 
