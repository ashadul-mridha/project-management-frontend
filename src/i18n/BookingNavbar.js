import {  MdCalendarViewMonth, MdEventAvailable } from "react-icons/md";

export const navbar = [
    { name: 'All Booking', link: '/booking/all', message : 13, icon: <MdCalendarViewMonth size={22} color={'#058527'} />},
    { name: 'View Booking', link: '/booking/view', message : 0, icon: <MdEventAvailable size={22} color={'#DB4C3F'} />},
]