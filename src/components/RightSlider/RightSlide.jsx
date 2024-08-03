import "./RightSlide.scss";
import Slider from "infinite-react-carousel";

const settings = {
  arrows: true
};

const RightSlide = ({ children, slidesToShow, arrowsScroll }) => {
  return (
    <div className="slide">
      <div className="container">
        <Slider
          slidesToShow={slidesToShow}
          arrowsScroll={arrowsScroll}
          {...settings}
        >
          {children}
        </Slider>
      </div>
    </div>
  );
};

export default RightSlide;
