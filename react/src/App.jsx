import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.css';
// Components
import {
  Layout,
  ProtectedRoute,
  Login,
  Register,
  SignUpFormTwo,
  SignUpFormThree,
  SignUpFormFour,
  Welcome
} from "./components/index.js";
// Pages
import { Orders, Upload, Products } from "./pages/index.js";
import Home from "./components/Home/Home.jsx";
import User from "./pages/Users/User.jsx";
import AddUser from "./pages/AddUser/AddUser.jsx";
import Categories from "./pages/Categories/Categories.jsx";
import AddCates from "./pages/AddCates/AddCates.jsx";
import ForgetPass from './components/ForgetPass/ForgetPass';
import ForgetPassCode from "./components/ForgetPassCode/ForgetPassCode.jsx";
import ResetPass from "./components/ResetPass/ResetPass.jsx";
////////////////////
function App() {
  const [currentForm, setCurrentForm] = useState("login");
  const toggleForm = (formName) => {
    setCurrentForm(formName);
  };

  
    const users = [
      {
        id:1,
        UserName:'Menna',
        Email:"menna@gmail.com",
        Role:"admin",
      },
      {
          id:2,
          UserName:'Mohamed',
          Email:"mohamed@gmail.com",
          Role:"pharmacy",
      },
      {
          id:3,
          UserName:'Youssef',
          Email:"youssef@gmail.com",
          Role:"company",
      },
  ]

  const [userList, setUserList] = useState([
      {
        id:1,
        UserName:'Menna',
        Email:"menna@gmail.com",
        Role:"admin",
      },
      {
          id:2,
          UserName:'Mohamed',
          Email:"mohamed@gmail.com",
          Role:"pharmacy",
      },
      {
          id:3,
          UserName:'Youssef',
          Email:"youssef@gmail.com",
          Role:"company",
      },
  ]
  );


  



  const routes = createBrowserRouter([
    { path: "/", element: <Welcome /> },
    {
      path: "/layout",
      element: (
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      ),
      children: [
        // { index: true, element: <Home /> },
        { path:'/layout',exact: true, element: <Home /> },
        { path: '/layout/product', element: <Products /> },
        { path: "/layout/orders", element: <Orders /> },
        { path: "/layout/upload", element: <Upload /> },
        { path: "/layout/users", element: <User users = {users} /> },
        { path: "/layout/adduser", element: <AddUser /> },
        { path: "/layout/cates", element: <Categories /> },
        { path: "/layout/addcate", element: <AddCates /> },
      ],
    },
    { path: "/login", element: <Login /> },
    { path: "/forgetPass", element: <ForgetPass /> },
    { path: "/forgetCode", element: <ForgetPassCode /> },
    { path: "/ResetPass", element: <ResetPass /> },

    { path: "/signup", element: <Register /> },
    { path: "/signupTwo", element: <SignUpFormTwo /> },
    { path: "/signupThree", element: <SignUpFormThree /> },
    { path: "/signupFour", element: <SignUpFormFour /> },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}

export default App;
