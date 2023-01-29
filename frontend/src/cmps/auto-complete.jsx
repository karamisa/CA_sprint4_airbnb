import { useRef, useEffect } from 'react'

export function AutoComplete({ handleClick }) {
  const autoCompleteRef = useRef()
  const inputRef = useRef()
  const options = {
    componentRestrictions: { country: [] },
    fields: ['address_components', 'geometry', 'icon', 'name'],
    types: ['establishment'],
  }
  useEffect(() => {
    autoCompleteRef.current = new window.google.maps.places.Autocomplete(
      inputRef.current,
      options
    )

    autoCompleteRef.current.addListener('place_changed', async function () {
      const place = await autoCompleteRef.current.getPlace()
      const lat = place.geometry.location.lat()
      const lng = place.geometry.location.lng()
      const loc = { lat, lng }

      // console.log('loc', loc)
      handleClick(loc)
    })
  }, [])

  return (
    <input
      placeholder='Enter address '
      className='locationInput'
      ref={inputRef}
    />
  )
}
