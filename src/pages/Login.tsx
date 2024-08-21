import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // Adjust the import path
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify'; // Import Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success('Login successful!');
      // Redirect to user's notes page
      setTimeout(() => navigate('/notes'), 2000);
    } catch (error: any) { // Add type annotation here
        toast.error(error.message); // Display the error message
        setError(error.message);
      }
  };

  return (
    <div className="flex items-center justify-center flex-col p-[50px] w-full h-full ">

        <div>
             <h2 className="text-[4rem] font-bold mb-[20px]">LOGIN</h2>
        </div>

      <div className='bg-yellow-100 w-[70%] h-[500px] flex items-center justify-center flex-col rounded-[20px]'>
            {error && <p className="text-red-500">{error}</p>}
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-[300px] rounded-md p-1 mb-[10px]"
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-[300px] rounded-md p-1 mb-[20px]"
            />
            <button onClick={handleLogin} className="w-[100px] bg-red-300 p-[10px] rounded-[20px] flex justify-center items-center mb-[10px]">
                Login
            </button>
            <h3>You Don't have account?   <Link to="/signup">Sign up</Link> </h3>
      </div>
      <ToastContainer /> {/* Toastify container */}
    </div>
  );
}

export default Login;
