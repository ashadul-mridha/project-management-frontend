import axios from "axios";
import React, { useState, useEffect } from "react";
import useAuthHooks from '../../utils/hooks/useAuth';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import CommentCard from './CommentCard';
import CommentForm from './CommentForm';

const Comment = () => {

    const {
      taskId,
    //   setShowNotification,
    //   showNotification,
    //   setCallTask,
      callTask,
    } = useNavbarContextHooks();

    const { getToken } = useAuthHooks();
    const token = getToken();

  // comments
    const [comments , setCommnets] = useState();

  // get task current data
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/task/${taskId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCommnets(res.data.data?.comments);

    };
    fetchData();
  }, [taskId, token, callTask]);


  return (
    <>
        {
            comments?.map( (data) => (
                <CommentCard key={data.id} data={data} />
            ))
        }
        <CommentForm />
    </>
  );
};

export default Comment;