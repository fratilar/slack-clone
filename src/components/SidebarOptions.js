import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { enterChannel } from "../features/appSlice";
import { db } from "../firebase";

function SidebarOptions({ Icon, title, addChannelOption, id }) {
   const dispatch = useDispatch();

   const addChannel = () => {
      const channelName = prompt("Please enter channel name!");

      if (channelName) {
         db.collection("channels").add({
            name: channelName,
         });
      }
   };

   const selectChannel = () => {
      if (id) {
         dispatch(
            enterChannel({
               channelID: id,
            })
         );
      }
   };

   return (
      <SidebarOptionsContainer onClick={addChannelOption ? addChannel : selectChannel}>
         {Icon && <Icon fontSize="small" style={{ padding: "10px" }} />}

         {Icon ? (
            <h3>{title}</h3>
         ) : (
            <SidebarOptionsChannel>
               <span>#</span>
               {title}
            </SidebarOptionsChannel>
         )}
      </SidebarOptionsContainer>
   );
}

export default SidebarOptions;

const SidebarOptionsContainer = styled.div`
   display: flex;
   align-items: center;
   padding-left: 2px;
   font-size: 12px;
   cursor: pointer;

   :hover {
      opacity: 0.9;
      background-color: #340e36;
   }

   > h3 {
      font-weight: 500;
   }
`;

const SidebarOptionsChannel = styled.div`
   padding: 10px 15px;
   font-size: 14px;
   font-weight: 500;

   > span {
      padding-right: 7px;
   }
`;
