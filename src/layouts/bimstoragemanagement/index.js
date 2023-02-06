import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import Footer from "examples/Footer";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import {useState, useEffect} from "react";
import {useParams} from "react-router-dom";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import useForgeToken from "util/forgeAPI/useForgeToken"
import {postRevitToForge} from "util/forgeAPI/postRevitToForge";
import EarthMap from "./components/EarthMap";



function BimStorageCreate() {
    const [comments, setComments] = useState([]);
    const {id} = useParams();
    const [name, setName] = useState('');
    const [lat, setLat] = useState(116.402544);
    const [lot, setLot] = useState(39.928216);
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');
    const [file, setFile] = useState('');
    const [projectmanager, setProjectManager] = useState('');
    const forgetoken=useForgeToken();

    let projectdata = {
        "name": name,
        "info": {
            "Lat": lat,
            "Log": lot,
            "type": type,
            "status": status,
            "objectKye": file,
            "name": name,
            "projectID": null,
            "uri_forge": null,
            "design_info": {
                "projectmanager_info": {
                    "name": projectmanager,
                    "phonenumber": "18618212979"
                },
                "time": {
                    "starttime": null,
                    "duration": null
                }
            }
        }
    }

    useEffect(() => {
        postRevitToForge(forgetoken,"a",file)
    }, [file]);


    return (
        <DashboardLayout>
            <DashboardNavbar/>
            <MDBox
                color="white"
                variant="gradient"
                borderRadius="lg"
                shadow="lg"
                opacity={1}
                p={2}
                flexDirection={'column'}
                display={'flex'}
            >
                <MDInput type="text" variant="outlined" label="项目名称" onChange={e => setName(e.target.value)}/>
                <MDInput type="number" label="(经度)Lat" onChange={e => setLat(e.target.value)}/>
                <MDInput type="number" label="(纬度)Lot" onChange={e => setLot(e.target.value)}/>
                <EarthMap center={{lat: lot?lot:0, lng: lat?lat:0}} style={{height:300,width:"auto"}} zoom={10}/>

                <MDInput type="text" label="建筑类型" onChange={e => setType(e.target.value)}/>
                <MDInput type="text" label="项目阶段" onChange={e => setStatus(e.target.value)}/>
                <MDInput type="file" label="项目文件" onChange={e => setFile(e.target.value)}/>
                <MDInput type="text" label="项目经理" onChange={e => setProjectManager(e.target.value)}/>
            </MDBox>
            <Footer/>
        </DashboardLayout>
    );
}

export default BimStorageCreate;