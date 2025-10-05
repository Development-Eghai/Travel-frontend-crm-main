const ContactUs = () => {
    return (
        <div className='overflow-hidden'>
            <section className='contact-us-main'>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-6 my-lg-auto col-md-4">
                            <div className='contact-us-left'>
                                <div>
                                    <h1 className='text-white'>Get in Touch</h1>
                                    <p className='text-white'>Fill up the form and our Team wil get back to you within 24 hours.</p>

                                    <div className='get-in-touch-box'>
                                        <i className="fa-solid fa-location-dot mt-1 me-2"></i>
                                        <a href="">Piazza Napoleone, Lucca, Tuscary</a>
                                    </div>
                                    <div className='get-in-touch-box get-in-touch-box-active'>
                                        <i className="fa-solid fa-phone-volume mt-1 me-2"></i>
                                        <a href="">+91 987654321</a>
                                    </div>
                                    <div className='get-in-touch-box'>
                                        <i className="fa-solid fa-envelope mt-1 me-2"></i>
                                        <a href="">hello@gmail.com</a>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="col-lg-1 col-md-1">

                        </div>
                        <div className="col-lg-5 col-md-7">
                            <div className='contact-us-right'>
                                <div className='contact-us-right-innner'>
                                    <form>
                                        <div className='contact-input-div'>
                                            <label>Full Name</label>
                                            <input type="text" placeholder='Enter Your Full Name' />
                                        </div>
                                        <div className='contact-input-div'>
                                            <label>Email</label>
                                            <input type="email" placeholder='Enter Your Email Address' />
                                        </div>
                                        <div className='contact-input-div'>
                                            <label>Whatsapp Number</label>
                                            <input type="tel" placeholder='Enter Your Whatsapp Number' />
                                        </div>
                                        <div className='contact-input-div'>
                                            <label>Message</label>
                                            <textarea placeholder='Message'></textarea>
                                        </div>
                                        <button className='contact-submit-btn'>Submit</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </section>
            <div className='contact-us-map'>
                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d448196.52625953045!2d76.76358142599564!3d28.643684643433588!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b347eb62d%3A0x37205b715389640!2sDelhi!5e0!3m2!1sen!2sin!4v1750866099777!5m2!1sen!2sin" allowfullscreen=""
                    loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            </div>
        </div>
    )

}

export default ContactUs
