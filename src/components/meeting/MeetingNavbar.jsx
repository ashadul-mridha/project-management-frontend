import React from 'react';
import styles from "./Meeting.module.css";
import {navbar} from "../../i18n/MeetingNavbar";
import MeetingButton from './MeetingButton';
import AddMeetingButton from './AddMettingButton';


const MeetingNavbar = () => {

    

    return (
      <>
        <ul className={styles.allProject}>
          <AddMeetingButton />
          {navbar?.map((data, index) => (
            <MeetingButton data={data} key={data.name} />
          ))}
        </ul>
      </>
    );
};

export default MeetingNavbar;