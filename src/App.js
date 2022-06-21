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
import Cart from "./pages/EcommercePage/pages/Cart";
import ServiceList from "./pages/EcommercePage/pages/ServiceList";
import ProductList from "./pages/EcommercePage/pages/ProductList";
import EcommercePage from "./pages/EcommercePage/pages/EcommercePage";
import "./App.css";
import { Toaster } from "react-hot-toast";
function App() {
  const authCtx = useContext(AuthContext);
  return (
    <>
      <Navbar />
      <main>
        <Toolbar />

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
            <Route path="/ecommerce/favourites" exact>
              <Cart />
            </Route>
            <Route path="/ecommerce/product" exact>
              <ProductList />
            </Route>
            <Route path="/ecommerce/service" exact>
              <ServiceList />
            </Route>
            <Route path="*">
              <Redirect to="/blog" />
            </Route>
          </Switch>
        )}
      </main>
      <Toaster position="top-center" />
    </>
  );
}

export default App;
