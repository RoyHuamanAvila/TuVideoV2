/* eslint-disable @typescript-eslint/no-explicit-any */
import { AsyncThunkAction } from "@reduxjs/toolkit";
import { useState } from "react"
import { useDispatch } from "react-redux";
import { AppDispatch } from "../app/store";

interface ButtonAsyncHook {
  response: any;
  loading?: boolean;
  dispatchAction: (thunkAction: AsyncThunkAction<any, any, any>) => void;
}

const useButtonAsync = (text: string): ButtonAsyncHook => {
  const [response, setResponse] = useState(text);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch<AppDispatch>()

  const dispatchAction = async (thunkAction: AsyncThunkAction<any, any, any>) => {
    setLoading(true);
    dispatch(thunkAction).then((value) => {
      setLoading(false);
      if (value.payload !== undefined) setResponse(value.payload.content)
    }).catch(((error) => {
      setLoading(false)
      console.log(error);
    }))
  }

  return { response, loading, dispatchAction };
}

export default useButtonAsync;
