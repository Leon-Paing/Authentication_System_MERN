import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {

    const [auth, setAuth] = useState(false)
    const [token, setToken] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem("Token");
        if(token != undefined && token != ""){
            setAuth(true)
            setToken(token)
        }else{
            navigate("/")
        }
    }, [token])

    const logout = () => {
        sessionStorage.removeItem("Token")
        setToken("")
    }

    return(
        <>
            {auth &&(
                <div className="w-screen h-screen flex flex-col justify-center items-center">
                    <div className="text-3xl flex justify-center">Welcome to Dashboard</div>
                    <p onClick={logout} className="rounded-lg p-3 bg-red-600 text-white cursor-pointer flex justify-center mt-2">Logout</p>
                </div>
            )}
        </>
    )
}

export default Dashboard;