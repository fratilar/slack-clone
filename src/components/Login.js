import { Button } from "@material-ui/core";
import React from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

function Login() {
   const signIn = () => {
      auth.signInWithPopup(provider).catch((error) => alert(error.message));
   };

   return (
      <LoginContainer>
         <LoginItems>
            <img src="https://freepngimg.com/download/chat/12-2-chat-png.png" alt="" />
            <h1>Sign into CHAT APP</h1>
            <p>razvan.chat.com</p>
            <Button onClick={signIn}>Sign In with Google</Button>
         </LoginItems>
      </LoginContainer>
   );
}

export default Login;

const LoginContainer = styled.div`
   display: flex;
   align-items: center;
   justify-content: center;
   width: 100%;
   height: 100vh;
   background-color: #eee;
`;

const LoginItems = styled.div`
   width: 90%;
   max-width: 550px;
   background-color: #fff;
   padding: 80px 0;
   text-align: center;
   box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2);
   border-radius: 10px;

   > img {
      height: 150px;
      margin-bottom: 20px;
   }

   > button {
      background-color: #3aa3e4;
      text-transform: inherit;
      margin-top: 40px;
      color: #fff;
      font-weight: 600;
      padding: 10px 20px;

      :hover {
         background-color: #3aa3e4;
         opacity: 0.9;
      }
   }
`;
