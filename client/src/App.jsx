import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import DoctorRegister from "./pages/DoctorRegister.jsx";
import Navbar from "./components/Navbar.jsx";
import Home from "./pages/Home.jsx";
 const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Navbar />,
      children: [
        {
          index: true,
          element: <Home />,
        },
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
      ],
    },
  ]);

  return<>
   <RouterProvider router={router} />
  </>
};
export default App;
