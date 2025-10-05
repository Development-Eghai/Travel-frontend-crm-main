import JoditEditor from 'jodit-react';
import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';


const HotelCreation = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1);
    const sectionTabs = [
        {
            id: 1,
            detail: {
                head: "Basic Information",
            }
        },
        {
            id: 2,
            detail: {
                head: "Amenities & Features",
            }
        },
        {
            id: 3,
            detail: {
                head: "Room Types & Pricing (If direct booking or detailed info)",
            }
        },
        {
            id: 4,
            detail: {
                head: "Photo & Video Gallery",
            }
        },
        {
            id: 5,
            detail: {
                head: "SEO",
            }
        },

    ]

    const [roomType, setRoomType] = useState([{
        room_type_name: "", description: "",
        max_occupancy: "", base_price_per_night: "", currency_selector: "", room_images: [], pricing_notes: ""
    }]);

    const addRoomType = () => {
        setRoomType([...roomType, { day_title: "", description: "", images: [] }]);
    };

    const deleteRoomType = (indexToRemove) => {
        if (indexToRemove !== 0) {
            const updatedRoomType = roomType.filter((_, index) => index !== indexToRemove);
            setRoomType(updatedRoomType);
        }
    };

    const updateRoomType = (index, key, value) => {
        const updatedRoomType = [...roomType];
        updatedRoomType[index][key] = value;
        setRoomType(updatedRoomType);
    };

    return (
        <div className='admin-content-main'>

            <div className='d-flex justify-content-around mt-2'>
                {sectionTabs.map((item, index) => (
                    <div className='trip-creation-steps'>
                        <p className={`steps-main ${activeTab === item?.id ? 'active' : ''}`}>{item?.id}</p>
                    </div>
                ))}
            </div>

            <div className='trip-creation-form'>
                <h4>{sectionTabs[activeTab - 1]?.id}.{sectionTabs[activeTab - 1]?.detail?.head}</h4>
            </div>

            <div className='mt-3'>

                {activeTab == 1 && (
                    <>
                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Hotel Name <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Hotel Name' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Star Rating  <span className='required-icon'>*</span></label>
                                        <select>
                                            <option value="">Select Rating</option>
                                            <option value="India">1 Star Rating</option>
                                            <option value="Tamil Nadu">2 Star Rating</option>
                                            <option value="kerala">3 Star Rating</option>
                                            <option value="Chennai">4 Star Rating </option>
                                            <option value="Chennai">5 Star Rating </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className="admin-input-div">
                                        <label>Short Description / Tagline</label>
                                        <textarea
                                            className="form-control"
                                            placeholder='Short Description For Listing Pages'
                                        />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className="admin-input-div">
                                        <label>Primary Hotel Image <span className='required-icon'>*</span></label>
                                        <input
                                            type="file"
                                            multiple
                                            accept="image/*"
                                            className="form-control"
                                        />
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='admin-input-div'>
                                        <label className='text-area-label'>Long Description</label>
                                        <div className="mt-2">
                                            <JoditEditor
                                                // ref={editor}
                                                // value={createDestination?.about_destination}
                                                config={{
                                                    readonly: false,
                                                    height: 300,
                                                    toolbarButtonSize: "middle"
                                                }}
                                                tabIndex={1}
                                            // onBlur={(newContent) => handleChange("about_destination", newContent)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h5 className='mt-5'>Address :</h5>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div mt-4'>
                                        <label>Street Address <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Street Address' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>City <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter City' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>State/Region <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter State/Region' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Country <span className='required-icon'>*</span></label>
                                        <select>
                                            <option value="">Select Country</option>
                                            <option value="India">India</option>
                                            <option value="Tamil Nadu">Pakistan</option>
                                            <option value="kerala">England</option>
                                            <option value="Chennai">Thailand</option>
                                            <option value="Chennai">Japan </option>
                                            <option value="Chennai">China </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Postal Code<span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Postal Code' />
                                    </div>
                                </div>

                                <h5 className='mt-5'>Contact Information :</h5>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Hotel Phone Number <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Hotel Phone Number' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Hotel Email Address <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Hotel Email Address' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Hotel Website URL<span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Hotel Website URL' />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </>
                )}

                {activeTab == 2 && (
                    <>
                    </>
                )}

                {activeTab == 3 && (
                    <>
                        <div className='itenary-main my-5'>

                            <div className='itenary-list-main mt-4 '>
                                <div className='itenary-content mb-5'>
                                    <h5 className='text-center'>Room Type</h5>
                                    <p className='text-center'>Manage Room Types & Base Pricing</p>
                                </div>
                                {/* <div className='d-flex justify-content-center'>
                  <button className='admin-add-button'>Add Day <i className="fa-solid fa-plus ms-2"></i></button>
                </div> */}

                                <div className="destination-faq">
                                    <div className="accordion" id="accordionExample">
                                        {roomType.map((faq, index) => (
                                            <div className='mt-4'>
                                                <div className="accordion-item" key={index} >
                                                    <h2 className="accordion-header d-flex align-items-center justify-content-between">
                                                        <button
                                                            className="accordion-button flex-grow-1 fw-bold"
                                                            type="button"
                                                            data-bs-toggle="collapse"
                                                            data-bs-target={`#collapse${index}`}
                                                            aria-expanded="true"
                                                            aria-controls={`collapse${index}`}
                                                        >
                                                            Room Type {index + 1}
                                                        </button>
                                                        <div className="ms-3 d-flex gap-2">
                                                            <button className="destination-faq-add me-3" onClick={addRoomType}>
                                                                Add
                                                            </button>
                                                            {index !== 0 && (
                                                                <button
                                                                    className="destination-faq-add faq-delete me-4"
                                                                    onClick={() => deleteRoomType(index)}
                                                                >
                                                                    Delete
                                                                </button>
                                                            )}
                                                        </div>
                                                    </h2>

                                                    <div
                                                        id={`collapse${index}`}
                                                        className="accordion-collapse collapse show"
                                                        data-bs-parent="#accordionExample"
                                                    >
                                                        <div className="accordion-body">

                                                            <div className='row'>

                                                                <div className='col-lg-6'>

                                                                    <div className="admin-input-div mb-3">
                                                                        <label className=''>Room Type Name</label>
                                                                        <input
                                                                            type="text"
                                                                            className="form-control"
                                                                            value={faq.question}
                                                                            placeholder="Enter Room Type Name"
                                                                            onChange={(e) =>
                                                                                updateRoomType(index, "day_title", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div admin-desti-faq">
                                                                        <label>Description</label>
                                                                        <textarea
                                                                            className="form-control"
                                                                            placeholder="Enter Description"
                                                                            value={faq.answer}
                                                                            onChange={(e) =>
                                                                                updateRoomType(index, "day_description", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div mb-3">
                                                                        <label className=''>Max Occupancy</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={faq.question}
                                                                            placeholder="Enter Max Occupancy"
                                                                            onChange={(e) =>
                                                                                updateRoomType(index, "day_title", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div mb-3">
                                                                        <label className=''>Base Price per Night</label>
                                                                        <input
                                                                            type="number"
                                                                            className="form-control"
                                                                            value={faq.question}
                                                                            placeholder="Enter Base Price per Night"
                                                                            onChange={(e) =>
                                                                                updateRoomType(index, "day_title", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div admin-desti-faq">
                                                                        <label>Currency Selector <span className='required-icon'>*</span></label>
                                                                        <select>
                                                                            <option value="">Select Currency</option>
                                                                            <option value="India">INR</option>
                                                                            <option value="Tamil Nadu">USD</option>
                                                                        </select>
                                                                    </div>
                                                                </div>

                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div admin-desti-faq">
                                                                        <label>Pricing Notes (Optional)</label>
                                                                        <textarea
                                                                            className="form-control"
                                                                            placeholder="Enter Description"
                                                                            value={faq.answer}
                                                                            onChange={(e) =>
                                                                                updateRoomType(index, "day_description", e.target.value)
                                                                            }
                                                                        />
                                                                    </div>
                                                                </div>


                                                                <div className='col-lg-6'>
                                                                    <div className="admin-input-div admin-desti-faq">
                                                                        <label>Room Images <span className='required-icon'>*</span></label>
                                                                        <input
                                                                            type="file"
                                                                            multiple
                                                                            accept="image/*"
                                                                            className="form-control"
                                                                        />
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}

                {activeTab == 4 && (<>
                </>
                )}

                {activeTab == 5 && (
                    <>
                        <div className='row'>
                            <div className='col-lg-6'>
                                <div className='admin-input-div'>
                                    <label>Meta Title <span className='required-icon'>*</span></label>
                                    <input type="text" placeholder='SEO Meta Title' />
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className='admin-input-div'>
                                    <label>Meta Tag <span className='required-icon'>*</span></label>
                                    <input type="text" placeholder='SEO Meta Tag' />
                                </div>
                            </div>

                            <div className='col-lg-6'>
                                <div className='admin-input-div'>
                                    <label>Meta Description <span className='required-icon'>*</span></label>
                                    <input type="text" placeholder='SEO Meta Description' />
                                </div>
                            </div>

                        </div>
                    </>
                )}

            </div>

            <div className='my-4 d-flex justify-content-between '>

                {activeTab !== 1 && (
                    <button className={`admin-add-button ${activeTab === 0 ? 'disabled' : ''}`}
                        onClick={() => setActiveTab(activeTab - 1)}><i className="fa-solid fa-arrow-left me-2"></i>Previous</button>
                )}

                {activeTab !== sectionTabs?.length && (
                    <button className={`admin-add-button ${activeTab === sectionTabs?.length ? 'disabled' : ''}`}
                        onClick={() => setActiveTab(activeTab + 1)}>Next <i className="fa-solid fa-arrow-right ms-2"></i></button>
                )}
            </div>

        </div>
    )
}

export default HotelCreation
