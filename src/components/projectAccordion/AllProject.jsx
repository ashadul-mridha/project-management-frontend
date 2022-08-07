/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import styles from "./ProjectAccordian.module.css";
import { project } from "../../i18n/ProjectData";
import { MdDeleteOutline } from "react-icons/md";


const AllProject = () => {
  return (
    <>
      <ul className={styles.allProject}>
        {project.map((data, index) => (
          <li className={styles.allProject__item} key={index}>
            <a href="#">
              <div className={styles.allProject__item__imgWithTitle}>
                <div className={styles.allProject__item__imgWithTitle__img}>
                  <img
                    src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8dXNlcnxlbnwwfHwwfHw%3D&w=1000&q=80"
                    alt="bg"
                  />
                </div>
                <p>{data?.name}</p>
              </div>
              <div className={styles.allProject__item__notification}>
                <span>{data?.message}</span>
              </div>
              <div className={styles.allProject__item__notification__delete}>
                <MdDeleteOutline color="red" size={23} />
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllProject;
