/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { MdAdd } from "react-icons/md";
import useNavbarContextHooks from "../../utils/hooks/useNavbarContext";
import styles from "./Booking.module.css";

const AddBookingButton = () => {
  const data = {
    name: "Add Booking",
    message: 12,
    icon: <MdAdd size={22} color={"#246fe0"} />,
  };

  const { setOpenAddBooking } = useNavbarContextHooks();

  const handleBookingClick = () => {
    setOpenAddBooking(true);
  };

  return (
    <>
      <li className={styles.allBooking}>
        <a onClick={handleBookingClick}>
          <div className={styles.allBooking__imgWithTitle}>
            <div className={styles.allBooking__imgWithTitle__img}>
              {data.icon}
            </div>
            <p>{data.name}</p>
          </div>
          <div className={styles.allBooking__notification}>
            {/* <span>{data?.message}</span> */}
          </div>
          {/* <div className={styles.allBooking__notification__delete}>
                  <MdDeleteOutlind color="red" size={23} />
                </div> */}
        </a>
      </li>
    </>
  );
};

export default AddBookingButton;
