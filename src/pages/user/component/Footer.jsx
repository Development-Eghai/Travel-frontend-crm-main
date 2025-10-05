import { Link } from 'react-router-dom';
import { MemorizedSelector } from '../../../helpers/memorizedSelector';

const Footer = () => {
  const { appConfigData } = MemorizedSelector();

  return (
    <div>
      <footer className='footer-main section-padding-top'>
        <div className='container'>

          <div className='footer-top-main position-relative'>
            <div className='d-flex my-auto'>
              <p>Speak to our expert at</p>
              <a className='expert-contact' href='tel:+9345841519'>{appConfigData?.config_data?.phone1}</a>
            </div>

            {appConfigData?.config_data?.social_links &&
              <div className='footer-social-icon mt-lg-0 mt-3'>
                <p>Follow Us :</p>
                <ul className='social-hover'>

                  {appConfigData?.config_data?.social_links?.instagram?.url &&
                    appConfigData?.config_data?.social_links?.instagram?.show && (
                      <li>
                        <a href={appConfigData?.config_data.social_links.instagram.url} target="_blank"><i className="fa-brands fa-instagram icon"></i></a>
                      </li>
                    )}

                  {appConfigData?.config_data?.social_links?.facebook?.url &&
                    appConfigData?.config_data?.social_links?.facebook?.show && (
                      <li>
                        <a href={appConfigData?.config_data?.social_links?.facebook.url} target="_blank"><i class="fa-brands fa-facebook-f icon"></i></a>
                      </li>
                    )}

                  {appConfigData?.config_data?.social_links?.linkedin?.url &&
                    appConfigData?.config_data?.social_links?.linkedin?.show && (
                      <li>
                        <a href={appConfigData?.config_data?.social_links?.linkedin.url} target="_blank"><i class="fa-brands fa-linkedin-in icon"></i></a>
                      </li>
                    )}

                  {appConfigData?.config_data?.social_links?.youtube?.url &&
                    appConfigData?.config_data?.social_links?.youtube?.show && (
                      <li>
                        <a href={appConfigData?.config_data?.social_links?.youtube.url} target="_blank"><i class="fa-brands fa-youtube icon"></i></a>
                      </li>
                    )}


                  {appConfigData?.config_data?.social_links?.twitter?.url &&
                    appConfigData?.config_data?.social_links?.twitter?.show && (
                      <li>
                        <a href={appConfigData?.config_data.social_links.twitter.url} target="_blank">
                          <i class="fa-brands fa-x-twitter icon"></i>
                        </a>
                      </li>
                    )}

                </ul>
              </div>
            }

          </div>

          <div className='footer-bottom-main'>
            <div className='row'>
              <div className="col-lg-4 col-md-4 col-6">
                <div className='footer-column-one d-flex flex-column'>
                  <h5 className='footer-column-heading'>Contact</h5>
                  <p className='mb-2'>{appConfigData?.config_data?.address}</p>
                  <a href={`mailto:${appConfigData?.config_data?.email}`}>{appConfigData?.config_data?.email}</a>
                  <a href={`tel:${appConfigData?.config_data?.phone1}`} className='mt-3'>{appConfigData?.config_data?.phone1}</a>
                  <a href={`tel:${appConfigData?.config_data?.phone2}`} className='mt-3'>{appConfigData?.config_data?.phone2}</a>
                </div>
              </div>

              <div className="col-lg-2 col-md-3 col-6">
                <div className='footer-column-two footer-anchor-main d-flex flex-column'>
                  <h5 className='footer-column-heading'>Company</h5>
                  <a href='emailto:john@gmail.com'>About Us</a>
                  <a href='emailto:john@gmail.com'>Tourz Reviews</a>
                  <a href='emailto:john@gmail.com'>Contact Us</a>
                  <a href='emailto:john@gmail.com'>Cookie Policy</a>
                </div>
              </div>

              <div className="col-lg-2 col-md-3 col-6">
                <div className='footer-column-two footer-anchor-main d-flex flex-column'>
                  <h5 className='footer-column-heading'>Support</h5>
                  <a href='emailto:john@gmail.com'>Get in Touch</a>
                  <a href='emailto:john@gmail.com'>Help center</a>
                  <a href='emailto:john@gmail.com'>Live chat</a>
                  <a href='emailto:john@gmail.com'>How it works</a>
                </div>
              </div>

              <div className="col-lg-4 col-md-4 col-12">
                <div className='footer-column-two footer-anchor-main d-flex flex-column'>
                  <h5 className='footer-column-heading'>Newsletter</h5>
                  <p className='mb-2'>Subscribe to the free newsletter and stay
                    up to date</p>
                  <div className='subscribe-main mt-2'>
                    <input type="text" placeholder='Email Address' />
                    <button className='subscribe-btn'>Subscribe</button>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div className='pb-5 footer-last'>
            <div>
              <Link to='/Payments' className='mx-1'>Payments</Link>
              <Link to='/terms-and-conditions' className='mx-1'>Terms&Conditions</Link>
              <Link to='/privacy-policy' className='mx-1'>PrivacyPolicy</Link>
            </div>
            <div><p className='mt-lg-0 mt-md-0 mt-3'>© Copyright Viatours 2024</p></div>
          </div>

        </div>
      </footer>
    </div>
  )
}

export default Footer
