import { Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useAuthHooks from "../../utils/hooks/useAuth";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import ViewHeader from "../ViewHeader";
import styles from "./project.module.css";
import ProjectCard from "./ProjectCard";

const ProjectDetails = () => {

  const { getToken } = useAuthHooks();

  const { callTask } = useNavbarContextHooks();

  const getTokenStr = getToken();
  const token = getTokenStr || "klsdfklsd232";

  let { id } = useParams();
  const [projectDetailsData , setProjectDetailsData] = useState([]);
  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API_KEY}/project/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(res.data.data);
      setProjectDetailsData(res.data.data);
    };
    fetchData();
  }, [id, token, callTask]);

  
  return (
    <Box>
      <ViewHeader data={projectDetailsData} />
      <Box className={styles.projectDetailsWrapper}>
        <Box sx={{ display: "flex" }}>
          {projectDetailsData?.projectStatuses?.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
