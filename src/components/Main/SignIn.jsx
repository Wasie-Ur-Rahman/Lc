// import axios from 'axios';
// import { useState } from 'react';
// import {UserContext} from "../UserContext/UserContext"
// import { useContext } from 'react';
// const SignIn = ({ onSignUpClick , setToken, setUserId, setIsLoggedIn}) => {
//   // const [userName, setUserName] = useState('');
//   // const [password, setPassword] = useState('');
//   const { setToken1, setUserId1, setIsLoggedIn1 } = useContext(UserContext);
//   const [error, setError] = useState('');
//   const [isWaiting, setIsWaiting] = useState(false);

//   const apiUrl = 'https://192.168.18.251:8010/api/authenticate/access-token-json';
//   const username = 'test';
//   const password = 'Aa1!';

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsWaiting(true);
//     try {
//       // Making the POST request to the authentication API using axios
//       const response = await axios.post(apiUrl, {
//         username: userName,
//         password: password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       // Handle success
//       setIsWaiting(false);
//       const data = response.data;
//       console.log("Response Data:", data);

//       setIsLoggedIn(true);
//       setIsLoggedIn1(true);
//       setUserId(userName);
//       setUserId1(userName);
//       setToken(data.access_token);
//       setToken1(data.access_token);
//       console.log("Access Token:", data.access_token);
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       // Handle network or other errors
//       setIsWaiting(false);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError(`Authentication failed. Status code: ${error.response.status}`);
//         console.error('Authentication error:', error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('No response received from the server.');
//         console.error('Error request:', error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError(`An error occurred: ${error.message}`);
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   return (
//     <div className='flex flex-col justify-evenly w-[30%] h-[100%] bg-[#2C333D] opacity-[84%] border-[1px] border-[#242F3A]'>
//       {/* Sign-in Form */}
//       <form onSubmit={handleSubmit} className='h-[82%] flex flex-col justify-evenly'>
//         <div className='flex justify-center'>
//           <input
//             type="text"
//             id="username"
//             value={userName}
//             // onChange={(e) => setUserName(e.target.value)}
//             required
//             placeholder="Enter Username"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <div className='flex justify-center'>
//           <input
//             type="password"
//             id="password"
//             value={password}
           
//             required
//             placeholder="Enter Password"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-[30%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
//         >
//           Sign In
//         </button>
//       </form>

//       {isWaiting && <p className="text-[#2A8BE9] mt-2 text-[18px] text-center"> Signing in 
//               <span className="dot1">.</span>
//               <span className="dot2">.</span>
//               <span className="dot3">.</span>
//                 </p>}

//       {/* Display error message */}
//       {error && (
//         <div className="text-red-500 text-center mt-[-20px] font-Inconsolata text-[18px]">
//           {error}
//         </div>
//       )}

//       {/* Forgot */}
//       <div className="flex h-[18%] justify-center mt-5">
//         <img className='h-[30px] pr-3' src="/forgot.png" alt="Forgot" />
//         <p className="text-white text-[22px] font-Inconsolata">Forgot</p>
//         <a className='text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer'>Email/Password?</a> 
//       </div>

//       {/* Sign Up */}
//       {/* <div className="flex h-[18%] justify-center ">
//         <p className="text-white text-[22px] font-Inconsolata">Don't have an account?</p>
//         <button onClick={onSignUpClick} className='h-[45%] text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer '>Sign up</button> 
//       </div> */}
//     </div>
//   );
// };

// export default SignIn;





// import axios from 'axios';
// import { useState, useContext } from 'react';
// import { UserContext } from "../UserContext/UserContext";

// const SignIn = ({ onSignUpClick, setToken, setUserId, setIsLoggedIn }) => {
//   const { setToken1, setUserId1, setIsLoggedIn1 } = useContext(UserContext);
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [isWaiting, setIsWaiting] = useState(false);

//   const apiUrl = 'https://192.168.18.251:8010/api/authenticate/access-token-json';

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsWaiting(true);
//     try {
//       // Making the POST request to the authentication API using axios
//       const response = await axios.post(apiUrl, {
//         username: username,
//         password: password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       // Handle success
//       setIsWaiting(false);
//       const data = response.data;
//       console.log("Response Data:", data);

//       setIsLoggedIn(true);
//       setIsLoggedIn1(true);
//       setUserId(username);
//       setUserId1(username);
//       setToken(data.access_token);
//       setToken1(data.access_token);
//       console.log("Access Token:", data.access_token);
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       // Handle network or other errors
//       setIsWaiting(false);
//       if (error.response) {
//         setError(`Authentication failed. Status code: ${error.response.status}`);
//         console.error('Authentication error:', error.response.data);
//       } else if (error.request) {
//         setError('No response received from the server.');
//         console.error('Error request:', error.request);
//       } else {
//         setError(`An error occurred: ${error.message}`);
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   return (
//     <div className='flex flex-col justify-evenly w-[30%] h-[100%] bg-[#2C333D] opacity-[84%] border-[1px] border-[#242F3A]'>
//       {/* Sign-in Form */}
//       <form onSubmit={handleSubmit} className='h-[82%] flex flex-col justify-evenly'>
//         <div className='flex justify-center'>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//             placeholder="Enter Username"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <div className='flex justify-center'>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter Password"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-[30%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
//         >
//           Sign In
//         </button>
//       </form>

//       {isWaiting && <p className="text-[#2A8BE9] mt-2 text-[18px] text-center"> Signing in 
//               <span className="dot1">.</span>
//               <span className="dot2">.</span>
//               <span className="dot3">.</span>
//       </p>}

//       {/* Display error message */}
//       {error && (
//         <div className="text-red-500 text-center mt-[-20px] font-Inconsolata text-[18px]">
//           {error}
//         </div>
//       )}

//       {/* Forgot */}
//       <div className="flex h-[18%] justify-center mt-5">
//         <img className='h-[30px] pr-3' src="/forgot.png" alt="Forgot" />
//         <p className="text-white text-[22px] font-Inconsolata">Forgot</p>
//         <a className='text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer'>Email/Password?</a> 
//       </div>
//     </div>
//   );
// };

// export default SignIn;



// import axios from 'axios';
// import { useState } from 'react';
// import {UserContext} from "../UserContext/UserContext"
// import { useContext } from 'react';
// const SignIn = ({ onSignUpClick , setToken, setUserId, setIsLoggedIn}) => {
//   const [username, setUserName] = useState('');
//   const [password, setPassword] = useState('');
//   const { setToken1, setUserId1, setIsLoggedIn1 } = useContext(UserContext);
//   const [error, setError] = useState('');
//   const [isWaiting, setIsWaiting] = useState(false);

//   const apiUrl = 'https://192.168.18.251:8010/api/authenticate/access-token-json';


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     setIsWaiting(true);
//     try {
//       // Making the POST request to the authentication API using axios
//       const response = await axios.post(apiUrl, {
//         username: username,
//         password: password,
//       }, {
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       });

//       // Handle success
//       setIsWaiting(false);
//       const data = response.data;
//       console.log("Response Data:", data);

//       setIsLoggedIn(true);
//       setIsLoggedIn1(true);
//       setUserId(username);
//       setUserId1(username);
//       setToken(data.access_token);
//       setToken1(data.access_token);
//       console.log("Access Token:", data.access_token);
//       setError(''); // Clear any previous errors
//     } catch (error) {
//       // Handle network or other errors
//       setIsWaiting(false);
//       if (error.response) {
//         // The request was made and the server responded with a status code
//         // that falls out of the range of 2xx
//         setError(`Authentication failed. Status code: ${error.response.status}`);
//         console.error('Authentication error:', error.response.data);
//       } else if (error.request) {
//         // The request was made but no response was received
//         setError('No response received from the server.');
//         console.error('Error request:', error.request);
//       } else {
//         // Something happened in setting up the request that triggered an Error
//         setError(`An error occurred: ${error.message}`);
//         console.error('Error:', error.message);
//       }
//     }
//   };

//   return (
//     <div className='flex flex-col justify-evenly w-[30%] h-[100%] bg-[#2C333D] opacity-[84%] border-[1px] border-[#242F3A]'>
//       {/* Sign-in Form */}
//       <form onSubmit={handleSubmit} className='h-[82%] flex flex-col justify-evenly'>
//         <div className='flex justify-center'>
//           <input
//             type="text"
//             id="username"
//             value={username}
//             onChange={(e) => setUserName(e.target.value)}
//             required
//             placeholder="Enter Username"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <div className='flex justify-center'>
//           <input
//             type="password"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//             placeholder="Enter Password"
//             className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
//           />
//         </div>
//         <button
//           type="submit"
//           className="w-[30%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
//         >
//           Sign In
//         </button>
//       </form>

//       {isWaiting && <p className="text-[#2A8BE9] mt-2 text-[18px] text-center"> Signing in 
//               <span className="dot1">.</span>
//               <span className="dot2">.</span>
//               <span className="dot3">.</span>
//                 </p>}

//       {/* Display error message */}
//       {error && (
//         <div className="text-red-500 text-center mt-[-20px] font-Inconsolata text-[18px]">
//           {error}
//         </div>
//       )}

//       {/* Forgot */}
//       <div className="flex h-[18%] justify-center mt-5">
//         <img className='h-[30px] pr-3' src="/forgot.png" alt="Forgot" />
//         <p className="text-white text-[22px] font-Inconsolata">Forgot</p>
//         <a className='text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer'>Email/Password?</a> 
//       </div>

//       {/* Sign Up */}
//       {/* <div className="flex h-[18%] justify-center ">
//         <p className="text-white text-[22px] font-Inconsolata">Don't have an account?</p>
//         <button onClick={onSignUpClick} className='h-[45%] text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer '>Sign up</button> 
//       </div> */}
//     </div>
//   );
// };

// export default SignIn;


import axios from 'axios';
import { useState , useEffect } from 'react';
import {UserContext} from "../UserContext/UserContext"
import { useContext } from 'react';
const SignIn = ({ onSignUpClick , setToken, setUserId, setIsLoggedIn , setIsCompResult  }) => {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const { setToken1, setUserId1, setIsLoggedIn1 ,  handleLogout , activeFlag , setActiveFlag , apiResonseData_Saver , setApiResonseData_Saver , setActiveFlag_1 ,activeFlag_1 , setUpload_Results , Uplaod_Results ,setDocuments_saver ,documents_saver , verify_page , setVerifyPage , flagsetter , setFlagsetter , payload_saver , setPayload_saver  , flag_progress , setFlag_progress , payload_carrier , setPayload_carrier , document_verification , setDocument_verification , payload_setter , setPayload_setter , start_again , setStart_again ,setSkip ,skip , setApiList , setApiCalled  , setCount , setMT700 , setChecking  ,  setVerification } = useContext(UserContext);
  const [error, setError] = useState('');
  const [isWaiting, setIsWaiting] = useState(false);

  const apiUrl = 'https://192.168.18.251:8010/api/authenticate/access-token-json';
  
  
  const isCall = async (accessToken) => {
    try {
        console.log("Entered the initLC function");
        const iscall = 'https://192.168.18.251:8010/initLC/';

        const response = await fetch(`${iscall}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${accessToken}`,
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        console.log("Response from API LCINIT:", data);



    } catch (err) {
        console.error("Error in isCall function:", err);
        setError(err.message || 'Error in initLC API call');
    }
};


const Check =  async () =>
{

  const url = 'https://192.168.18.251:8010/initalizedCheck/';
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: JSON.stringify({}),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    console.log('Response Data for the Check :', data);
  } catch (error) {
    console.error('There was an error with the fetch operation:', error);
  }
}

  useEffect(() => {
  
    
  setApiList({})
  setApiCalled(false)
  setCount(0)
  setMT700(null)
  setChecking(0)
  setIsLoggedIn(false);
  setActiveFlag(false)
  setApiResonseData_Saver({})
  setActiveFlag_1(false)
  setFlagsetter(false)
  setUpload_Results({});
  setDocuments_saver([]);
  setVerifyPage(false);
  setPayload_saver({})
  setFlag_progress(false)
  setPayload_carrier({})
  setDocument_verification([])
  setPayload_setter([])
  setStart_again(true)
  setSkip(false)
  setVerification(false)
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    
    setIsWaiting(true);
    try {
    
      const response = await axios.post(apiUrl, {
        username: userName,
        password: password,
      }, {
        headers: {
          'Content-Type': 'application/json',
        },
      });


      setIsWaiting(false);
      const data = response.data;
      console.log("Response Data:", data);
      setApiList({})
  setApiCalled(false)
  setCount(0)

  setMT700(null)
  setChecking(0)
  setIsLoggedIn(false);
  setActiveFlag(false)
  setApiResonseData_Saver({})
  setActiveFlag_1(false)
  setFlagsetter(false)
  setUpload_Results({});
  setDocuments_saver([]);
  setVerifyPage(false);
  setPayload_saver({})
  setFlag_progress(false)
  setPayload_carrier({})
  setDocument_verification([])
  setPayload_setter([])
  setStart_again(false)
  setSkip(false)
  setVerification(false)
      setIsLoggedIn(true);
      setIsLoggedIn1(true);
      setUserId(userName);
      setUserId1(userName);
      setToken(data.access_token);
      // setIsCompResult(false)
      setToken1(data.access_token);
      console.log("Access Token:", data.access_token);
      await isCall(data.access_token);
      await Check()
      setError(''); 
    } catch (error) {

      setIsWaiting(false);
      if (error.response) {
   
        setError(`Authentication failed. Status code: ${error.response.status}`);
        console.error('Authentication error:', error.response.data);
      } else if (error.request) {

        setError('No response received from the server.');
        console.error('Error request:', error.request);
      } else {
     
        setError(`An error occurred: ${error.message}`);
        console.error('Error:', error.message);
      }
    }
  };

  return (
    <div className='flex flex-col justify-evenly w-[30%] h-[100%] bg-[#2C333D] opacity-[84%] border-[1px] border-[#242F3A]'>
 
      <form onSubmit={handleSubmit} className='h-[82%] flex flex-col justify-evenly'>
        <div className='flex justify-center'>
          <input
            type="text"
            id="username"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter Username"
            className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
          />
        </div>
        <div className='flex justify-center'>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="Enter Password"
            className="w-[60%] px-3 py-3 bg-transparent border-[1px] border-[#2A8BE9] font-Inconsolata font-[400] text-[22px] placeholder-white text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="w-[30%] px-4 py-2 bg-blue-500 text-white self-center hover:bg-blue-600 font-Inconsolata text-[22px] font-[800]"
        >
          Sign In
        </button>
      </form>

      {isWaiting && <p className="text-[#2A8BE9] mt-2 text-[18px] text-center"> Signing in 
              <span className="dot1">.</span>
              <span className="dot2">.</span>
              <span className="dot3">.</span>
                </p>}

     
      {error && (
        <div className="text-red-500 text-center mt-[-20px] font-Inconsolata text-[18px]">
          {error}
        </div>
      )}

  
      <div className="flex h-[18%] justify-center mt-5">
        <img className='h-[30px] pr-3' src="/forgot.png" alt="Forgot" />
        <p className="text-white text-[22px] font-Inconsolata">Forgot</p>
        <a className='text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer'>Email/Password?</a> 
      </div>

      {/* Sign Up */}
      {/* <div className="flex h-[18%] justify-center ">
        <p className="text-white text-[22px] font-Inconsolata">Don't have an account?</p>
        <button onClick={onSignUpClick} className='h-[45%] text-blue-500 hover:underline ml-2 font-Inconsolata text-[22px] cursor-pointer '>Sign up</button> 
      </div> */}
    </div>
  );
};

export default SignIn;