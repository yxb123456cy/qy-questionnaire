import {MenuList} from "./cpn/MenuList.tsx";


export const QuestionnaireList = () => {

    return (
        <>
            <div style={{width: '100%'}}>
                {/*渲染在Zustand Store中存储的问卷列表;*/}
                <MenuList/>
            </div>

        </>
    )
}