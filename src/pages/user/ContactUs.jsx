const ContactUs = () => {
  return (
    <div className="overflow-hidden">
      <section className="contact-us-main">
        <div className="container">
          <div className="row">
            {/* LEFT SIDE */}
            <div className="col-lg-6 my-lg-auto col-md-4">
              <div className="contact-us-left">
                <div>
                  <h1 className="text-white">Get in Touch</h1>
                  <p className="text-white">
                    Fill up the form and our Team will get back to you within 24 hours.
                  </p>

                  {/* Location */}
                  <div className="get-in-touch-box d-flex align-items-start mb-3">
                    <i
                      className="fa-solid fa-location-dot me-3"
                      style={{ fontSize: "20px", color: "#fff", marginTop: "4px" }}
                    ></i>
                    <a
                      href="https://maps.app.goo.gl/mLZpqSrtqF1BbEwX9"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-white"
                      style={{ textDecoration: "none", lineHeight: "1.5" }}
                    >
                      Indian Mountain Rovers<br />
                      Near Govt. Printing Press, Lower Chakkar<br />
                      Shimla–Manali Highway, NH205, Himachal Pradesh<br />
                      Pin No. 171005
                    </a>
                  </div>

                  {/* Phone Numbers */}
                  <div className="get-in-touch-box d-flex align-items-start mb-3">
                    <i
                      className="fa-solid fa-phone me-3"
                      style={{ fontSize: "20px", color: "#fff", marginTop: "4px" }}
                    ></i>
                    <div className="d-flex flex-column">
                      <a
                        href="tel:+918278829941"
                        className="text-white"
                        style={{ textDecoration: "none", marginBottom: "4px" }}
                      >
                        +91 82788 29941
                      </a>
                      <a
                        href="tel:+919418344227"
                        className="text-white"
                        style={{ textDecoration: "none" }}
                      >
                        +91 94183 44227
                      </a>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="get-in-touch-box d-flex align-items-start mb-3">
                    <i
                      className="fa-solid fa-envelope me-3"
                      style={{ fontSize: "20px", color: "#fff", marginTop: "4px" }}
                    ></i>
                    <a
                      href="mailto:info@indianmountainrovers.com"
                      className="text-white"
                      style={{ textDecoration: "none" }}
                    >
                      info@indianmountainrovers.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* GAP COLUMN */}
            <div className="col-lg-1 col-md-1"></div>

            {/* RIGHT SIDE */}
            <div className="col-lg-5 col-md-7">
              <div className="contact-us-right">
                <div className="contact-us-right-innner">
                  <form>
                    <div className="contact-input-div">
                      <label>Full Name</label>
                      <input type="text" placeholder="Enter Your Full Name" />
                    </div>
                    <div className="contact-input-div">
                      <label>Email</label>
                      <input type="email" placeholder="Enter Your Email Address" />
                    </div>
                    <div className="contact-input-div">
                      <label>Whatsapp Number</label>
                      <input type="tel" placeholder="Enter Your Whatsapp Number" />
                    </div>
                    <div className="contact-input-div">
                      <label>Message</label>
                      <textarea placeholder="Message"></textarea>
                    </div>
                    <button className="contact-submit-btn">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map */}
      <div className="contact-us-map">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d24981.19946140381!2d77.155246!3d31.103271999999997!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39056f31ba4640f7%3A0xb486e670ee9bea75!2sIndian%20Mountain%20Rovers!5e1!3m2!1sen!2sin!4v1760102424988!5m2!1sen!2sin"
          width="100%"
          height="450"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </div>
    </div>
  );
};

export default ContactUs;
