import * as types from './../types'
import axios from 'axios'
import env from './../../../env'


export const heandleLogin = (data) => ({  
    type: types.AUTH_LOGIN,
    payload: axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
      },
      data,
      url: `${env.apiUrl}/login`
      
      }),
});  

export const heandleRegister = (data) => ({  
    type: types.AUTH_REGISTER,
    payload: axios({
        method: 'POST',
        headers: {
          'content-type': 'application/json',
      },
      data,
      url: `${env.apiUrl}/register`
      
      }),
});  
