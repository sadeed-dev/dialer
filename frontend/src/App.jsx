// import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import LoginPage from "./pages/auth/LoginPage";
// import AdminNavbar from "./components/layout/AdminNavbar";
// import Dashboard from './pages/admin/dashboard/Dashboard'
// import Leads from './pages/admin/leads/Leads'
// import { AuthProvider } from "./context/auth.context";
// import React, { Suspense, lazy } from 'react';
// import { Toaster } from 'sonner';
// import UserPage from "./components/admin/user/UserPage";

// export default function App() {
//   return (
//     <AuthProvider>
//         <Suspense fallback={<div>Loading...</div>}>
//               <Toaster position="top-center" richColors  />
//       <BrowserRouter>
//         <Routes>
//         <Route path="/" element={<Navigate to="/login" />} />
//         <Route path="/login" element={< LoginPage/>} />

//           <Route path="/admin" element={<AdminNavbar />}>
//             <Route path="dashboard" element={<Dashboard />} />
//             <Route path="leads" element={<Leads />} />
//                         <Route path="users" element={<UserPage />} />

//             {/* add other admin routes here */}
//           </Route>

//           {/* default route or 404 */}
//         </Routes>
//       </BrowserRouter>
//       </Suspense>
//     </AuthProvider>
//   );
// }


import React, { Suspense } from "react";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/auth.context";
import { Toaster } from "sonner";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}>
        <Toaster position="top-center" richColors />
        <AuthProvider>
          <AppRoutes />
        </AuthProvider>
      </Suspense>

    </BrowserRouter>
  );
}
