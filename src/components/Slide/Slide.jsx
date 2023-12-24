import './Slide.scss'
import Slider from "infinite-react-carousel";

const settings =  {
  arrows: false,
  autoplay: true,
  autoplaySpeed: 3000,
  duration: 400
};

const Slide = ({ children, slidesToShow, arrowsScroll }) => {

  return (
    <div className="slide">
      <div className="container">
        <Slider slidesToShow={slidesToShow} arrowsScroll={arrowsScroll} {...settings}>
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default Slide;
