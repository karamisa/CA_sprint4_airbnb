import { useEffect, useState } from 'react'
import {  useNavigate, useLocation } from 'react-router-dom'

export function useQueryParams(paramName) {
  const location = useLocation()
  const navigate = useNavigate()
  const [paramValue, setParamValue] = useState(
    new URLSearchParams(location.search).get(paramName) || ''
  )

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    if (paramValue) searchParams.set(paramName, paramValue)
    else searchParams.delete(paramName)
    const newSearch = searchParams.toString()
    const newLocation = `${location.pathname}?${newSearch}`
    navigate(newLocation)
  }, [paramValue, location.search, location.pathname, paramName, navigate])

  return [paramValue, setParamValue]
}

