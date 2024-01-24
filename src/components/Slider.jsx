import React, { useEffect } from "react";
import useFetchCollection from "../customhooks/useFetchCollection";
import { useDispatch, useSelector } from "react-redux";
import { Add_slider, selectslider } from "../redux/sliderSlice";

const Slider = () => {
  let { data } = useFetchCollection("sliders");
  let slider = useSelector(selectslider);
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(Add_slider(data));
  }, [data]);

  let imgstyle = { width: "100%", height: "700px" };

  return (
    <div>
      <div
        id="carouselExampleControls"
        className="carousel slide"
        data-bs-ride="carousel"
        data-bs-interval="2000"
        data-bs-pause="false"
      >
        <div className="carousel-inner">
          {slider.map((slide, i) => (
            <div className={`carousel-item ${i == 0 ? "active" : ""}`} key={i}>
              <img
                className="d-block w-100"
                src={slide.imageURL}
                alt="First slide"
                style={imgstyle}
              />
              <div class="carousel-caption d-none d-md-block">
                <h5>{slide.title}</h5>
                <p>{slide.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
