import { START_LOADING, END_LOADING, CHECK_WL_SUCCESS, CHECK_WL_FAILURE } from "../constants"
import * as api from "../api"
import { toast } from "react-toastify"






export const checker = (wallet) => async (dispatch) => {
    try {
        dispatch({ type: START_LOADING })
        const { data } = await api.checker(wallet)
        console.log("data",data)


        // data.success && dispatch({ type: SIGN_IN, data: data })
        dispatch({ type: END_LOADING })
      
        // data.error && dispatch( toast.error(<>{data.message}</>))
   
        // data.success && dispatch( toast.success(<>{data.message}</>))
        data.success &&   dispatch({ type: CHECK_WL_SUCCESS, payload:data })
       data.error && dispatch({ type: CHECK_WL_FAILURE, payload:data })

        // console.log("data", data.path)
        // data.success && window.open(`${data.path}`)




    } catch (error) {

    }

}