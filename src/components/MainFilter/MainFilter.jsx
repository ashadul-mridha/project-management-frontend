/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React from "react";
import { MdOutlineInbox } from "react-icons/md";
import styles from "./mainFilter.module.css";
import { navbar } from "../../i18n/NavbarData.js";

const MainFilter = () => {
  return (
    <>
      <ul className={styles.mainFilters}>
        {navbar.map((data, index) => (
          <li className={styles.mainFilters__item} key={index}>
            <a href="#">
              <div className={styles.mainFilters__item__iconWithTitle}>
                {data.icon && data.icon}
                <p>{data?.name}</p>
              </div>
              <div className={styles.mainFilters__item__notification}>
                <span>{data?.message}</span>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </>
  );
};

export default MainFilter;
