import classNames from "classnames";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleRight, faAngleLeft } from "@fortawesome/pro-regular-svg-icons";

import Slider from "react-slick";

import Picture from "../../components/Picture";

export default function PhotosCarousel({ images }) {
  const Arrow = (props) => {
    const { className, icon, onClick } = props;

    return (
      <span className={classNames(className)} onClick={onClick}>
        <FontAwesomeIcon icon={icon} />
      </span>
    );
  };

  const imageComponents = images.map((image, index) => {
    const { width, height, src } = image;

    return (
      <Picture src={src} key={index} width={width} height={height} alt={`Image ${index + 1}`} />
    );
  });

  const settings = {
    centerMode: true,
    arrows: true,
    infinite: true,
    variableWidth: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <Arrow className="slick-arrow slick-prev" icon={faAngleLeft} />,
    nextArrow: <Arrow className="slick-arrow slick-next" icon={faAngleRight} />,
  };

  return (
    <div className={classNames("component component__photos_carousel")}>
      <Slider {...settings}>{imageComponents}</Slider>
    </div>
  );
}
