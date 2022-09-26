import React from 'react';
import styles from "./Meeting.module.css";
import { NavLink } from 'react-router-dom';


//active class style
  let activeStyle = {
    backgroundColor: "#EEEEEE"
  };

const MeetingButton = ({data}) => {
    
    return (
      <>
        <li className={styles.allMeeting}>
          <NavLink
            to={data?.link}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div className={styles.allMeeting__imgWithTitle}>
              <div className={styles.allMeeting__imgWithTitle__img}>
                {data?.icon}
              </div>
              <p>{data?.name}</p>
            </div>
            <div className={styles.allMeeting__notification}>
              {/* <span>{data?.message}</span> */}
            </div>
            {/* <div className={styles.allMeeting__notification__delete}>
                  <MdDeleteOutlind color="red" size={23} />
                </div> */}
          </NavLink>
        </li>
      </>
    );
};

export default MeetingButton;