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
        lazyLoad: true,
        // prevArrow: <CustomPrevButton />,
        // nextArrow: <CustomNextButton />
    }

    console.log(imgs)
    return (
        <div>
            <Slider ref={carousel} {...settings}>
                {imgs.map((item) => (
                    <div key={item.id}>
                        <img className="carousel-img" src={item.src} alt={item.alt} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}


// function CustomPrevButton(props) {
    
//     return <button onClick={props.onClick}>Previous</button>
// }

// function CustomNextButton(props) {
//     return <button onClick={props.onClick}>Next</button>
// }