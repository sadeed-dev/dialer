// import React, { createContext, useContext, useEffect, useState } from "react";
// import { jwtDecode } from "jwt-decode";
// import { useNavigate } from "react-router-dom";

// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//   const [user, setUser] = useState(null);

//  const logout = () => {
//     setUser(null);
//     localStorage.removeItem("user");
//     // navigate("/login"); // 👈 use passed-in navigate
//   }

//   const login = (userData, token) => {
//     const fullUser = { user: userData, token };
//     localStorage.setItem("user", JSON.stringify(fullUser));
//     setUser(fullUser);
//   };

//   useEffect(() => {
//     debugger
//     const stored = JSON.parse(localStorage.getItem("user"));

//     if (stored?.token) {
//       try {
//         const decoded = jwtDecode(stored.token);
//         const now = Date.now();

//         if (decoded.exp * 1000 < now) {
//           logout(); // expired
//         } else {
//           setUser(stored);

//           const timeout = setTimeout(() => {
//             logout();
//           }, decoded.exp * 1000 - now);

//           return () => clearTimeout(timeout);
//         }
//       } catch (err) {
//         logout(); // invalid token
//       }
//     }
//   }, []);

//   return (
//     <AuthContext.Provider value={{ user, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = () => useContext(AuthContext);



import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const logout = () => {

    setUser(null);
    localStorage.removeItem("user");
  };

  const login = (userData, token) => {
    const fullUser = { user: userData, token };
    localStorage.setItem("user", JSON.stringify(fullUser));
    setUser(fullUser);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user")); // contains both user and token
       if(user){
        setUser(user)
       }
  },[])

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
