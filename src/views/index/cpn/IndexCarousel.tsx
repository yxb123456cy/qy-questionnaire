import {Carousel} from "antd";
import * as React from "react";

/**
 * 首页走马灯;
 * @constructor
 */
export const IndexCarousel = () => {
    interface carouselData {
        src: string,
        alt: string
    }

    const carouselList: Array<carouselData> = [
        {
            src: "/images/carousel1.jpg",
            alt: "走马灯 1"
        },
        {
            src: "/images/carousel2.jpg",
            alt: "走马灯 2"
        },
        {
            src: "/images/carousel3.jpg",
            alt: "走马灯 3"
        }
    ]
    const contentStyle: React.CSSProperties = {
        margin: 0,
        height: '500px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <>
            <Carousel arrows infinite={false}>
                {/*改为For循环处理*/}
                {carouselList.map((e) => (
                    <div>
                        <h3 style={contentStyle}>
                            <img src={e.src} alt={e.alt}
                                 style={{width: '100%', height: "100%"}}/>
                        </h3>
                    </div>
                ))}
            </Carousel>
        </>
    )
}