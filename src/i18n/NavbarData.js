import { MdOutlineInbox, MdOutlineDateRange, MdOutlineCalendarToday } from "react-icons/md";

export const navbar = [
    { name: 'All Task', link: '/', message : 12, icon: <MdOutlineInbox size={22} color={'#246fe0'}/>},
    { name: 'Today Task', link: '/today', message : 13, icon: <MdOutlineDateRange size={22} color={'#058527'} />},
    { name: 'Upcoming Task', link: '/upcomming', message : 0, icon: <MdOutlineCalendarToday size={22} color={'#692fc2'} />},
    // { name: 'Filters & Levels', icon: <MdApps size={22} color={'#eb8909'} />},
]