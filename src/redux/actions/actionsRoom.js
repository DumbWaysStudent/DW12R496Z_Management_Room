import * as types from './../types'
import axios from 'axios'
import env from './../../../env'



export const heandleGetRooms = (data) => ({  
    type: types.GET_ROOMS,
    payload: axios({
        method: 'GET',
        headers: {
          'content-type': 'application/json',
      },
      data,
      url: `${env.apiUrl}/rooms`
      
      }),
});  
