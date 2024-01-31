import { useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import { useUIContext } from "./store/context";
import {
  AuthPage,
  WallPage,
  SettingsPage,
  UsersListPage,
  MapPage,
} from "./pages";
import { Modal, LoadingPageSpinner } from "./components/UI";
import { MainContainer } from "./layout/MainContainer";
import { useCurrentUser } from "./api/hooks/useCurrentUser";

function App() {
  const { modal, setModal } = useUIContext();
  const { currentUser, isLoading } = useCurrentUser();

  useEffect(() => {
    const timeoutId = setTimeout(() => setModal(null), 3000);

    return () => clearTimeout(timeoutId);
  }, [modal, setModal]);

  const subRoutes = [
    { path: "/", component: <WallPage />, sidebarType: "menu" },
    { path: "/users", component: <UsersListPage />, sidebarType: "menu" },
    { path: "/settings", component: <SettingsPage />, sidebarType: "menu" },
    { path: "/:username", component: <MapPage />, sidebarType: "user" },
  ];

  if (isLoading) return <LoadingPageSpinner />;

  return (
    <>
      <Modal modal={modal} />
      <Routes>
        <Route
          path="/login"
          element={!currentUser ? <AuthPage /> : <Navigate to="/" />}
        />
        {!currentUser ? (
          <Route path="*" element={<Navigate to="/login" />} />
        ) : (
          <>
            {subRoutes.map(({ path, sidebarType, component }) => (
              <Route
                path={path}
                element={
                  <MainContainer
                    sidebarType={sidebarType}
                    component={component}
                  />
                }
              />
            ))}
          </>
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
}

export default App;
