import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import styled from "styled-components";
import Sidebar from "./components/Sidebar";
import Chat from "./components/Chat";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase";
import Login from "./components/Login";
import Spinner from "react-spinkit";

function App() {
   const [user, loading] = useAuthState(auth);

   if (loading) {
      return (
         <LoadingContainer>
            <LoadingContent>
               <h1>Loading App..</h1>
               <Spinner name="line-spin-fade-loader" color="blue" fadeIn="none" />
            </LoadingContent>
         </LoadingContainer>
      );
   }

   return (
      <div className="app">
         <Router>
            {!user ? (
               <Login />
            ) : (
               <>
                  <Header />
                  <AppBody>
                     <Sidebar />
                     <Switch>
                        <Route exact path="/">
                           <Chat />
                        </Route>
                     </Switch>
                  </AppBody>
               </>
            )}
         </Router>
      </div>
   );
}

export default App;

const AppBody = styled.div`
   display: flex;
   min-height: 100vh;
`;

const LoadingContainer = styled.div`
   display: grid;
   place-items: center;
   width: 100%;
   height: 80vh;
`;
const LoadingContent = styled.div`
   display: flex;
   flex-direction: column;
   align-items: center;

   > h1 {
      margin-bottom: 50px;
      font-size: 2.5rem;
   }
`;
