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
  const { getToken, getUser } = useAuthHooks();

  const { callTask } = useNavbarContextHooks();

  const token = getToken();
  const { userRole } = getUser();

  let { id } = useParams();
  const [projectDetailsData, setProjectDetailsData] = useState([]);

    const url =
      userRole === "admin"
        ? `${process.env.REACT_APP_API_KEY}/project/slug/${id}`
        : `${process.env.REACT_APP_API_KEY}/user/project/${id}`;

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get(
        url,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
        
        setProjectDetailsData(res.data.data);
      

    };
    fetchData();
  }, [id, token, callTask, url, userRole]);

  let status;

  if (userRole === "admin") {
    status = projectDetailsData;
  } else {
    if(projectDetailsData?.projects?.length > 0){
      status = projectDetailsData.projects[0]
    }
  }

  
    // const status =
    //   userRole === "admin" ? projectDetailsData : projectDetailsData.project?.[0];


  // console.log("slug", projectDetailsData);

  return (
    <Box>
      <ViewHeader data={projectDetailsData} />
      <Box className={styles.projectDetailsWrapper}>
        <Box sx={{ display: "flex" }}>
          {status?.projectStatuses?.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
