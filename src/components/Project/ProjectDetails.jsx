import { Box } from "@mui/material";
import React from "react";
import ViewHeader from "../ViewHeader";
import styles from "./project.module.css";
import ProjectCard from "./ProjectCard";

const ProjectDetails = () => {
  const headerData = {
    title: "Education Details",
    date: "14 Aug 2023",
  };

  const projectDetailsData = [
    {
      statusName: "Routines",
      task: [
        {
          name: "Review Upcoming Exam Dates",
          time: "13 Aug 2022",
        },
        {
          name: "Chemistry Exam ",
          time: "17 Aug 2022",
        },
        {
          name: "English Exam",
          time: "19 Aug 2022",
        },
        {
          name: "Math Exam",
          time: "21 Aug 2022",
        },
        {
          name: "Semester Start",
          time: "1 Nov 2022",
        },
        {
          name: "Mid Exam",
          time: "21 Nov 2022",
        },
      ],
    },
    {
      statusName: "Inspirection",
      task: [
        {
          name: "Explore Google Beta",
          time: "4 Jun 2023",
        },
        {
          name: " Sundor Picai Interview ",
          time: "30 Jan 2018",
        },
        {
          name: "Hack Nasa",
          time: "23 Aug 2022",
        },
      ],
    },
    {
      statusName: "Todos",
      task: [
        {
          name: "Chemistry Explore",
          time: "12 sep 2023",
        },
        {
          name: "Chemistry Math",
          time: "25 Oct 2022",
        },
      ],
    },
    {
      statusName: "Project",
      task: [
        {
          name: "Drik Website",
          time: "15 Jan 2023",
        },
        {
          name: "KinunBd",
          time: "27 Nov 2022",
        },
      ],
    },
  ];
  return (
    <Box>
      <ViewHeader data={headerData} />
      <Box className={styles.projectDetailsWrapper}>
        <Box sx={{ display: "flex" }}>
          {projectDetailsData.map((project, index) => (
            <ProjectCard key={index} data={project} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default ProjectDetails;
