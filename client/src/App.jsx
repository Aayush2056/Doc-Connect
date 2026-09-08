import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DoctorRegister from "./Doctor/DoctorRegister.jsx";
import Doctors from "./pages/Doctors.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
import DoctorHome from "./Doctor/DoctorHome.jsx";
import DoctorNavbar from "./Doctor/DoctorNavbar.jsx";

const App = () => {
  const router = createBrowserRouter([
    // ================= USER HOME =================
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
          {
          path: "/list",
          element: <Doctors />,
        },
      ],
    },

    // ================= AUTH PAGES =================
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/doctor-register",
      element: <DoctorRegister />,
    },

    // ================= DOCTOR =================
    {
      path: "/doctor",
      element: <DoctorNavbar />,
      children: [
        {
          index: true,
          element: <DoctorHome />,
        },
       
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default App;