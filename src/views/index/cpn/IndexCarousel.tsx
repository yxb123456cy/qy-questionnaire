import {Carousel} from "antd";


/**
 * 首页走马灯;
 * @constructor
 */
export const IndexCarousel = () => {
    interface carouselData {
        src: string,
        alt: string,
        tc: string,
        te: string,
    }

    const carouselList: Array<carouselData> = [
        {
            src: "/images/carousel1.jpg",
            alt: "走马灯 1",
            tc: "简洁的界面设计",
            te: "Concise interface design"
        },
        {
            src: "/images/carousel2.jpg",
            alt: "走马灯 2",
            tc: "简单的打开方式",
            te: "Simple Opening Method"
        },
        {
            src: "/images/carousel3.jpg",
            alt: "走马灯 3",
            tc: "多样的数据可视化",
            te: "Diversified data visualization"
        }
    ]
    // const contentStyle: React.CSSProperties = {
    //     margin: 0,
    //     height: '500px',
    //     color: '#fff',
    //     lineHeight: '160px',
    //     textAlign: 'center',
    //     background: '#364d79',
    // };
    return (
        <>
            {/*autoplay自动播放*/}
            <Carousel arrows infinite={false} autoplay={true}>
                {/*改为For循环处理*/}
                {carouselList.map((e) => (
                    <div>
                        <div style={{
                            margin: 0,
                            height: "500px",
                            color: "#fff",
                            textAlign: "center",
                            fontWeight: "bolder",
                            fontSize: "large",
                            backgroundImage: "url(" + e.src + ")",
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            display: 'flex',
                            flexDirection: "row",
                            justifyContent: "center",
                            alignItems: "center",
                        }}>
                            <div style={{backgroundColor:"rgba(0,0,0,.6)",width:"100%",height:"100%"
                                ,display:"flex",
                                flexDirection:"column",
                                flexWrap:"wrap",
                                flex:1,
                                fontSize:"25px",
                                justifyContent:"center",
                                alignItems:"center",
                            }}

                            >
                                <h1>{e.tc}</h1>
                                <h1 style={{marginTop:"-25px"}}>  {e.te}</h1>
                            </div>
                        </div>
                    </div>
                ))}
            </Carousel>
        </>
    )
}