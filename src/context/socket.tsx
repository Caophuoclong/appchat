import React from "react";
import { io, Socket } from "socket.io-client";
import {SOCKET_HOST} from "../configs/"
import { useAppDispatch, useAppSelector } from "../hook";
import { handleSetSocketId } from "../reducers/globalSlice";
import IMessage from "../interface/IMessage"
import { handleSetOnline, handleUpdateTemp, refreshConversations, refreshFriendsAll, refreshNoti, updateLatestMessage, updateUnReadMessasges } from "../reducers/userSlice";
import { addNewMessage } from "../reducers/message";
export const SocketContext= React.createContext<Socket>({} as Socket);
const Provider = (props: {children: JSX.Element})=>{
    
    const [socket, setSocket] = React.useState<Socket>({}as Socket);
    const user = useAppSelector(state => state.user);
    const dispatch = useAppDispatch();
    React.useEffect(()=>{
        const socket = io(SOCKET_HOST!,{
            "transports" : ["websocket"]
        });
        setSocket(socket);
        socket.on("new_connection",(data=>{
            dispatch(handleSetSocketId(data));
        }))
        socket.on("re_check_online", (data)=>{
            dispatch(handleSetOnline(data));
        })
        socket.on("rep_live_noti",()=>{
            dispatch(refreshNoti()); 
            dispatch(refreshFriendsAll());
        })
        socket.on("rep_accept_friend", ()=>{
            dispatch(refreshNoti());
            dispatch(refreshConversations());
            dispatch(refreshFriendsAll());
        })
        socket.on("check_online", ()=>{

        })
    
},[])
    React.useEffect(()=>{
        if(typeof socket.on === "function")
        socket.on("receive_message",(data: string)=>{
            const {conversationId, message} = JSON.parse(data) as {
                conversationId: string,
                message: IMessage
            }
            dispatch(updateLatestMessage({
                message,
                conversationId
            }))
            dispatch(updateUnReadMessasges({conversationId, message}));
            dispatch(addNewMessage({message, conversationId}));
            dispatch(handleUpdateTemp(conversationId));
        });
},[socket])
    

    return(
        <SocketContext.Provider value={socket} >
        {
            props.children
        }
        </SocketContext.Provider>
    )
}
export default Provider;