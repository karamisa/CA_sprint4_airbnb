import Slider from 'react-slick'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import { useRef } from "react"


export function ImageCarousel({ imgs }) {

    const carousel = useRef()

    const settings = {
        infinite: false,
        dots: true,
        slidesToShow: 1,
        arrows: true,
        slidesToScroll: 1,
        lazyLoad: true
    }
    console.log(imgs)
    return (
        <div>
            {/* <button onClick={() => carousel.current.slickGoTo(0)}>Go to start</button>
            <button onClick={() => carousel.current.slickGoTo(imgs.length - 1)}>
                Go to last
            </button> */}
            <Slider {...settings}>
                {imgs.map((item) => (
                    <div key={item.id}>
                        <img className="carousel-img" src={item.src} alt={item.alt} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}
