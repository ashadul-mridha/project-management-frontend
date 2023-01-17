import React from 'react';
import styles from "./Booking.module.css";
import { NavLink } from 'react-router-dom';


//active class style
  let activeStyle = {
    backgroundColor: "#EEEEEE"
  };

const BookingButton = ({data}) => {
    
    return (
      <>
        <li className={styles.allBooking}>
          <NavLink
            to={data?.link}
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            <div className={styles.allBooking__imgWithTitle}>
              <div className={styles.allBooking__imgWithTitle__img}>
                {data?.icon}
              </div>
              <p>{data?.name}</p>
            </div>
            <div className={styles.allBooking__notification}>
              {/* <span>{data?.message}</span> */}
            </div>
            {/* <div className={styles.allBooking__notification__delete}>
                  <MdDeleteOutlind color="red" size={23} />
                </div> */}
          </NavLink>
        </li>
      </>
    );
};

export default BookingButton;