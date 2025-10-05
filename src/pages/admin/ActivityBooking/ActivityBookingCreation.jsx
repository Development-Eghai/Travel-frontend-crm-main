
import JoditEditor from 'jodit-react';
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useDropzone } from 'react-dropzone';


const ActivityBookingCreation = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(1);
    const sectionTabs = [
        {
            id: 1,
            detail: {
                head: "General Information",
            }
        },
        {
            id: 2,
            detail: {
                head: "Media and Visuals",
            }
        },
        {
            id: 3,
            detail: {
                head: "Pricing and Availability",
            }
        },
        {
            id: 4,
            detail: {
                head: "Inclusions and Exclusions",
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

    const [files, setFiles] = useState([]);

    const onDrop = useCallback((acceptedFiles) => {
        setFiles([...files, ...acceptedFiles]);
    }, [files]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'image/*': [] },
        multiple: true
    });

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
                                        <label>Activity Name <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Activity Name' />
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Category  <span className='required-icon'>*</span></label>
                                        <select>
                                            <option value="">Select Category</option>
                                            <option value="India">River Rafting</option>
                                            <option value="Tamil Nadu">Paragliding</option>
                                            <option value="kerala">Mountain Ride</option>
                                            <option value="Chennai">Jeep Ride </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-lg-6'>
                                    <div className="admin-input-div">
                                        <label>Short Description / Tagline</label>
                                        <textarea
                                            className="form-control"
                                            placeholder='Short Description'
                                        />
                                    </div>
                                </div>
                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Location  <span className='required-icon'>*</span></label>
                                        <select>
                                            <option value="">Select Location</option>
                                            <option value="India">River Rafting</option>
                                            <option value="Tamil Nadu">Paragliding</option>
                                            <option value="kerala">Mountain Ride</option>
                                            <option value="Chennai">Jeep Ride </option>
                                        </select>
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='admin-input-div'>
                                        <label className='text-area-label'>Full Description</label>
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


                                <div className='col-lg-6'>
                                    <div className='admin-input-div mt-4'>
                                        <label>Activity Duration <span className='required-icon'>*</span></label>
                                        <input type="text" placeholder='Enter Activity Duration' />
                                    </div>
                                </div>


                            </div>
                        </div>
                    </>
                )}

                {activeTab == 2 && (
                    <>
                        <div className="upload-wrapper mt-4">
                            <div {...getRootProps()} className="dropzone">
                                <input {...getInputProps()} />
                                <div className="upload-content">
                                    <svg fill="#ffffff" viewBox="0 0 24 24"><path d="M12 2L6 8h4v6h4V8h4l-6-6zM4 20h16v2H4z" /></svg>
                                    <p>Drag & Drop to Upload File</p>
                                    <p>OR</p>
                                    <button className="browse-btn">Browse File</button>
                                </div>
                            </div>

                            {files.length > 0 && (
                                <div className="preview-list">
                                    {files.map((file, index) => (
                                        <img
                                            key={index}
                                            src={URL.createObjectURL(file)}
                                            alt="preview"
                                            className="preview-img"
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </>
                )}

                {activeTab == 3 && (
                    <>
                        <div className='mb-4'>
                            <div className='row'>
                                <div className='col-lg-6'>
                                    <div className='admin-input-div'>
                                        <label>Base Price (Per person/group) <span className='required-icon'>*</span></label>
                                        <input type="number" placeholder='Enter Base Price' />
                                    </div>
                                </div>

                                <div className='col-lg-12'>
                                    <div className='admin-input-div'>
                                        <label className='text-area-label'>Booking & Cancellation Policy</label>
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

export default ActivityBookingCreation
