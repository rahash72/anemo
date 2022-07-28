import LandingPage from "./pages/LandingPage";
import JoiningPage from "./pages/JoiningPage";
import BlogPage from "./pages/BlogPage";
import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router";
import Navbar from "./components/Navbar";
import AuthContext from "./store/AuthContext";
import { Toolbar } from "@mui/material";
import ProfilePage from "./pages/ProfilePage";
import ChatPage from "./pages/ChatPage";
import FindPeoplePage from "./pages/FindPeoplePage";
import EcommercePage from "./pages/EcommercePage/";
import "./App.css";
import { Toaster } from "react-hot-toast";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <div className="padd">
        {!authCtx.isLoggedIn && (
          <Switch>
            <Route path="/" exact>
              <LandingPage />
            </Route>
            <Route path="/join" exact>
              <JoiningPage />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        )}

        {authCtx.isLoggedIn && (
          <Switch>
            <Route path="/" exact>
              <Redirect to="/blog" />
            </Route>
            <Route path="/blog" exact>
              <BlogPage />
            </Route>
            <Route path="/profile" exact>
              <ProfilePage />
            </Route>
            <Route path="/chat" exact>
              <ChatPage />
            </Route>
            <Route path="/findpeople" exact>
              <FindPeoplePage />
            </Route>
            <Route path="/ecommerce" exact>
              <EcommercePage />
            </Route>
            <Route path="*">
              <Redirect to="/blog" />
            </Route>
          </Switch>
        )}
      </div>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
