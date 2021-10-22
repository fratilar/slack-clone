import { Button } from "@material-ui/core";
import React from "react";
import { useRef } from "react";
import styled from "styled-components";
import { db } from "../firebase";
import firebase from "firebase";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function ChatInput({ channelName, channelID, chatRef }) {
   const inputRef = useRef(null);
   const [user] = useAuthState(auth);

   const sendMessage = (e) => {
      e.preventDefault();

      if (!channelID) {
         return false;
      }

      db.collection("channels").doc(channelID).collection("messages").add({
         message: inputRef.current.value,
         timestamp: firebase.firestore.FieldValue.serverTimestamp(),
         user: user?.displayName,
         userImage: user?.photoURL,
      });

      chatRef.current.scrollIntoView({
         behavior: "smooth",
      });

      inputRef.current.value = null;
   };

   return (
      <ChatInputContainer>
         <form>
            <input placeholder={`Message #${channelName}`} ref={inputRef} />
            <Button hidden type="submit" onClick={sendMessage}>
               SEND
            </Button>
         </form>
      </ChatInputContainer>
   );
}

export default ChatInput;

const ChatInputContainer = styled.div`
   > form {
      display: flex;
      justify-content: center;
   }

   > form > input {
      position: fixed;
      bottom: 30px;
      width: 60%;
      border: 1px solid gray;
      border-radius: 3px;
      padding: 20px;
      outline: none;
   }

   > form > button {
      display: none;
   }
`;
