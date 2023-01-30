import "./App.css";
import Input from "./Components/components/Input";
import NavBar from "./Components/components/NavBar";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import EmailForm from "./Components/screens/EmailForm";

const App = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <NavBar />
          <Input />
        </>
      ),
    },
    {
      path: "/email_form",
      element: (
        <>
          <NavBar />
          <EmailForm />
        </>
      ),
    },
  ]);
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
