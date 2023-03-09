import { useEffect, useState } from "react";
// import Map from "./components/Map/Map";
// import Login from "./components/Authentication/Login";
// import Logout from "./components/Authentication/Logout";
import { useAuthContext, useDataContext, useUIContext } from "./store/context";
import styled from "styled-components";
import {
  // BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import UserProfile from "./components/Content/User/UserProfile";
import Dashboard from "./components/Content/Dashboard/Dashboard";
import UsersList from "./components/Content/User/UsersList";
import MainContainer from "./components/MainContainer/MainContainer";
import Signup from "./components/Authentication/Signup";
import Sidebar from "./components/Sidebar/Sidebar";
import Content from "./components/Content/Content";
import Map from "./components/Content/User/Map/Map";
import Header from "./components/Content/Header/Header";
import Settings from "./components/Content/Settings/Settings";
import fetchAPI from "./utils/fetchAPI";
import Modal from "./components/UI/Modal";
import LoadingSpinner from "./components/UI/LoadingSpinner";
import InitialPage from "./components/Authentication/InitialPage";

function App() {
  const [loading, setLoading] = useState(true);

  const { currentUser, setCurrentUser } = useAuthContext();
  const { modal, setModal } = useUIContext();
  const { reloadData } = useDataContext();

  useEffect(() => {
    const timeoutId = setTimeout(() => setModal(null), 3000);

    return () => clearTimeout(timeoutId);
  }, [modal, setModal]);

  useEffect(() => {
    // Check if user is logged in
    (async () => {
      const { ok, data } = await fetchAPI("api/v1/users/refresh");

      if (ok && data?.user) {
        setCurrentUser(data.user);
        await reloadData();
      }

      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      if (currentUser) await reloadData();
    })();
  }, [currentUser]);

  return (
    <>
      <Modal modal={modal} />
      {loading && <LoadingSpinner />}
      {!loading && (
        // <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={currentUser ? <Navigate to="/" /> : <InitialPage />}
          />
          <Route
            path="/signup"
            element={currentUser ? <Navigate to="/" /> : <Signup />}
          />
          <Route
            path="/"
            element={currentUser ? <MainContainer /> : <Navigate to="/login" />}
          >
            <Route
              index
              element={
                <>
                  <Sidebar type="menu" />
                  <Content>
                    <Header />
                    <Dashboard />
                  </Content>
                </>
              }
            />
            <Route
              path="/users"
              element={
                <>
                  <Sidebar type="menu" />
                  <Content>
                    <Header />
                    <UsersList />
                  </Content>
                </>
              }
            />
            <Route
              path="/settings"
              element={
                <>
                  <Sidebar type="menu" />
                  <Content>
                    <Header />
                    <Settings />
                  </Content>
                </>
              }
            />
            <Route
              path="/:username"
              element={
                <>
                  <Sidebar type="user" />
                  <Content>
                    <Header />
                    <Map />
                  </Content>
                </>
              }
            />
          </Route>
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
        // </BrowserRouter>
      )}
    </>
  );
}

export default App;
