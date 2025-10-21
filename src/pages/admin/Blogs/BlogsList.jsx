import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../src/component/MyDataTable';
import { BACKEND_BASE_API } from '../../../common/api/ApiClient';
import { capitalizeWords } from '../../../common/Validation';
import CustomModal from '../../../component/CustomModel';
import { errorMsg, successMsg } from '../../../common/Toastify';



import axios from 'axios';

const BlogsList = () => {

    const [bloglistDetails, setBlogList] = useState([])
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("");
    const [isLoading, setIsLoading] = useState(true);

    const navigate = useNavigate();

    const handlePreview = (_id, readonly = false) => {
        navigate(`/admin/blogs-create/${_id}`, { state: { readonly: true } });
    };
    const handleUpdateNavigate = (_id) => {
        navigate(`/admin/blogs-create/${_id}`, { state: { readonly: false } });
    }

    const columns = [
        { field: 'sno', headerName: 'SNO', flex: 1 },
        {
            field: 'blog_heading', headerName: 'Heading', flex: 1,
            renderCell: (params) => {
                const region = params.row?.blog_heading || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        {
            field: 'blog_created_at',
            headerName: 'Created Date',
            flex: 1,
            renderCell: (params) => {
                const rawDate = params.row?.blog_created_at || "";

                const formatDateToDDMMYYYY = (dateString) => {
                    const date = new Date(dateString);
                    const day = String(date.getDate()).padStart(2, '0');
                    const month = String(date.getMonth() + 1).padStart(2, '0');
                    const year = date.getFullYear();
                    return `${day}/${month}/${year}`;
                };

                return (
                    <span>
                        {rawDate ? formatDateToDDMMYYYY(rawDate) : "--"}
                    </span>
                );
            }
        },
        {
            field: 'author_name', headerName: 'Author', flex: 1,
            renderCell: (params) => {
                const region = params.row?.meta_title || "";
                return (
                    <div className='admin-actions'>
                        {capitalizeWords(region)}
                    </div>
                );
            }
        },
        {
            field: '_id',
            headerName: 'Actions',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const slug = params.row?.slug;
                const id = params.row?._id;

                return (
                    <div className='admin-actions'>
                        <i className="fa-solid fa-pen-to-square" onClick={() => { handleUpdateNavigate(params?.row?._id); }}></i>

                        <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>

                        <i
                            className="fa-solid fa-eye ms-3"
                            style={{ cursor: "pointer" }}
                            onClick={() => { handlePreview(params?.row?._id); }}
                        ></i>
                    </div>
                );
            }
        },
        {
            field: 'status',
            headerName: 'Status',
            flex: 1,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const status = params.row.status === "active" ? true : false;
                return (
                    <div className="switch" onClick={() => handleStatusUpdate(params?.row?._id, status)} >
                        <input type="checkbox" checked={status} readOnly />
                        <span className="slider-table round"></span>
                    </div>
                );
            },
        }
    ];

    const numberedRows = bloglistDetails?.length && bloglistDetails?.map((row, index) => ({
        ...row,
        sno: index + 1,
    }));

    const getAllBlogDetails = async () => {
        setIsLoading(true);
        axios.get(BACKEND_BASE_API + '/blog/get_all')
            .then(response => {
                console.log(response.data.data);
                setBlogList(response.data.data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error("Error fetching categories:", error);
                setIsLoading(false);
            });
    }


    const handleStatusUpdate = async (_id, currentStatus) => {
        const newStatus = currentStatus ? "inactive" : "active";
        const Payload = {
            _id,
            status: newStatus,
        };

        try {
            const response = await axios.put(BACKEND_BASE_API + '/blog/update', Payload);
            if (response.status === 200 || response.status === 201) {
                successMsg("Blog Details Updated successfully");
                getAllBlogDetails()
            }
        }
        catch (error) {
            console.error('Update failed:', error);
            errorMsg('Update failed. ' + error);
        }


    }

    useEffect(() => {
        getAllBlogDetails()
    }, [])

    const handleDelete = async () => {
        try {
            const response = await axios.delete(BACKEND_BASE_API + '/blog/delete', {
                data: { _id: deleteId }
            });
            if (response.data.statusCode == 200) {
                successMsg("Destination Deleted Successsfully");
                setOpenDeleteModal(false);
                getAllBlogDetails();
                setDeleteId('')
            }

        } catch (error) {
            errorMsg('Delete failed:' + error.response ? error.response.data : error.message);
        }
    }



    return (
        <div className='admin-content-main'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-auto'>Blogs List</h3>
                <button className='admin-add-button mt-0' onClick={() => navigate("/admin/blogs-create")}><i class="fa-solid fa-plus me-2"></i> Create New Blog</button>
            </div>

            <div className='my-5'>
                <MyDataTable
                    rows={numberedRows}
                    columns={columns}
                    getRowId={(row) => row._id}
                    isLoading={isLoading}
                />
            </div>
            <CustomModal
                open={openDeleteModal}
                onClickOutside={() => {
                    setOpenDeleteModal(false);
                }}
            >
                <>
                    <div className='delete-model-view-main'>
                        <p className="text-center">
                            Are you sure do you want to delete?
                        </p>
                        <div className="row">
                            <div className="col-6">
                                <button className="delete-btn yes" onClick={handleDelete}>Yes</button>
                            </div>
                            <div className="col-6">
                                <button className="delete-btn no" onClick={() => setOpenDeleteModal(false)}>No</button>
                            </div>
                        </div>
                    </div>
                </>

            </CustomModal>

        </div>
    )
}

export default BlogsList
