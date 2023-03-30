import { Outlet } from "react-router-dom";
import Aside from "../../Components/Aside/Aside"
import NavBar from "../../Components/NavBar/NavBar"
import Footer from "../../Components/Footer/Footer";

const MainLayout = () =>{
    return(
        <>
            <NavBar/>
            <div className="d-flex justify-content-around mt-5 pt-4">
                <Aside/>
                <Outlet/>
            </div>
            <Footer/>
        </>
    )
}
export default MainLayout;