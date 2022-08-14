import React from 'react';
import ViewHeader from '../ViewHeader';

const ProjectDetails = () => {
    const headerData = {
      title: "Project Education",
      date: "14 Aug 2023",
    };
    return (
      <>
        <ViewHeader data={headerData} />
        <p>Project Details</p>
      </>
    );
};

export default ProjectDetails;