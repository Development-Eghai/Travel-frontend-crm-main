import React, { useEffect, useRef, useState } from 'react';
import JoditEditor from "jodit-react";
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { BACKEND_BASE_API, BACKEND_DOMAIN } from '../../../common/api/ApiClient';
import { errorMsg, successMsg } from '../../../common/Toastify';
import { SingleFileUpload } from '../../../common/api/ApiService';
import { NonEmptyValidation, normalizeEmptyFields, SlugValidation, StringValidation } from '../../../common/Validation';
import axios from 'axios';

const BlogsCreation = () => {

    function formatISODateToYMD(isoString) {
        const date = new Date(isoString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }



    const navigate = useNavigate();
    const { id } = useParams();
    const [categories, setCategories] = useState([]);
    const [blogTags, setBlogTags] = useState([]);
    const [validation, setValidation] = useState({})
    const [blogData, setBlogData] = useState({ featured_blog: false });

    const location = useLocation();
    const readonly = location.state?.readonly || false;

    // const [BlogCreateData, setBlogCreateDataContent] = useState({});

    const handleBlur = (fieldName, value) => {

        const updatedData = {
            ...blogData,
            [fieldName]: value,
        };

        const cleanedData = normalizeEmptyFields(updatedData);
        const fieldValidation = validateDetails(cleanedData);

        setValidation((prev) => ({
            ...prev,
            [fieldName]: fieldValidation[fieldName],
        }));
    };

    const handleChange = (eOrName, value) => {
        if (eOrName && eOrName.target) {
            let { name, value } = eOrName.target;

            if (name === "featured_blog") {
                value = eOrName.target.checked;
            }

            setBlogData(prev => ({ ...prev, [name]: value }));

            if (validation[name]) {
                setValidation(prev => ({ ...prev, [name]: false }));
            }
        }
        else {
            const name = eOrName;
            setBlogData(prev => ({ ...prev, [name]: value }));

            if (validation[name]) {
                setValidation(prev => ({ ...prev, [name]: false }));
            }
        }
    };

    const handleFileUpload = async (e, key) => {
        const file = e.target.files[0];

        if (!file) return;
        let image_name = e?.target?.files[0]?.name;
        let image_type = image_name?.split(".");
        let type = image_type?.pop();
        if (type !== "jpeg" && type !== "png" && type !== "jpg" && type !== "pdf" && type !== "webp") {
            errorMsg("Unsupported file type")
            return;
        }

        const formData = new FormData();
        formData.append("file", file);
        formData.append("storage", "local");
        const response = await SingleFileUpload(formData);

        if (response?.statusCode !== 200) {
            errorMsg("Failed to upload file")
            return;
        }

        const path = response?.path;
        setBlogData({ ...blogData, [key]: path })
        successMsg("File upload successfully")
        if (validation[key]) {
            setValidation({ ...validation, [key]: false })
        }

    };

    function getAllBlogs() {
        axios.get(BACKEND_BASE_API + '/blog-category/get_all')
            .then(response => {

                setCategories(response.data.data);
            })
            .catch(error => {
                errorMsg("Error fetching categories:" + error);
            });

        axios.get(BACKEND_BASE_API + '/blog-tag/get_all')
            .then(response => {

                if (response.data.statusCode == 200) {
                    setBlogTags(response.data.data);
                }

            })
            .catch(error => {
                errorMsg("Error fetching categories:" + error);
            });
    }

    function getSpecificBlog(id) {
        axios.get(BACKEND_BASE_API + '/blog/get_specific', {
            params: { _id: id }
        })
            .then((response) => {
                if (response.data.statusCode == 200) {
                    response.data.data.blog_created_at = formatISODateToYMD(response.data.data.blog_created_at)
                    setBlogData(response.data.data);
                }
            })
            .catch((error) => {
                errorMsg('Error fetching data:' + error);
            });
    }

    const validateDetails = (data) => {

        let validate = {};
        validate.blog_heading = StringValidation(data?.blog_heading);
        validate.featured_image_alt_tag = StringValidation(data?.featured_image_alt_tag);
        validate.blog_created_at = NonEmptyValidation(data?.blog_created_at);
        validate.author_name = StringValidation(data?.author_name);
        validate.blog_description = StringValidation(data?.blog_description);
        validate.meta_tags = StringValidation(data?.meta_tags);
        validate.slug = SlugValidation(data?.slug);
        validate.blog_category = NonEmptyValidation(data?.blog_category);
        validate.meta_title = StringValidation(data?.meta_title);
        validate.meta_description = StringValidation(data?.meta_description);
        validate.featured_image_alt_tag = StringValidation(data?.featured_image_alt_tag);
        return validate;
    };

    const handleUpdate = async (e) => {
        e.preventDefault();

        const { __v, blog_created_at, featured_image, ...removedObject } = blogData;

        const newData = {
            ...removedObject,
        };

        const cleanedData = normalizeEmptyFields(newData);
        const isValide = validateDetails(cleanedData);
        setValidation(isValide);
        // if (Object.values(isValide).every((data) => data?.status === true)) 
        {

            try {
                const response = await axios.put(BACKEND_BASE_API + '/blog/update', cleanedData);
                if (response.status === 200 || response.status === 201) {
                    navigate(-1);
                    successMsg("Blog Details Updated successfully");
                }
            }
            catch (error) {
                errorMsg('Update failed. ' + error);
            }
        }
    };

    const handleSubmit = async (e) => {
        const cleanedData = normalizeEmptyFields(blogData);
        const isValide = validateDetails(cleanedData)
        setValidation(isValide);
        // if (Object.values(isValide).every((data) => data?.status === true))
        // {

        // }           

        const payload = blogData;
        try {
            const response = await axios.post(BACKEND_BASE_API + '/blog/create', payload, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.status === 200 || response.status === 201) {
                successMsg('Blog created successfully!');
                navigate(-1);
            }
        } catch (error) {
            errorMsg('Something went wrong!' + error.message);
        }
    };

    useEffect(() => {

        getAllBlogs()
        if (id) {
            getSpecificBlog(id)
        }

    }, []);

    const editor = useRef(null);
    console.log(blogData, "blogData")


    return (
        <div className='admin-content-main'>

            <div className='d-flex justify-content-between mb-5'>
                <h3 className='my-auto'>Create Blog</h3>
                <button className='admin-add-button mt-0' onClick={() => navigate(-1)}>Back</button>
            </div>

            <div className='row'>
                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Heading <span className='required-icon'>*</span></label>
                        <input type="text" value={blogData?.blog_heading || ""} placeholder='Enter Blog Heading' name='blog_heading'
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("blog_heading", e.target.value)} />
                        {validation?.blog_heading?.status === false && validation?.blog_heading?.message && (
                            <p className='error-para'>Category Name {validation.blog_heading.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Select Category</label>
                        <select name='blog_category' onChange={(e) => handleChange(e)} value={blogData?.blog_category} >
                            <option value="">Select Category</option>
                            {categories.map(category => (
                                <option key={category._id} value={category._id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Featured Image <span className='required-icon'>*</span></label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            className="form-control" name='featured_image' onChange={(e) => { handleFileUpload(e, "featured_image"); }}
                        />
                        {blogData?.featured_image && (
                            <div className='upload-image-div'>
                                <img src={`${BACKEND_DOMAIN}${blogData?.featured_image}`} alt="Blogs-Preview" />
                            </div>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Featured Image Alt Tag <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter Image Alt Tag' name='featured_image_alt_tag' value={blogData?.featured_image_alt_tag}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("featured_image_alt_tag", e.target.value)} />
                        {validation?.featured_image_alt_tag?.status === false && validation?.featured_image_alt_tag?.message && (
                            <p className='error-para'>Featured Image Alt Tag {validation.featured_image_alt_tag.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Blogs Created At <span className='required-icon'>*</span></label>
                        <input type="date" name='blog_created_at' value={blogData?.blog_created_at}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("blog_created_at", e.target.value)} />
                        {validation?.blog_created_at?.status === false && validation?.blog_created_at?.message && (
                            <p className='error-para'>Blogs Created At {validation.blog_created_at.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Author Name <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter Author Name' name='author_name' value={blogData?.author_name}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("author_name", e.target.value)} />
                        {validation?.author_name?.status === false && validation?.author_name?.message && (
                            <p className='error-para'>Author Name {validation.author_name.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Select Blog Tag</label>
                        <select name='blog_tag' onChange={(e) => handleChange(e)} >
                            <option value="">Select Category</option>
                            {blogTags.map(blogTag => (
                                <option key={blogTag._id} value={blogTag._id}>
                                    {blogTag.tag_name}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>

                <div className='col-lg-3'>
                    <div className='admin-input-div blogs-creation'>
                        <label>Featured Blog</label>
                        <label className="switch">
                            <input type="checkbox" name='featured_blog' checked={blogData?.featured_blog} onChange={(e) => handleChange(e)} />
                            <span className="slider round"></span>
                        </label>
                    </div>
                </div>

            </div>

            <div className='admin-input-div mt-5'>
                <label>Blog Description</label>

                <div className="mt-3">
                    <JoditEditor
                        ref={editor}
                        value={blogData?.blog_description || ""}
                        config={{
                            readonly: false,
                            height: 400,
                            toolbarButtonSize: "middle",
                            askBeforePasteHTML: false,
                            askBeforePasteFromWord: false,
                            defaultActionOnPaste: "insert_clear_html",
                            allowPaste: true
                        }}
                        tabIndex={1}
                        onBlur={(newContent) => handleChange("blog_description", newContent)}
                    />
                    <div className="mt-3">
                        {/* <h5>Output:</h5>
                    <div dangerouslySetInnerHTML={{ __html: content }} /> */}
                    </div>
                </div>
            </div>


            <div className='row'>
                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Meta Title <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter Meta Title' name='meta_title' value={blogData?.meta_title}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("meta_title", e.target.value)} />
                        {validation?.meta_title?.status === false && validation?.meta_title?.message && (
                            <p className='error-para'>Meta Title {validation.meta_title.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Meta Tag <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter Meta Tag' name='meta_tags' value={blogData?.meta_tags}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("meta_tags", e.target.value)} />
                        {validation?.meta_tags?.status === false && validation?.meta_tags?.message && (
                            <p className='error-para'>Meta Tag {validation.meta_tags.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>Meta Description <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter Meta Description' name='meta_description' value={blogData?.meta_description}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("meta_description", e.target.value)} />
                        {validation?.meta_description?.status === false && validation?.meta_description?.message && (
                            <p className='error-para'>Meta Description {validation.meta_description.message}</p>
                        )}
                    </div>
                </div>

                <div className='col-lg-6'>
                    <div className='admin-input-div'>
                        <label>URL Slug <span className='required-icon'>*</span></label>
                        <input type="text" placeholder='Enter URL Slug' name='slug' value={blogData?.slug}
                            onChange={(e) => handleChange(e)} onBlur={(e) => handleBlur("slug", e.target.value)} />
                        {validation?.slug?.status === false && validation?.slug?.message && (
                            <p className='error-para'>URL Slug {validation.slug.message}</p>
                        )}
                    </div>
                </div>

            </div>

           {!readonly && (
    id ? (
        <button
            className="create-common-btn"
            onClick={(e) => handleUpdate(e)}
        >
            Update
        </button>
    ) : (
        <button
            className="create-common-btn"
            onClick={(e) => handleSubmit(e)}
        >
            Create
        </button>
    )
)}


        </div >
    )
}

export default BlogsCreation
