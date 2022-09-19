import { Box, Typography } from '@mui/material';
import React from 'react';
import { MdOutlineDelete } from 'react-icons/md';
import { deleteById } from '../../api/axios';
import useNavbarContextHooks from '../../utils/hooks/useNavbarContext';
import styles from './taskImage.module.css';

const TaskImage = ({data}) => {

    const { setCallTask } = useNavbarContextHooks();

    const handleImageDelete = async (id) => {
        const url = `${process.env.REACT_APP_API_KEY}/task/image/${id}`;
        const res = await deleteById(url);
        // console.log(res);
        if (res.data.status) {
            setCallTask( (prevState) => !prevState)
        }
    }
    return (
      <Box className={styles.taskImageContainer}>
        <Box className={styles.taskImage}>
          <img
            src={`http://localhost:5000/images/uploads/task/${data?.image}`}
            alt="task"
          />
        </Box>
        <Box className={styles.taskImageInfo}>
          <Typography
            sx={{ fontSize: "12px", fontWeight: 400, textAlign: "center" }}
            variant="h6"
            color="#222222"
          >
            {data?.image.slice(0, 12)}
          </Typography>
          <Typography
            sx={{ fontSize: "12px", fontWeight: 500, textAlign: "center" }}
            variant="h6"
            color="#bdbcbc"
          >
            {data?.createdAt.substring(0, 10)}
          </Typography>
        </Box>
        <Box className={styles.taskImageAction}>
          <MdOutlineDelete
            onClick={() => handleImageDelete(data?.id)}
            color="red"
            size={15}
          />
        </Box>
      </Box>
    );
};

export default TaskImage;