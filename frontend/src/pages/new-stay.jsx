import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Formik, Form, Field } from 'formik'
import Select from 'react-select'
import * as Yup from 'yup'

import { stayService } from '../services/stay.service.local.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveStay } from '../store/stay/stay.action.js'
import { LogoHeader } from '../cmps/header-footer/logo-header.jsx'
import { ProgressFooter } from '../cmps/header-footer/progress-footer.jsx'
import { filterService } from '../services/filter.service.js'
import { BtnCard } from '../cmps/ui/buttons/btn-card.jsx'
import { BtnCardLg } from '../cmps/ui/buttons/btn-card-lg.jsx'
import { AutoComplete } from '../cmps/auto-complete.jsx'
import { mapService } from '../services/map.service.js'
import { AiFillHome } from 'react-icons/ai'
import GoogleMapReact from 'google-map-react'

// import video from 'https://stream.media.muscache.com/zFaydEaihX6LP01x8TSCl76WHblb01Z01RrFELxyCXoNek.mp4?v_q=high'

mapService.connectGoogleApi()

export function NewStay() {
  const categories = filterService.getPopularCategories()
  const types = filterService.getTypes()

  const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())

  const [selectedOptions, setSelectedOptions] = useState()

  // steps to create new stay
  const [stepNum, setStepNum] = useState(0)

  const navigate = useNavigate()

  // step 2
  const [selectedCategory, setSelectedCategory] = useState(null)
  function onSelectCategory(category) {
    setSelectedCategory(category)
  }

  // step 3
  const [selectedType, setSelectedType] = useState(null)
  function onSelectType(type) {
    setSelectedType(type)
  }

  //step 4
  const [location, setLocation] = useState({})
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
      },
      (error) => {
        console.log(error)
      }
    )
  }, [])

  const zoom = 11

  const Popper = () => (
    <div className='map-popper'>
      <AiFillHome />
      <div className='popper-wedge'></div>
    </div>
  )
  const handleClick = ({ lat, lng }) => {
    setLocation({ lat, lng })
  }

  function getStayAmenities() {
    //supposed to be on service - but Karam is working on service now.

    const amenities = stayService.getAmenitiesList()
    return amenities
  }

  function handleChange({ target }) {
    let { value, name: field, type } = target
    value = type === 'number' ? +value : value
    setStayToEdit((prevStay) => {
      return { ...prevStay, [field]: value }
    })
  }

  function handleSelect(data) {
    setSelectedOptions(data)
    const amenitiesToSet = data.length ? data.map((i) => i.value) : []
    console.log(amenitiesToSet)
    setStayToEdit((prevStay) => ({ ...prevStay, amenities: amenitiesToSet }))
  }

  async function onAddStay(ev) {
    console.log('adding stay')
    ev.preventDefault()
    try {
      const savedStay = await saveStay(stayToEdit)
      showSuccessMsg(`Stay added (id: ${savedStay._id})`)
      navigate('/stay')
    } catch (err) {
      showErrorMsg('Cannot add Stay', err)
    }
  }

  const SignupSchema = Yup.object().shape({
    name: Yup.string()
      .min(2, 'Too Short!')
      .max(20, 'Too Long!')
      .required('Required'),
    price: Yup.string()
      .min(2, 'Too Short!')
      .max(4, 'Too Long!')
      .required('Required'),
  })

  return (
    <section className='new-stay'>
      <LogoHeader />

      {stepNum === 0 && (
        <div className='new-stay-form step-1'>
          <div className='tutorial'>
            <h5>Step 1</h5>
            <h1>Tell us about your place</h1>
            <p>
              In this step, we'll ask you which type of property you have and if
              guests will book the entire place or just a room. Then let us know
              the location and how many guests can stay.
            </p>

            {/* <video
            src={video}
            class='_e2l2kr'
            style={{ objectFit: 'cover' }}
            crossorigin='anonymous'
            muted=''
            playsinline=''
            preload='auto'
            autoplay=''
          /> */}
          </div>
        </div>
      )}

      {stepNum === 1 && (
        <div className='new-stay-form step-2'>
          <h1>Which of these best describes your place?</h1>

          <div className='category-list'>
            {categories.map((category) => {
              return (
                <BtnCard
                  className={
                    category.url === selectedCategory ? 'selected' : ''
                  }
                  key={category.url}
                  onClick={() => {
                    onSelectCategory(category.url)
                  }}>
                  <img
                    className='icon24 clr-secondary'
                    src={require(`../assets/img/categories/${category.url}.png`)}
                    alt={category.name}
                  />
                  <p className='category-name'>{category.name}</p>
                </BtnCard>
              )
            })}
          </div>
        </div>
      )}

      {stepNum === 2 && (
        <div className='new-stay-form step-3'>
          <h1>What type of place will guests have?</h1>

          <div className='type-list'>
            {types.map((type) => {
              return (
                <BtnCardLg
                  className={type.url === selectedType ? 'selected' : ''}
                  key={type.url}
                  onClick={() => {
                    onSelectType(type.url)
                  }}>
                  <div>
                    <h2>{type.name}</h2>
                    <p>{type.desc}</p>
                  </div>
                  <img
                    className='icon36 clr-secondary'
                    src={require(`../assets/img/type/${type.url}.svg`)}
                    alt={type.name}
                  />
                </BtnCardLg>
              )
            })}
          </div>
        </div>
      )}

      {stepNum === 3 && (
        <div className='new-stay-form step-4'>
          <h1>Where's your place located?</h1>
          <AutoComplete handleClick={handleClick} />

          <div style={{ height: '480px', width: '480px' }}>
            <GoogleMapReact
              onClick={handleClick}
              yesIWantToUseGoogleMapApiInternals
              bootstrapURLKeys={{
                key: 'AIzaSyBiiIc69TQVyevWG707rsniMhcnFEgSok8',
              }}
              defaultCenter={location}
              center={location}
              defaultZoom={zoom}>
              <Popper
                lat={location.lat}
                lng={location.lng}
                onClick={() => {}}
              />
            </GoogleMapReact>
          </div>
        </div>
      )}

      {stepNum === 4 && (
        <div className='new-stay-form step-5'>
          <h1>Confirm your address</h1>
          <div className='container'></div>
        </div>
      )}

      <ProgressFooter currStep={stepNum} setStepNum={setStepNum} />

      {/* <h1>Edit Stay</h1>
      <Formik
        initialValues={{
          name: 'Demo Place',
          price: '100',
        }}
        validationSchema={SignupSchema}>
        {({ errors, touched }) => (
          <Form className='edit-form' onSubmit={onAddStay}>
            <h3>Stay name:</h3>
            <Field
              name='name'
              id='name'
              value={stayToEdit.name}
              onChange={handleChange}
              placeholder='Stay Name'
            />
            {errors.name && touched.name ? <span>{errors.name}</span> : null}
            <Field
              name='summary'
              id='summary'
              value={stayToEdit.summary}
              onChange={handleChange}
              placeholder='Stay summary'
            />
            {errors.summary && touched.summary ? (
              <span>{errors.summary}</span>
            ) : null}
            <h3>Stay price:</h3>
            <Field
              name='price'
              id='price'
              value={stayToEdit.price}
              onChange={handleChange}
              placeholder='Stay Price'
            />
            {errors.price && touched.price ? <div>{errors.price}</div> : null}

            <div className='select-container'>
              <h3>What you have to offer?</h3>
              <Select
                // options={stayService.getStayAmenities().map((amenitie) => ({ value: amenitie, amenitie }))}
                options={getStayAmenities().map((label) => ({
                  value: label,
                  label,
                }))}
                placeholder='Select amenities'
                value={selectedOptions}
                onChange={handleSelect}
                isMulti={true}
                className='multi-select'
                styles={{
                  control: (baseStyles) => ({
                    ...baseStyles,
                    borderColor: 'gold',
                    // backgroundColor: 'lightyellow',
                  }),
                  option: (provided) => ({
                    ...provided,
                    borderBottom: '1px solid pink',
                    color: 'gray',
                    padding: 20,
                  }),
                }}
              />
            </div>

            <button>Save Stay</button>
            <Link className='nice-link' to='/stay'>
              Cancel
            </Link>
          </Form>
        )}
      </Formik> */}
    </section>
  )
}
