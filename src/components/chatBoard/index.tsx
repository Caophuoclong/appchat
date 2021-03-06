import * as React from 'react';
import { LeftBar } from './leftBar';
import { MainChat } from './mainChat';
import { useNavigate, useParams } from 'react-router-dom';
import { getMe, handleChooseFriend, setLoading, turnOffLoading } from '../../reducers/userSlice';
import { setConversationChoosen } from '../../reducers/globalSlice';
import { useAppDispatch, useAppSelector } from '../../hook';
import { unwrapResult } from '@reduxjs/toolkit';
import FullPageLoading from './FullPageLoading';
import { SocketContext } from '../../context/socket';
import IUser from '../../interface/IUser';
import { getMessages } from '../../reducers/message';

import InforConversation from './InfoConversation';
import { getConversationInfo } from '../../reducers/globalSlice';
export interface IChatProps {}

export function Chat(props: IChatProps) {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector((state) => state.user.loading);
  const socket = React.useContext(SocketContext);
  const user = useAppSelector((state) => state.user);
  const conversations = useAppSelector((state) => state.user.conversations);
  const choosenFriend = useAppSelector((state) => state.user.choosenFriend);
  const messages = useAppSelector((state) => state.messages.messagesList);
  const isShowGroupDetail = useAppSelector((state) => state.global.showGroupDetail);
  const { id } = useParams();
  React.useEffect(() => {
    user._id && id && dispatch(handleChooseFriend({ conversationId: id }));
  }, []);
  React.useEffect(() => {
    const access_token = localStorage.getItem('access_token');
    if (!access_token) {
      navigate('/sign');
    }
    const xxx = async () => {
      try {
        const actionResult = await dispatch(getMe());
        const unwrap = unwrapResult(actionResult);
        // console.log(unwrap);
        // setTimeout(() => {
        //   dispatch(turnOffLoading(false));
        // }, 500);
      } catch (error) {
        console.log(error);
      }
    };

    if (!user._id) {
      xxx();
    }
  }, []);
  React.useEffect(() => {
    if (typeof socket.emit === 'function') socket && user._id && socket.emit('init_user', user._id);
  }, [socket, user]);
  React.useEffect(() => {
    if (socket) {
      if (conversations) {
        conversations.forEach((conversation) => {
          socket.emit('join_room', conversation._id);
        });
      }
    }
  }, [socket, conversations?.length]);
  // React.useEffect(() => {
  //   dispatch(turnOffLoading(true));
  //   try {
  //     if (conversations) {
  //       conversations.map(async (conversation) => {
  //         if (conversation._id !== '') {
  //           const actionResult = await dispatch(
  //             getMessages({
  //               id: conversation._id,
  //               page: 1,
  //             })
  //           );
  //           const unwrap = unwrapResult(actionResult);
  //           console.log(unwrap);
  //         }
  //       });
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [conversations?.length]);
  React.useEffect(() => {
    (async () => {
      if (choosenFriend.conversationId) {
        dispatch(setLoading());
        const result = await dispatch(getConversationInfo({ id: choosenFriend.conversationId }));
        const unwrap = unwrapResult(result);
        if (!messages[choosenFriend.conversationId]) {
          const actionResult = await dispatch(
            getMessages({
              id: choosenFriend.conversationId,
              page: 1,
            })
          );
          const unwrap1 = unwrapResult(actionResult);
          console.log(unwrap1);
        }
        dispatch(setConversationChoosen(unwrap));
        dispatch(turnOffLoading());
      }
    })();
  }, [choosenFriend.conversationId]);
  return (
    <div className="flex h-screen min-w-full">
      {loading && <FullPageLoading className="h-screen" />}
      <LeftBar />
      <MainChat />
      {isShowGroupDetail && <InforConversation />}
    </div>
  );
}
