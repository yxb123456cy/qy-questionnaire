import {IndexCarousel} from "./IndexCarousel.tsx";
import './css/IndexContent.css'

/**
 * 首页内容组件;
 * @constructor
 */
export const IndexContent = () => {
    interface codeDivData {
        src: string,
        alt: string
    }

    const codeDivDataList: Array<codeDivData> = [
        {
            src: "/src/assets/images/demo1.png",
            alt: "问卷 首页图片1"
        },
        {
            src: "/src/assets/images/demo2.png",
            alt: "问卷 首页图片2"
        },
        {
            src: "/src/assets/images/demo3.png",
            alt: "问卷 首页图片3"
        }
    ]

    return (
        <>
            <div className={'IndexCarousel'}>
                <IndexCarousel/>
            </div>
            {/*改为for循环处理*/}
            <div className={'code-div-list'} style={{padding:"24px"}}>
                {codeDivDataList.map((e) => (
                    <div className={'code-div'}>
                        <div className={'code-div-head'}>
                            <div className={'round'}></div>
                            <div className={'round'}></div>
                            <div className={'round'}></div>
                        </div>
                        <div className={'content'}>
                            <img src={e.src} alt={e.alt} className={'index-image'}/>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}