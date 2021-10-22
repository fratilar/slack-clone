import React, { useEffect } from "react";
import styled from "styled-components";
import StarBorderOutlinedIcon from "@material-ui/icons/StarBorderOutlined";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import ChatInput from "./ChatInput";
import { useSelector } from "react-redux";
import { selectChannelID } from "../features/appSlice";
import { useCollection, useDocument } from "react-firebase-hooks/firestore";
import { db } from "../firebase";
import Message from "./Message";
import { useRef } from "react";

function Chat() {
   const channelID = useSelector(selectChannelID);
   const [channelDetails] = useDocument(channelID && db.collection("channels").doc(channelID));
   const [channelMessages, loading] = useCollection(
      channelID && db.collection("channels").doc(channelID).collection("messages").orderBy("timestamp", "asc")
   );

   const chatRef = useRef(null);

   useEffect(() => {
      chatRef?.current?.scrollIntoView({
         behavior: "smooth",
      });
   }, [channelID, loading]);

   return (
      <ChatContainer>
         {channelDetails && channelMessages && (
            <>
               <Header>
                  <HeaderLeft>
                     <h4>
                        <strong>#{channelDetails?.data().name}</strong>
                     </h4>
                     <StarBorderOutlinedIcon />
                  </HeaderLeft>

                  <HeaderRight>
                     <p>
                        <InfoOutlinedIcon /> Details
                     </p>
                  </HeaderRight>
               </Header>

               <ChatMessages>
                  {channelMessages?.docs.map((doc) => {
                     // const { message, timestamp, user, userImage } = doc.data();

                     return <Message key={doc.id} {...doc.data()} />;
                  })}
                  <ChatBottom ref={chatRef}></ChatBottom>
               </ChatMessages>

               <ChatInput channelName={channelDetails?.data().name} channelID={channelID} chatRef={chatRef} />
            </>
         )}
      </ChatContainer>
   );
}

export default Chat;

const ChatContainer = styled.div`
   flex: 0.6;
   flex-grow: 1;
   margin-top: 60px;
`;

const Header = styled.div`
   display: flex;
   justify-content: space-between;
   padding: 20px;
   border-bottom: 1px solid lightgray;
`;
const HeaderLeft = styled.div`
   display: flex;
   align-items: center;

   > h4 {
      text-transform: lowercase;
      font-size: 14px;
   }

   .MuiSvgIcon-root {
      margin-left: 5px;
      font-size: 18px;
   }
`;
const HeaderRight = styled.div`
   > p {
      display: flex;
      align-items: center;
      font-size: 14px;
   }
   > p > .MuiSvgIcon-root {
      margin-right: 5px;
      font-size: 16px;
   }
`;

const ChatMessages = styled.div``;

const ChatBottom = styled.div`
   padding-bottom: 200px;
`;
