import { useEffect, useState } from 'react'
import {  useLocation } from 'react-router-dom'

function useQueryParams(paramName) {
  const location = useLocation()
  const [paramValue, setParamValue] = useState(
    new URLSearchParams(location.search).get(paramName) || ''
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    console.log('here', searchParams)
    if (paramValue) searchParams.set(paramName, paramValue)
    else searchParams.delete(paramName)
    const newSearch = searchParams.toString()
    const newLocation = `${location.pathname}?${newSearch}`
    window.history.pushState({}, '', newLocation)
  }, [paramValue, location.search, location.pathname, paramName])

  return [paramValue, setParamValue]
}

export default useQueryParams