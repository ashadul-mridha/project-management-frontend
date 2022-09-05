/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import styles from "./ProjectAccordian.module.css";
// import { project } from "../../i18n/ProjectData";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import { getData } from "../../api/axios";


const AllProject = () => {

  const {callProject} = useNavbarContextHooks();

  const [data , setData] = useState();

  //active class style
  let activeStyle = {
    backgroundColor: "#EEEEEE"
  };

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      const res = await getData(`${process.env.REACT_APP_API_KEY}/project`);
      setData(res.data.data);
    };
    fetchData();
  }, [callProject]);
  
  return (
    <>
      <ul className={styles.allProject}>
        {data?.map((data, index) => (
          <li className={styles.allProject__item} key={index}>
            <NavLink
              to={`/project/${data?.id}`}
              style={({ isActive }) => (isActive ? activeStyle : undefined)}
            >
              <div className={styles.allProject__item__imgWithTitle}>
                <div className={styles.allProject__item__imgWithTitle__img}>
                  <img
                    src={`${process.env.REACT_APP_URL}/images/uploads/project/${data?.image}`}
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
            </NavLink>
          </li>
        ))}
      </ul>
    </>
  );
};

export default AllProject;
