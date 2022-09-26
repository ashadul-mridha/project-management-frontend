/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
import React, { useEffect } from "react";
import styles from "./ProjectAccordian.module.css";
// import { project } from "../../i18n/ProjectData";
import { MdDeleteOutline } from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import useAuthHooks from "../../utils/hooks/useAuth";
import axios from "axios";

//active class style
  let activeStyle = {
    backgroundColor: "#EEEEEE"
  };


const AllProject = () => {


  const [data, setData] = useState();
  const {callProject} = useNavbarContextHooks();
  const { getUser, getToken } = useAuthHooks();

  // get login user role
  const { userRole } = getUser();
  const token = getToken();

  const url =
    userRole === "admin"
      ? `${process.env.REACT_APP_API_KEY}/project`
      : `${process.env.REACT_APP_API_KEY}/user/project`;

  // get all project
  useEffect(() => {
    const fetchData = async () => {
      // console.log('user', userid);
      const res = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (userRole === "admin") {
        setData(res.data.data);
      } else {
        setData(res.data.data.projects);
      }
    };
    fetchData();
  }, [callProject]);

  console.log('projectData',data)
  
  return (
    <>
      <ul className={styles.allProject}>
        {data?.map((data, index) => (
          <li className={styles.allProject__item} key={index}>
            <NavLink
              to={`/project/${data?.slug}`}
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
