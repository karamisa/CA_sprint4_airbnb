// export function StayEdit() {
// return (
//     <section className="edit-stay">
//         Hello from EditStay
//     </section>
// )
// }

import { Link, Navigate, useNavigate, useParams } from "react-router-dom"
import { useEffect, useRef, useState } from "react"
import Select from "react-select"
import { Formik, Form, Field } from 'formik'
import * as Yup from 'yup'

import { stayService } from "../services/stay.service.local.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { saveStay } from "../store/stay/stay.action.js"

export function StayEdit() {
    const [stayToEdit, setStayToEdit] = useState(stayService.getEmptyStay())
    const [selectedOptions, setSelectedOptions] = useState()

    const navigate = useNavigate()
    const { stayId } = useParams()

    useEffect(() => {
        if (!stayId) return
        loadStay()
    }, [])

    function loadStay() {
        stayService.getById(stayId)
            .then((stay) => setStayToEdit(stay))
            .catch((err) => {
                console.log('Had issues in stay details', err)
                navigate('/stay')
            })
    }


    function getStayAmenities() {
        //supposed to be on service - but Karam is working on service now.
        const amenities = ["On wheels", "Box game", "Art", "Baby", "Doll", "Puzzle", "Outdoor", "Battery Powered"]
        return amenities
    }

    function handleChange({ target }) {
        let { value, name: field, type } = target
        value = (type === 'number') ? +value : value
        setStayToEdit(prevStay => {
            return { ...prevStay, [field]: value }
        })
    }

    function handleSelect(data) {
        setSelectedOptions(data)
        const labelsToSet = data.length ? data.map(i => i.value) : []
        console.log(labelsToSet)
        setStayToEdit((prevStay) => ({ ...prevStay, labels: labelsToSet }))
    }

    async function onAddStay(ev) {
        ev.preventDefault()
        const savedStay = await saveStay(stayToEdit)
        try {
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

    return <section className="stay-edit">
        <Formik
            initialValues={{
                name: 'Demo Place',
                price: '100'
            }}
            validationSchema={SignupSchema}
        >
            {({ errors, touched }) => (
                <Form className='edit-form'
                    onSubmit={onAddStay}>
                    <Field
                        name="name"
                        id="name"
                        value={stayToEdit.name}
                        onChange={handleChange}
                        placeholder="Stay Name"
                    />
                    {errors.name && touched.name ? (
                        <span>{errors.name}</span>
                    ) : null}

                    <Field
                        name="price"
                        id="price"
                        value={stayToEdit.price}
                        onChange={handleChange}
                        placeholder="Stay Price"
                    />
                    {errors.price && touched.price ? <div>{errors.price}</div> : null}

                    <div className="select-container">
                        <div>
                            What you have to offer?
                        </div>
                        <Select
                            // options={stayService.getStayAmenities().map((label) => ({ value: label, label }))}
                            options={getStayAmenities().map((label) => ({ value: label, label }))}
                            placeholder="Select amenities"
                            value={selectedOptions}
                            onChange={handleSelect}
                            isMulti={true}
                            className="multi-select"
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
                                })
                            }}
                        />
                    </div>

                    <button>Save Stay</button>
                    <Link className="nice-link" to="/stay">Cancel</Link>
                </Form>
            )}
        </Formik>

    </section>
}