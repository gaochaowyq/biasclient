import {Routes, Route} from "react-router-dom";
import Bpricecheck from "./bpricecheckcomponent";
function RootRoute(){
    return(
        <Routes>
            <Route path='/check' element={<Bpricecheck/>}  />
        </Routes>
    )

}
export default RootRoute