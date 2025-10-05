import { Images } from "../../helpers/Images/images";
const BlogsDetail = () => {
  return (
    <section className='mt-5 overflow-hidden'>
      <div className='container'>
        <div className='row'>
          <div className='col-lg-9'>
            <p className='blogs-detail-cat'>Travel</p>
            <h4 className='blogs-detail-title'>I Created a Developer Rap Video - Here's What I Learned</h4>

            <div className='blogs-detail-posted'>
              <div className='d-flex'>
                <div>
                  <img src={Images?.blogs_author} alt="" />
                </div>
                <p className='ms-2'>Jesica koli</p>
              </div>
              <div className='blogs-detail-date'>
                <i className="fa-solid fa-calendar-days my-auto me-2"></i>
                <p>02 december 2022</p>
              </div>

            </div>
            <div>
              <img src={Images?.blogs_detail_image} alt="" className='blogs-detail-img' />
            </div>
            <p>Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.</p>
            <p className='mt-3'>Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.</p>
            <p className='mt-3'>Did you come here for something in particular or just general Riker-bashing? And blowing into maximum warp speed, you appeared for an instant to be in two places at once. We have a saboteur aboard. We know you’re dealing in stolen ore. But I wanna talk about the assassination attempt on Lieutenant Worf. Could someone survive inside a transporter buffer for 75 years? Fate. It protects fools, little children, and ships.</p>


          </div>

          <div className='col-lg-3'>
            <div className='blogs-detail-left'>
              <div>
                <h6 className='blogs-detail-left-head'>Categories </h6>

                <div className='blogs-detail-categories'>
                  <a>Lifestyle</a>
                  <p>09</p>
                </div>

                <div className='blogs-detail-categories'>
                  <a>Travel</a>
                  <p>09</p>
                </div>

                <div className='blogs-detail-categories'>
                  <a>Food</a>
                  <p>09</p>
                </div>

                <div className='blogs-detail-categories'>
                  <a>Single Tour</a>
                  <p>09</p>
                </div>
              </div>

              <div className='mt-5'>
                <div className='d-flex'>
                  <h6 className='blogs-detail-left-head'>Search</h6>
                  <h6 className='mt-2 ms-1'>With </h6>
                  <h6 className='mt-2 ms-1'>Tags</h6>
                </div>

                <div className='blogs-detail-tags'>
                  <a href="">Lifestyle</a>
                  <a href="">Travel</a>
                  <a href="">Food</a>
                  <a href="" className='active'>Single Tour</a>
                  <a href="">Business</a>
                  <a href="">Art</a>
                  <a href="">Health</a>
                  <a href="">Technology</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default BlogsDetail
