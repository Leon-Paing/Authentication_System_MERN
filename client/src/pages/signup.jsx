import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState();

    const navigate = useNavigate();


    const handleForm = async (e) => {
        e.preventDefault();
        setLoading(true);

        try{
            const res = await axios.post("http://localhost:50/api/register" ,{
                name,
                email,
                password
            }).then((resp) => {
                setMessage(resp.data.success+"\n Navigating to Login page...")
                setLoading(false)

                setTimeout(() =>  { 
                    navigate("/")
                }, [2000])
            }).catch((error) => {
                setMessage(error.response.data.message)
                setLoading(false)
            })
        }catch(err){
            console.error(`${err}`)
        }
    }

    return(
        <div className="w-screen h-screen flex flex-col justify-center items-center bg-gray-200">
            <form onSubmit={handleForm} className="flex flex-col justify-center items-center p-2 gap-2">
                <input className="border-2 p-2 rounded-md" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required/>
                <input className="border-2 p-2 rounded-md" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
                <input className="border-2 p-2 rounded-md" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
                <button className="w-full flex justify-center text-white bg-blue-500 p-1 rounded-md">Register</button>
                <span onClick={() => navigate("/")} className="w-full flex justify-center cursor-pointer text-white bg-blue-400 p-1 rounded-md">Back to login</span>
            </form>
            {loading ? (
                <div>
                    Loading...
                </div>
            ) : message && (
                <div>
                    <p className="text-2xl mt-2 bg-yellow-400 p-2 rounded-md text-white">{message}</p>
                </div>
            )}
        </div>
    )
} 

export default Signup;