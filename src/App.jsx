import Header from "./commponets/header"
import Footer from "./commponets/footer"
import About from "./pages/about"
import Home from "./pages/home"
import { Route, Routes } from "react-router-dom";
import SignIn from "./pages/signIn"
import SignUp from "./pages/signUp"
import CreateCard from "./pages/createCard"
import LogOut from "./pages/logOut"
import MyCards from "./pages/myCard";
import CardDelete from "./pages/delteCard";
import EditCard from "./pages/editCard";


import "./App.css";



function App() {

  return <>

    <div className="app min-vh-100 d-flex flex-column gap-2" >
      <Header />
      <main className="flex-fill">
        <Routes>
          <Route path="/home" element={<Home />} />

          <Route path="/about" element={<About />} />

          <Route
            path="/my-card"
            element={
              <MyCards />
            } />

          <Route
            path="/create-card"
            element={<CreateCard />} />

          <Route
            path="my-card/delete/:id"
            element={<CardDelete />}
          />
          <Route
            path="my-card/edit/:id"
            element={<EditCard />}
          />
          {/*  <Route
            path="/favorite-cards"
            element={<FavoriteCards />}
          /> */}
          {/*  <Route
            path="home/info/:id"
            element={<ProtfolioCard />}
          /> */}

          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/log-out" element={<LogOut />} redirect="/home" />
        </Routes>

      </main>

      <Footer />
    </div >

  </>
}

export default App
