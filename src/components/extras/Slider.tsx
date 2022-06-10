import { useSlider } from '../../hooks/useSlider';
import SliderControl from '../buttons/SliderControl';
import SliderData from './../../assets/json/SliderData.json';
import './../../assets/scss/Slider.scss';

const Slider = () => {
  /*  */
  const { nextSlide, prevSlide, moveDot, slideIndex } = useSlider();

  return (
    <div className="container-slider mt-10">
      {SliderData.map((obj, index) => {
        return (
          <div key={obj.id}>
            <div
              className={
                slideIndex === index + 1 ? 'slide active-anim' : 'slide'
              }
            >
              <img
                src={process.env.PUBLIC_URL + `/images/Rule ${index + 1}.svg`}
                alt={obj.description}
                className="mobile:w-[288px] mobile:h-[237px] laptop:w-[288px] laptop:h-[237px]"
              />
            </div>
            {slideIndex === 1 ? (
              <SliderControl moveSlide={nextSlide} direction={'next'} />
            ) : (
              <SliderControl moveSlide={prevSlide} direction={'prev'} />
            )}
          </div>
        );
      })}

      <div className="container-dots">
        {Array.from({ length: 2 }).map((_item, index) => (
          <div
            key={index}
            onClick={() => moveDot(index + 1)}
            className={slideIndex === index + 1 ? 'dot active' : 'dot'}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default Slider;
