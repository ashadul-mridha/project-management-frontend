import React from "react";
import {
  MdKeyboardArrowDown,
  MdKeyboardArrowRight,
} from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./ProjectAccordian.module.css";

const AccordianTitle = () => {
  const { showProject, setShowProject } =
    useNavbarContextHooks();

  const showProjectClick = () => {
    setShowProject(!showProject);
  };

  return (
    <>
      <div className={styles.accorionTitleWrapper}>
        <div
          onClick={showProjectClick}
          className={styles.accordionTitleWrapper__text}
        >
          <div className={styles.accorionTitleWrapper__text__Collapslogo}>
            {showProject ? (
              <MdKeyboardArrowDown color="grey" size={23} />
            ) : (
              <MdKeyboardArrowRight color="grey" size={23} />
            )}
          </div>
          <div className={styles.accorionTitleWrapper__text__text}>
            <span>Projects</span>
          </div>
        </div>
        {/* <div
          onClick={() => setOpenAddProject(true)}
          className={styles.accorianTitleWrapper__addProject}
        >
          <MdAdd color="#222" size={20} />
        </div> */}
      </div>
    </>
  );
};

export default AccordianTitle;
