import React from "react";
import styled from "styled-components";
import { Avatar } from "@material-ui/core";
import AccessTimeIcon from "@material-ui/icons/AccessTime";
import SearchIcon from "@material-ui/icons/Search";
import HelpOutlineIcon from "@material-ui/icons/HelpOutline";
import { auth } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function Header() {
   const [user] = useAuthState(auth);

   return (
      <HeaderContainer>
         <HeaderLeft>
            <HeaderAvatar onClick={() => auth.signOut()} src={user?.photoURL} alt={user?.displayName} />
            <AccessTimeIcon />
         </HeaderLeft>

         <HeaderCenter>
            <SearchIcon />
            <input placeholder="Search chat" />
         </HeaderCenter>

         <HeaderRight>
            <HelpOutlineIcon />
         </HeaderRight>
      </HeaderContainer>
   );
}

export default Header;

const HeaderContainer = styled.div`
   position: fixed;
   display: flex;
   align-items: center;
   justify-content: space-between;
   width: 100%;
   padding: 10px 0;
   color: #fff;
   background-color: var(--slack-color);
`;

const HeaderLeft = styled.div`
   display: flex;
   flex: 0.3;
   align-items: center;
   margin-left: 20px;

   > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 30px;
   }
`;

const HeaderAvatar = styled(Avatar)`
   cursor: pointer;

   :hover {
      opacity: 0.8;
   }
`;

const HeaderCenter = styled.div`
   display: flex;
   flex: 0.4;
   align-items: center;
   justify-content: center;
   padding: 0 50px;
   background-color: #421f44;
   border-radius: 5px;
   color: gray;
   border: 1px solid gray;

   > input {
      background-color: transparent;
      border: none;
      outline: none;
      color: #fff;
      text-align: center;
      min-width: 30vw;
   }
`;

const HeaderRight = styled.div`
   display: flex;
   flex: 0.3;

   > .MuiSvgIcon-root {
      margin-left: auto;
      margin-right: 20px;
   }
`;
