import { Avatar, IconButton, makeStyles } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import "./Sidebar.css";
import SearchIcon from "@material-ui/icons/Search"
import { RateReviewOutlined } from '@material-ui/icons';
import SidebarChat from './SidebarChat';
import { useSelector } from 'react-redux';
import { selectUser } from './features/userSlice';
import db,{auth} from "./features/firebase";

const useStyles = makeStyles({
    root: {
        "&:hover": {

            borderRadius: '20%'
        }
    }
});
const Sidebar = () => {
    const classes = useStyles();
    const user = useSelector(selectUser);
    const [chats, setChats] = useState([]);
    useEffect(() => {
        db.collection("chats")

            .onSnapshot((snapshot) => {
                setChats(
                    snapshot.docs.map((doc) => ({
                        id: doc.id,
                        data: doc.data(),
                    })

                    )
                )
            })
    }, [])
    const addChat = () => {

        const chatName = prompt("Please enter a chat name");
        if (chatName) {
            db.collection("chats").add({
                chatName: chatName,
            });
        }
    }
    return (
        <div className="sidebar" >
            <div className="sidebarChat">
                <div className="iconBar">
                    <IconButton className={classes.root}>
                        <Avatar onClick={()=>auth.signOut()} src={user.photo} className="iconSize" fontSize="large" />
                    </IconButton>
                </div>
                <div className="sidebarChat__info">
                    <h3>{user.displayName}</h3>
                </div>
            </div>
            <div className="sidebarChat" onClick={addChat}>
                <div className="iconBar"  >
                    <IconButton className={classes.root}>
                        <RateReviewOutlined className="iconSize" fontSize="large" />
                    </IconButton>
                </div>
                <div className="sidebarChat__info" >
                    <h3>Start new Chat</h3>
                </div>
            </div>
            <div className="sidebar__chats">
                {chats.map(({ id, data: { chatName } }) => (
                    <SidebarChat key={id} id={id} chatName={chatName} />
                ))};




            </div>

        </div>

    );
};

// const Sidebar = () => {
//     const user= useSelector(selectUser);
//     const[chats,setChats]=useState([]);

//     useEffect(()=>{
// db.collection("chats").onSnapshot((snapshot)=>
// setChats(
//     snapshot.docs.map((doc)=>({
//         id:doc.id,
//         data:doc.data(),
//     }))
// )
// );
//     },[])
//     const addChat=()=>{
//         const chatName=prompt("please enter a chat name");

//         if(chatName){
//             db.collection("chats").add({
//                 chatName:chatName,
//             });
//         }
//     };
//     return (
//         <div className="sidebar">
//             <div className="sidebar__header">
//                 <Avatar  onClick={()=>auth.signOut()} src={user.photo} className="sidebar__avatar"></Avatar>
//                 <div className="sidebar__input">
//                     <SearchIcon />
//                     <input placeholder="Search" />
//                 </div>
//                 <IconButton variant="outlined" className="sidebar__inputButton">
//                     <RateReviewOutlined onClick={addChat} />
//                 </IconButton>
//             </div>
//             <div className="siderbar__chats">
//                 {chats.map(({id,data:{chatName}})=>(
//                  <SidebarChat key={id} id={id} chatName={chatName}></SidebarChat>
//                 ))}
//             </div>
//         </div>
//     );
// };

export default Sidebar;