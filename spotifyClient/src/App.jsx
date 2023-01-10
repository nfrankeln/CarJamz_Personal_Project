import {createBrowserRouter,Route, createRoutesFromElements, RouterProvider} from "react-router-dom";
import HomePage from "./pages/HomePage";
import './index.css'
import LoginPage from "./pages/LoginPage";
import NavBar from "./components/NavBar";

function App() {
const router =createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<NavBar/>}>
        <Route index element={<HomePage/>}></Route>
        <Route path="/login" element={<LoginPage/>}></Route>
      </Route>
      )
)
  return (
      <RouterProvider router={router}/>
  )
}

export default App
