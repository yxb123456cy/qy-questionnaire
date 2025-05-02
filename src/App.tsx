import './App.css'
import {RouterProvider} from "react-router";
import router from "./router/Router.tsx";


function App() {
    return (
        <>
            <div style={{fontFamily:"Avenir, Helvetica, Arial, sans-serif"}}
            ><RouterProvider router={router}/>
            </div>

        </>
    )
}

export default App
