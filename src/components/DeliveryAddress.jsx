import React, { useEffect, useRef, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { BASE_URL, API_URL, GOOGLE_MAP_API_KEY } from "../constants/contant";
import { fetchAddressesAsync } from '../features/addressSlice';
import axios from "axios";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { fetchLocationsAsync } from '../features/locationSlice';

const DeliveryAddress = ({ setAddress }) => {
    const dispatch = useDispatch();
    const { user, user_id } = useSelector((state) => state.auth);
    const addresses = useSelector(state => state.addresses.addresses);
    const locations = useSelector(state => state.locations.locations);
    const [placeSelected, setPlaceSelected] = useState(false);
    const loc = locations.map((item) => {
        return item.locationName.split(',')[0]
    });
    const [toggle, setToggle] = useState(false);
    const [editingAddress, setEditingAddress] = useState(null);
    const autocompleteInputRef = useRef(null);
    const setFieldValueRef = useRef(null);
    const [mapSrc, setMapSrc] = useState("");

    useEffect(() => {
        if (user_id) {
            dispatch(fetchAddressesAsync(user_id));
        }
    }, [dispatch, user_id]);

    useEffect(() => {
        dispatch(fetchLocationsAsync());
    }, []);

    useEffect(() => {
        const loadScript = (url, callback) => {
            const script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = url;
            script.onload = callback;
            document.head.appendChild(script);
        };

        const handleScriptLoad = () => {
            const autocomplete = new window.google.maps.places.Autocomplete(autocompleteInputRef.current, {
                types: ["geocode"],
                componentRestrictions: { country: "in" },
            });

            autocomplete.setFields(["address_component", "formatted_address", "geometry"]);

            autocomplete?.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                let formattedAddress = place.formatted_address || '';
                let lat = place.geometry?.location?.lat();
                let lng = place.geometry?.location?.lng();
                let city = '';

                if (place.address_components) {
                    for (const component of place.address_components) {
                        if (component.types.includes('locality')) {
                            city = component.long_name;
                            break;
                        }
                    }
                }

                // if (!loc.includes(city)) {
                //     setFieldValueRef.current("location", "");
                //     const locationNames = locations.map(item => item.locationName).join('<br>');
                //     return Swal.fire({
                //         html: `Sorry, we are not available in your area yet.<br>Available locations:<br>${locationNames}`,
                //     });
                // }
                if (lat && lng) {
                    const mapUrl = `https://www.google.com/maps/embed/v1/view?key=${GOOGLE_MAP_API_KEY}&center=${lat},${lng}&zoom=14`;
                    setMapSrc(mapUrl);
                }
                if (setFieldValueRef.current) {
                    setFieldValueRef.current("location", formattedAddress);
                    if (autocompleteInputRef.current) {
                        autocompleteInputRef.current.value = formattedAddress;
                    }
                }
            });
            // autocompleteInputRef?.current?.addEventListener('blur', () => {
            //     if (!placeSelected) {
            //         setFieldValueRef.current("location", "");
            //     }
            //     setPlaceSelected(false);
            // });
        };

        if (!window.google) {
            loadScript(`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAP_API_KEY}&libraries=places`, handleScriptLoad);
        } else {
            handleScriptLoad();
        }
    }, [toggle]);

    const handleEditAddress = (address) => {
        setToggle(true);
        setEditingAddress(address);
        setMapSrc("");
    };

    return (
        <>
            <div className="col-lg-6 col-md-6 col-12">
                <div className="col-12">
                    <div className="address_checkout rounded-2">
                        <div className="d-flex align-items-center justify-content-between p-3" style={{ borderBottom: "1px solid #000" }}>
                            <div>
                                <h5 className="fw-semibold m-0">Address Delivery</h5>
                            </div>
                            <div className="check_img">
                                <img src="/images/address-checkout.png" alt="" className="img-fluid" />
                            </div>
                        </div>
                        <div className="p-3">
                            {
                                addresses?.map((item, index) => (
                                    <div className="d-flex align-items-center mb-1" key={index}>
                                        <input
                                            className="form-check-input ms-2"
                                            type="radio"
                                            name="address"
                                            id={`flexRadioDefault${index}`}
                                            value={index}
                                            onChange={(e) => {
                                                const selectedAddress = addresses[parseInt(e.target.value)];
                                                setAddress(selectedAddress);
                                            }}
                                        />
                                        <label
                                            className="form-check-label ps-2"
                                            htmlFor={`flexRadioDefault${index}`}
                                        >
                                            <div>
                                                <h6 className="mb-1 fw-semibold">{user?.name}</h6>
                                                <p>
                                                    {item?.location}
                                                    <button className="ps-1 border-0" style={{background:'none'}} onClick={() => handleEditAddress(item)}><i className="fa-regular fa-pen-to-square text-danger"></i></button>
                                                </p>
                                                <p className="">Mobile: {item?.alternatephone}</p>
                                            </div>
                                        </label>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <button className="rounded-pill bg-white px-3 py-2 text-success fw-semibold" style={{ border: '2px solid rgb(48 154 32)' }} onClick={() => setToggle(!toggle)}>+ Add new Address</button>
                </div>
                {
                    toggle && <div className="col-12 mt-3 main-form rounded-1 p-3">
                        {
                            mapSrc && <div className="w-100">
                                <iframe
                                    src={mapSrc}
                                    width="100%"
                                    height="150"
                                    style={{ border: '0' }}
                                    allowFullScreen=""
                                    loading="lazy"
                                    referrerPolicy="no-referrer-when-downgrade"
                                ></iframe>
                            </div>
                        }
                        <div className="p-md-5 p-sm-3 p-3">
                            <div className="col-12 pb-1">
                                <h4 className='fw-semibold'>{editingAddress ? 'Edit Address' : 'Add New Address'}</h4>
                            </div>
                            <Formik
                                enableReinitialize
                                initialValues={{
                                    location: editingAddress?.location || "",
                                    street: editingAddress?.street || "",
                                    address: editingAddress?.address || "",
                                    landmark: editingAddress?.landmark || "",
                                    alternatephone: editingAddress?.alternatephone || "",
                                }}
                                validationSchema={Yup.object({
                                    location: Yup.string().required("Location is required"),
                                    street: Yup.string().required("House/Flat Number is required"),
                                    address: Yup.string().required("Society/Colony Name is required"),
                                    landmark: Yup.string().required("Landmark is required"),
                                    alternatephone: Yup.string()
                                        .matches(/^[0-9]{10}$/, "Alternate Contact No. must be exactly 10 digits")
                                        .required("Alternate Contact No. is required"),
                                })}
                                onSubmit={async (values, { resetForm }) => {
                                    if (editingAddress) {
                                        try {
                                            const res = await axios.post(
                                                `${BASE_URL}${API_URL.EDIT_ADDRESS}${editingAddress._id}`,
                                                values
                                            );
                                            const result = res.data;
                                            const { baseResponse, response } = result;
                                            if (baseResponse.status == 1) {
                                                toast.success("Address edit successfully");
                                                dispatch(fetchAddressesAsync(user_id));
                                                setMapSrc("");
                                                setEditingAddress("");
                                                setToggle(false);
                                                resetForm();
                                            } else {
                                                toast.error(baseResponse.message);
                                            }
                                        } catch (error) {
                                            toast.error("Something went wrong");
                                        }
                                    } else {
                                        try {
                                            const res = await axios.post(
                                                `${BASE_URL}${API_URL.ADD_ADDRESS}${user_id}`,
                                                values
                                            );
                                            const result = res.data;
                                            const { baseResponse, response } = result;
                                            if (baseResponse.status == 1) {
                                                toast.success("Address added successfully");
                                                dispatch(fetchAddressesAsync(user_id));
                                                setMapSrc("");
                                                resetForm();
                                            } else {
                                                toast.error(baseResponse.message);
                                            }
                                        } catch (error) {
                                            toast.error("Something went wrong");
                                        }
                                    }
                                }}
                            >
                                {({ setFieldValue }) => {
                                    setFieldValueRef.current = setFieldValue;
                                    return <Form>
                                        <div className="row gy-3">
                                            <div className="col-12">
                                                <div className="user-address-from position-relative">
                                                    <Field
                                                        type="text"
                                                        name="location"
                                                        className="form-control rounded-1"
                                                        innerRef={autocompleteInputRef}
                                                        placeholder="Search location..."
                                                        onChange={(e) => {
                                                            setFieldValue("location", e.target.value);
                                                        }}
                                                    />
                                                    <i className="fa fa-map-marker position-absolute"></i>
                                                    <ErrorMessage name="location" component="div" className="text-danger" />
                                                </div>
                                            </div>
                                            <div className="col-12">
                                                <Field
                                                    type="text"
                                                    name="street"
                                                    className="form-control rounded-1"
                                                    placeholder="House/Flat Number"
                                                />
                                                <ErrorMessage name="street" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-12">
                                                <Field
                                                    type="text"
                                                    name="address"
                                                    className="form-control rounded-1"
                                                    placeholder="Society/Colony Name"
                                                />
                                                <ErrorMessage name="address" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-12">
                                                <Field
                                                    type="text"
                                                    name="landmark"
                                                    className="form-control rounded-1"
                                                    placeholder="Landmark"
                                                />
                                                <ErrorMessage name="landmark" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-12">
                                                <Field
                                                    type="text"
                                                    name="alternatephone"
                                                    className="form-control rounded-1"
                                                    placeholder="Alternate Contact No."
                                                />
                                                <ErrorMessage name="alternatephone" component="div" className="text-danger" />
                                            </div>
                                            <div className="col-12">
                                                <div className="submit-btn mt-3">
                                                    <button type="submit" className="prim_color_bg text-white btn-effect-1">
                                                        {editingAddress ? "Update Address" : "Add Address"}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                }}
                            </Formik>
                        </div>
                    </div>
                }
            </div>
        </>
    );
};

export default DeliveryAddress;

