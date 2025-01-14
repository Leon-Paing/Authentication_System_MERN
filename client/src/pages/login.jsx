import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [data, setData] = useState();
    const [token, setToken] = useState();

    const navigate = useNavigate();

    useEffect(()=> {
        const jwt = sessionStorage.getItem("Token")
        if(jwt){
            navigate("/dashboard")
        }
    }, [])

    const storeToken = (jwt) => {
        if(jwt != undefined){
            sessionStorage.setItem("Token", jwt)
        };
    }

    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await axios.post("http://localhost:50/api/login" ,{
                email,
                password
            }).then((res) => {
                setData(res.data)
                setToken(res.data.token)
                setLoading(false)
                setErrorMessage()
                navigate("/dashboard")
            }).catch((error) => {
                setLoading(false)
                setErrorMessage(error.response.data.message)
            })
        }catch(error){
            setErrorMessage(`${error}`)
        }
    }

    storeToken(token);

    return(
        <>
        <div className="w-screen h-screen flex flex-col justify-center items-center p-3 bg-gray-200">
            <form onSubmit={handleForm} className="flex flex-col items-start justify-center gap-1">
                <input className="border-2 p-2 rounded-md" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input className="border-2 p-2 rounded-md" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className="w-full border-2 p-1 rounded-md bg-blue-500 text-white">Login</button>
                <span onClick={() => navigate("/signup")} className="w-full p-1 rounded-md cursor-pointer flex justify-center bg-blue-400 text-white">Signup</span>
            </form>
            {loading ? (
                <div className="">
                    Loading...
                </div>
            ) : data && (
                <div>
                    <p>Hello {data.name}!</p>
                    <p>Your email is {data.email}</p>
                </div>
            )}
             <p className="text-xl text-red-500 mt-3">{errorMessage}</p>
        </div>
        </>
    )
} 

export default Login;