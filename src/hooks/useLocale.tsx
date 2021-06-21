import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/config'
import { actionTypes } from '../redux/actions/general'

const useLocale = () => {
  const { locale } = useSelector((state: RootState) => state.general)
  const dispatch = useDispatch()

  const setLocale = (key: string) => {
    dispatch({
      type: actionTypes.SET_LOCALE,
      payload: key,
    })
  }
  return {
    locale,
    setLocale,
  }
}

export default useLocale
