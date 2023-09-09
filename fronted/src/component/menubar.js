import { Route } from "react-router";
import {Routes} from 'react-router-dom'
import TableData from './table_data'
import Home from "./home"



const Routing=()=>{
    return(
    <>
    <Routes>
        <Route path="/" element={<Home/>} />  
        <Route path="/table_data" element={<TableData/>}/>
      </Routes>

    </>
    )
}

export default Routing;