import React from "react";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import AccordianTitle from "./AccordianTitle";
import AllProject from "./AllProject";
import styles from "./ProjectAccordian.module.css";

const ProjectAccordion = () => {
  const { showProject } =
    useNavbarContextHooks();


  return (
    <>
      <div className={styles.accordionWrapper}>
        <AccordianTitle />
        {showProject && <AllProject />}
      </div>
    </>
  );
};

export default ProjectAccordion;
