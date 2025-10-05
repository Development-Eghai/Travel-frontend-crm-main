import React, { useEffect, useRef, useState } from 'react'
import Header from './component/Header'
import { Swiper, SwiperSlide } from "swiper/react";
import { Images } from "../../helpers/Images/images";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import Footer from './component/Footer';

const Blogs = () => {
    const categories = [
        { title: "Solo Travel", image: Images?.blogs_deatil_carosel_1 },
        { title: "Mount Travel", image: Images?.blogs_deatil_carosel_2 },
        { title: "Jungal Travel", image: Images?.blogs_deatil_carosel_3 },
        { title: "Road Travel", image: Images?.blogs_deatil_carosel_4 },
        { title: "Osean Travel", image: Images?.blogs_deatil_carosel_5 },
        { title: "Old City Travel", image: Images?.blogs_deatil_carosel_6 },
    ];
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiperReady, setSwiperReady] = useState(false);
    useEffect(() => {
        setSwiperReady(true);
    }, []);

    return (
        <div className='overflow-hidden'>
            <section className='overflow-hidden'>
                <div className="homepaage-banner-image-1">
                    <div className="home-banner-content">
                        <h1 className="banner-heading">
                            Blogs
                        </h1>
                    </div>
                </div>
            </section>

            <section className=' section-padding'>
                <div className="container">
                    <h4 className="text-center mb-5">Choose A Category</h4>
                    <div className="row justify-content-center">
                        <div className="col-lg-9">
                            <div className="blogs-slider-wrapper position-relative">
                                <button ref={prevRef} className="blogs-swiper-nav-btn left-arrow"><i className="fa-solid fa-arrow-left"></i></button>

                                {swiperReady && (
                                    <Swiper
                                        modules={[Navigation, Pagination]}
                                        spaceBetween={20}
                                        slidesPerView={3}
                                        // pagination={{ clickable: true }}
                                        navigation={{
                                            prevEl: prevRef.current,
                                            nextEl: nextRef.current,
                                        }}
                                        onBeforeInit={(swiper) => {
                                            swiper.params.navigation.prevEl = prevRef.current;
                                            swiper.params.navigation.nextEl = nextRef.current;
                                        }}
                                        breakpoints={{
                                            320: { slidesPerView: 1 },
                                            576: { slidesPerView: 2 },
                                            768: { slidesPerView: 3 },
                                            1024: { slidesPerView: 4 },
                                        }}
                                        loop={true}
                                    >
                                        {categories.map((cat, index) => (
                                            <SwiperSlide key={index}>
                                                <div
                                                    className="blogs-category-card"
                                                    style={{ backgroundImage: `url(${cat.image})` }}
                                                >
                                                    <h5>{cat.title}</h5>
                                                </div>
                                            </SwiperSlide>
                                        ))}
                                    </Swiper>
                                )}
                                <button ref={nextRef} className="blogs-swiper-nav-btn right-arrow"><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=''>
                <div className="container">
                    <h4 className="text-center mb-4">Featured Explore</h4>
                    <div className='row'>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_1} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>
                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_2} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>

                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_3} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>
                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_1} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>
                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_2} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>
                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-6'>
                            <div className="blogs-card-main blogs-page-card mt-lg-4 mt-5 position-relative">
                                <div>
                                    <img className="blogs-card-img" src={Images.blogs_deatil_3} alt="featured" />
                                    <div className='blogs-tag-main'>
                                        <p>Trips</p>
                                    </div>
                                </div>
                                <div className="blogs-content-main">
                                    <div className='d-flex mt-4'>
                                        <p className="blogs-author">April 06 2023</p>
                                        <p className="blogs-posted">By Ali Tufan</p>
                                    </div>
                                    <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                        Safari Experience</p>
                                    <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className=' section-padding'>
                <div className="container">
                    <h4 className="text-center mb-4">Latest Blogs</h4>
                    <div className='row'>
                        <div className='col-lg-8 col-md-7'>
                            <div className='latest-blogs-left'>
                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='position-relative'>
                                                <img className="blogs-card-img" src={Images.latest_blogs_1} alt="featured" />
                                                <div className='blogs-tag-main'>
                                                    <p>Trips</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="blogs-content-main me-3 ">
                                                <div className='d-flex'>
                                                    <p className="blogs-author">April 06 2023</p>
                                                    <p className="blogs-posted">By Ali Tufan</p>
                                                </div>
                                                <p className='comments-para'>50 comment</p>
                                                <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                                    Safari Experience</p>
                                                <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className='blogs-read-more-para'><a href="#">Read More</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='position-relative'>
                                                <img className="blogs-card-img" src={Images.latest_blogs_2} alt="featured" />
                                                <div className='blogs-tag-main'>
                                                    <p>Trips</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="blogs-content-main me-3">
                                                <div className='d-flex'>
                                                    <p className="blogs-author">April 06 2023</p>
                                                    <p className="blogs-posted">By Ali Tufan</p>
                                                </div>
                                                <p className='comments-para'>50 comment</p>
                                                <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                                    Safari Experience</p>
                                                <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className='blogs-read-more-para'><a href="#">Read More</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='position-relative'>
                                                <img className="blogs-card-img" src={Images.latest_blogs_3} alt="featured" />
                                                <div className='blogs-tag-main'>
                                                    <p>Trips</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="blogs-content-main me-3">
                                                <div className='d-flex'>
                                                    <p className="blogs-author">April 06 2023</p>
                                                    <p className="blogs-posted">By Ali Tufan</p>
                                                </div>
                                                <p className='comments-para'>50 comment</p>
                                                <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                                    Safari Experience</p>
                                                <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className='blogs-read-more-para'><a href="#">Read More</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className='mt-4'>
                                    <div className='row'>
                                        <div className='col-lg-6'>
                                            <div className='position-relative'>
                                                <img className="blogs-card-img" src={Images.latest_blogs_4} alt="featured" />
                                                <div className='blogs-tag-main'>
                                                    <p>Trips</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='col-lg-6'>
                                            <div className="blogs-content-main me-3">
                                                <div className='d-flex'>
                                                    <p className="blogs-author">April 06 2023</p>
                                                    <p className="blogs-posted">By Ali Tufan</p>
                                                </div>
                                                <p className='comments-para'>50 comment</p>
                                                <p className='blogs-content mt-2'>Kenya vs Tanzania Safari: The Better African
                                                    Safari Experience</p>
                                                <p className='latest-blogs-para'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                                <p className='blogs-read-more-para'><a href="#">Read More</a></p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>



                        </div>
                        <div className='col-lg-4 col-md-5'>
                            <div className='latest-blogs-right'>
                                <div className='popular-post-main'>
                                    <p className='popular-post-para'>Popular Post</p>
                                    <div className='mt-4'>
                                        <div className="row">
                                            <div className="col-lg-4 p-0">
                                                <div>
                                                    <img className="popular-post-img" src={Images.popular_post} alt="featured" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='popular-post-content'>
                                                    <p className='blogs-content'>13 things i’d Tell Any New
                                                        Travler </p>
                                                    <div className='d-flex'>
                                                        <p className="blogs-author">April 06 2023</p>
                                                        <p className="blogs-posted">By Ali Tufan</p>
                                                    </div>
                                                    <p className='comments-para'>50 comment</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <div className="row">
                                            <div className="col-lg-4 p-0">
                                                <div>
                                                    <img className="popular-post-img" src={Images.popular_post} alt="featured" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='popular-post-content'>
                                                    <p className='blogs-content'>13 things i’d Tell Any New
                                                        Travler </p>
                                                    <div className='d-flex'>
                                                        <p className="blogs-author">April 06 2023</p>
                                                        <p className="blogs-posted">By Ali Tufan</p>
                                                    </div>
                                                    <p className='comments-para'>50 comment</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <div className="row">
                                            <div className="col-lg-4 p-0">
                                                <div>
                                                    <img className="popular-post-img" src={Images.popular_post} alt="featured" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='popular-post-content'>
                                                    <p className='blogs-content'>13 things i’d Tell Any New
                                                        Travler </p>
                                                    <div className='d-flex'>
                                                        <p className="blogs-author">April 06 2023</p>
                                                        <p className="blogs-posted">By Ali Tufan</p>
                                                    </div>
                                                    <p className='comments-para'>50 comment</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='mt-4'>
                                        <div className="row">
                                            <div className="col-lg-4 p-0">
                                                <div>
                                                    <img className="popular-post-img" src={Images.popular_post} alt="featured" />
                                                </div>
                                            </div>
                                            <div className="col-lg-8">
                                                <div className='popular-post-content'>
                                                    <p className='blogs-content'>13 things i’d Tell Any New
                                                        Travler </p>
                                                    <div className='d-flex'>
                                                        <p className="blogs-author">April 06 2023</p>
                                                        <p className="blogs-posted">By Ali Tufan</p>
                                                    </div>
                                                    <p className='comments-para'>50 comment</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                                <div className='popular-post-main mt-5'>
                                    <p className='popular-post-para mb-3'>Follow Me</p>
                                    <div className='footer-social-icon mt-lg-0 mt-3'>
                                        <ul className='social-hover'>
                                            <li className='blogs-icon'>
                                                <a href="#"><i className="fa-brands fa-facebook-f icon "></i></a>
                                            </li>
                                            <li className='blogs-icon'>
                                                <a href="#"><i className="fa-brands fa-instagram icon"></i></a>
                                            </li>
                                            <li className='blogs-icon'>
                                                <a href="#"><i className="fa-brands fa-x-twitter icon"></i></a>
                                            </li>
                                            <li className='blogs-icon'>
                                                <a href="#"><i className="fa-brands fa-linkedin-in icon"></i></a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className='popular-post-main mt-5 blogs-subscribe'>
                                    <h5 className='fw-bold text-white'>Subscribe Today</h5>
                                    <p className='text-white mb-4'>Lorem ipsum dolor sit am consectetur adipisc ing elit. In sed et donec purus viverra. Sit justo</p>
                                    <form>
                                        <div>
                                            <input type='text' placeholder='Enter Full Name' required />
                                            <input type='email' placeholder='Enter  Email' required />
                                        </div>
                                        <div className='d-flex'>
                                            <div>
                                                <input type='checkbox' required />
                                            </div>
                                            <p className='blogs-checkbox text-white ms-2'>You agree to our company privacy policy</p>
                                        </div>
                                        <button className='blogs-subscribe-btn' type='submit'>Subscribe</button>
                                    </form>
                                </div>


                                <div className='popular-post-main mt-5'>
                                    <p className='popular-post-para mb-3'>Tags</p>

                                    <div className='tags-main'>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel tips</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>
                                        <a href=''>Travel website</a>


                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section> 
        </div>
    )
}

export default Blogs
