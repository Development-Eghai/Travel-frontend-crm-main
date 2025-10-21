import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import MyDataTable from '../../../../component/MyDataTable';
import CustomModal from '../../../../component/CustomModel';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../../common/Validation';
import { errorMsg, successMsg } from '../../../../common/Toastify';
import { CreateBlogCategory, DeleteBlogCategory, GetAllBlogCategory, GetSpecificBlogCategory, UpdateBlogCategory } from '../../../../common/api/ApiService';
import { BACKEND_DOMAIN } from '../../../../common/api/ApiClient';


const BlogsCategory = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false)

  const [blogCategoryData, setBlogCategoryData] = useState({})
  const [categoryList, setcategoryList] = useState([])
  const [validation, setValidation] = useState({})
  const [isViewOnly, setIsViewOnly] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [isLoading, setIsLoading] = useState(true);


  const columns = [
    { field: 'sno', headerName: 'SNO', flex: 1 },
    { field: 'category_name', headerName: 'Name', flex: 1 },
    { field: 'slug', headerName: 'Slug', flex: 1 },
    {
      field: '_id',
      headerName: 'Actions',
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params) => (
        <>
          <div>
            <div className='admin-actions'>
              <i className="fa-solid fa-pen-to-square" onClick={() => { setOpen(true); getSpecificBlogCategory(params?.row?._id); setIsUpdate(true) }}></i>
              <i className="fa-solid fa-trash ms-3" onClick={() => { setDeleteId(params?.row?._id); setOpenDeleteModal(true) }}></i>
              <i className="fa-solid fa-eye ms-3" onClick={() => { setOpen(true); getSpecificBlogCategory(params?.row?._id); setIsViewOnly(true) }} ></i>
            </div>
          </div>
        </>
      ),
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
          <div className="switch" onClick={() => handleStatusUpdate(params?.row?._id, status)}>
            <input type="checkbox" checked={status} readOnly />
            <span className="slider-table round"></span>
          </div>
        );
      },
    }
  ];

  const numberedRows = categoryList?.map((row, index) => ({
    ...row,
    sno: index + 1,
  }));

  const handleChange = (e) => {
    const { name, value } = e.target
    setBlogCategoryData({ ...blogCategoryData, [name]: value })
    if (validation[name]) {
      setValidation({ ...validation, [name]: false })
    }
  }

  const validateDetails = (data) => {
    let validate = {};

    validate.category_name = StringValidation(data?.category_name);
    validate.slug = SlugValidation(data?.slug);
    validate.description = NonEmptyValidation(data?.description);

    return validate;
  };

  const handleBlur = (fieldName, value) => {
    const updatedData = {
      ...blogCategoryData,
      [fieldName]: value,
    };

    const cleanedData = normalizeEmptyFields(updatedData);
    const fieldValidation = validateDetails(cleanedData);

    setValidation((prev) => ({
      ...prev,
      [fieldName]: fieldValidation[fieldName],
    }));
  };

  const handleSubmit = async (e) => {
    console.log(blogCategoryData);
    e.preventDefault()
    const cleanedData = normalizeEmptyFields(blogCategoryData); console.log(cleanedData);
    const isValide = validateDetails(cleanedData)
    console.log(isValide)
    setValidation(isValide);
    if (Object.values(isValide).every((data) => data?.status === true)) {

      const response = await CreateBlogCategory(cleanedData)
      if (response && response?.statusCode === 200) {
        successMsg("Blog category created successsfully")
        setBlogCategoryData({})
        setOpen(false)
        getAllBlogCategoryData()
      }
    }
  }


  const getAllBlogCategoryData = async () => {
    const response = await GetAllBlogCategory()
    if (response && response?.statusCode === 200) {
      setcategoryList(response?.data),
        setIsLoading(false);
    }
  }

  const getSpecificBlogCategory = async (_id) => {
    const response = await GetSpecificBlogCategory(_id)
    if (response && response?.statusCode === 200) {
      setBlogCategoryData(response?.data)
    }
  }

  const handleUpdate = async (e) => {
    const { __v, createdAt, updatedAt, is_deleted, ...removedObject } = blogCategoryData;
    e.preventDefault()
    const cleanedData = normalizeEmptyFields(removedObject);
    const isValide = validateDetails(cleanedData)
    setValidation(isValide);
    if (Object.values(isValide).every((data) => data?.status === true)) {
      const response = await UpdateBlogCategory(cleanedData)
      if (response && response?.statusCode === 200) {
        successMsg("Blog Category Updated Successsfully")
        setBlogCategoryData({})
        setOpen(false)
        setIsUpdate(false)
        getAllBlogCategoryData()
      }
    }

  }

  const handleStatusUpdate = async (_id, currentStatus) => {
    const newStatus = currentStatus ? "inactive" : "active";
    const Payload = {
      _id,
      status: newStatus,
    };

    const response = await UpdateBlogCategory(Payload)
    if (response && response?.statusCode === 200) {
      successMsg("Blog Category Status Updated Successsfully")
      getAllBlogCategoryData()
    }

  }

  const handleDelete = async () => {
    const response = await DeleteBlogCategory(deleteId)
    console.log(response, "handleDelete")
    if (response && response?.statusCode === 200) {
      successMsg("Blog Category Deleted Successsfully")
      setOpenDeleteModal(false)
      getAllBlogCategoryData()
      setDeleteId('')
    }

  }


  useEffect(() => {
    getAllBlogCategoryData()
  }, [])



  return (
    <div className='admin-content-main'>
      <div className='d-flex justify-content-between'>
        <h3 className='my-auto'>Blog Category List</h3>
        <button className='admin-add-button mt-0' onClick={() => setOpen(true)}><i class="fa-solid fa-plus me-2"></i>Add Blog Category</button>
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
        open={open}
        onClickOutside={() => {
          setOpen(false);
          setValidation({})
          setBlogCategoryData({})
          setIsViewOnly(false)
        }}
      >
        <div className='Modal-View-Tour-Management'>
          <div className='model-input-div'>
            <label>Name</label>
            <input type="text" placeholder='Enter Category Name' name='category_name'
              onChange={(e) => handleChange(e)}
              value={blogCategoryData?.category_name || ""}
              readOnly={isViewOnly}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
            {validation?.category_name?.status === false && validation?.category_name?.message && (
              <p className='error-para'>Category Name {validation.category_name.message}</p>
            )}
          </div>
          <div className='model-input-div'>
            <label>Slug</label>
            <input type="text" placeholder='Enter Category Slug' name='slug'
              onChange={(e) => handleChange(e)}
              value={blogCategoryData?.slug || ""}
              readOnly={isViewOnly}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
            {validation?.slug?.status === false && validation?.slug?.message && (
              <p className='error-para'>Slug {validation.slug.message}</p>
            )}
          </div>
          <div className='model-input-div'>
            <label>Description</label>
            <textarea type="text" placeholder='Enter Category Description' name='description'
              onChange={(e) => handleChange(e)}
              value={blogCategoryData?.description || ""}
              readOnly={isViewOnly}
              onBlur={(e) => handleBlur(e.target.name, e.target.value)}
            />
            {validation?.description?.status === false && validation?.description?.message && (
              <p className='error-para'>Description {validation.description.message}</p>
            )}
          </div>
          {!isViewOnly && !isUpdate && (
            <button className='model-submit-button' onClick={(e) => handleSubmit(e)}>Add Category</button>
          )}
          {isUpdate && (
            <button className='model-submit-button' onClick={(e) => handleUpdate(e)}>Update Category</button>
          )}

        </div>

      </CustomModal>
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

export default BlogsCategory
