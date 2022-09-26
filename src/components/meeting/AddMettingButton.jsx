/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { MdAdd } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./Meeting.module.css";


const AddMeetingButton = () => {

    const data = {
      name: "Add Meeting",
      message: 12,
      icon: <MdAdd size={22} color={"#246fe0"} />,
    };

    const { setOpenAddMeeting } = useNavbarContextHooks();

    const handleMeetingClick = () => {
        setOpenAddMeeting(true);
    }

  return (
    <>
      <li className={styles.allMeeting}>
        <a onClick={handleMeetingClick}>
          <div className={styles.allMeeting__imgWithTitle}>
            <div className={styles.allMeeting__imgWithTitle__img}>
              {data.icon}
            </div>
            <p>{data.name}</p>
          </div>
          <div className={styles.allMeeting__notification}>
            {/* <span>{data?.message}</span> */}
          </div>
          {/* <div className={styles.allMeeting__notification__delete}>
                  <MdDeleteOutlind color="red" size={23} />
                </div> */}
        </a>
      </li>
    </>
  );
};

export default AddMeetingButton;
