// // import React from "react";
// // import { useMsal } from "@azure/msal-react";
// // import { loginRequest } from "./authConfig";
// // import { Button } from "@mui/material";
// // import LoginIcon from '@mui/icons-material/Login'; // alternative icon
// // import { useNavigate } from "react-router-dom";

// // const LoginMicrosoft = () => {
// //   const { instance } = useMsal();
  
// // const navigate = useNavigate()
// // const handleLogin = async () => {
// //   debugger
// //   try {
// //     const response= await instance.loginRedirect(loginRequest);

// //     // const response = await instance.loginPopup(loginRequest);
// //     console.log("Login success:", response);

// //     // const accessToken = response.accessToken;
// //     const email = response.account.username;

// //  const idToken = response.idToken;

// // const userObject = {
// //   token: idToken,
// //   email: email,
// // };

// // localStorage.setItem("user", JSON.stringify(userObject));

// //     navigate("/admin/leads");

// //   } catch (error) {
// //     console.error("Microsoft login error:", error);
// //   }
// // };



// //   return (
// // <Button
// //   onClick={handleLogin}
// //   variant="outlined"
// //   startIcon={<LoginIcon />}
// //   sx={{
// //     color: "#2F6FED", // text color matching theme
// //     borderColor: "#2F6FED", // border color
// //     "&:hover": {
// //       backgroundColor: "#2F6FED",
// //       color: "#fff",
// //       borderColor: "#2F6FED",
// //     },
// //     textTransform: "none",
// //     mt: 2,
// //     width: "100%",
// //     py: 1.2,
// //     fontWeight: "bold",
// //     fontSize: "0.95rem",
// //     borderRadius: "50px", // fully rounded
// //     boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
// //   }}
// // >
// //   Login with Microsoft
// // </Button>


// //   );
// // };

// // export default LoginMicrosoft;





// import React from "react";
// import { useMsal } from "@azure/msal-react";
// import { loginRequest } from "./authConfig";
// import { Button } from "@mui/material";
// import LoginIcon from '@mui/icons-material/Login'; // alternative icon
// import { useNavigate } from "react-router-dom";

// const LoginMicrosoft = () => {
//   const { instance } = useMsal();
// const navigate = useNavigate()
// const handleLogin = async () => {
//   try {
//     const response = await instance.loginPopup(loginRequest);
//     console.log("Login success:", response);

//     const accessToken = response.idToken;
//     const email = response.account.username;

//     const userObject = {
//       token: accessToken,
//       email: email,
//     };

//     localStorage.setItem("user", JSON.stringify(userObject));

//     navigate("/admin/leads");

//   } catch (error) {
//     console.error("Microsoft login error:", error);
//   }
// };



//   return (
// <Button
//   onClick={handleLogin}
//   variant="outlined"
//   startIcon={<LoginIcon />}
//   sx={{
//     color: "#2F6FED", // text color matching theme
//     borderColor: "#2F6FED", // border color
//     "&:hover": {
//       backgroundColor: "#2F6FED",
//       color: "#fff",
//       borderColor: "#2F6FED",
//     },
//     textTransform: "none",
//     mt: 2,
//     width: "100%",
//     py: 1.2,
//     fontWeight: "bold",
//     fontSize: "0.95rem",
//     borderRadius: "50px", // fully rounded
//     boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
//   }}
// >
//   Login with Microsoft
// </Button>


//   );
// };

// export default LoginMicrosoft;






import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "./authConfig";
import { Button } from "@mui/material";
import LoginIcon from '@mui/icons-material/Login';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../context/auth.context";

const LoginMicrosoft = () => {
  const { instance } = useMsal();
  const navigate = useNavigate();
  const {login} = useAuth()

const handleLogin = async () => {
  try {
    const response = await instance.loginPopup(loginRequest);
    const idToken = response.idToken;

    const baseURI = import.meta.env.VITE_API_BASE_URL;

    // ✅ Send only the idToken in Authorization header
    const apiResponse = await axios.post(
      `${baseURI}/auth/microsoft-login`,
      {},
      {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      }
    );


    
    // ✅ Store YOUR token, not Microsoft one
    const user = {
      user: apiResponse.data.data.user,
      token: apiResponse.data.data.token,
    };
        login(user.user, user.token);


    // localStorage.setItem("user", JSON.stringify(user));
    navigate("/admin/leads");
  } catch (error) {
    console.error("❌ Microsoft login error:", error);
  }
};


  return (
    <Button
      onClick={handleLogin}
      variant="outlined"
      startIcon={<LoginIcon />}
      sx={{
        color: "#2F6FED",
        borderColor: "#2F6FED",
        "&:hover": {
          backgroundColor: "#2F6FED",
          color: "#fff",
          borderColor: "#2F6FED",
        },
        textTransform: "none",
        mt: 2,
        width: "100%",
        py: 1.2,
        fontWeight: "bold",
        fontSize: "0.95rem",
        borderRadius: "50px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      Login with Microsoft
    </Button>
  );
};

export default LoginMicrosoft;
