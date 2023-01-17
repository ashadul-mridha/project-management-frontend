import React from "react";
import { navbar } from "../../i18n/BookingNavbar";
import AddBookingButton from "./AddBookingButton";
import styles from "./Booking.module.css";
import BookingButton from "./BookingButton";

const BookingNavbar = () => {
  return (
    <>
      <ul className={styles.allProject}>
        <AddBookingButton />
        {navbar?.map((data, index) => (
          <BookingButton data={data} key={data.name} />
        ))}
      </ul>
    </>
  );
};

export default BookingNavbar;
