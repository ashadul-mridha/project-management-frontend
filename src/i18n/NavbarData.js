import { MdOutlineInbox, MdOutlineDateRange, MdOutlineCalendarToday, MdApps } from "react-icons/md";

export const navbar = [
    { name: 'Inbox', message : 12, icon: <MdOutlineInbox size={22} color={'#246fe0'}/>},
    { name: 'Today', message : 13, icon: <MdOutlineDateRange size={22} color={'#058527'} />},
    { name: 'Upcoming', message : 0, icon: <MdOutlineCalendarToday size={22} color={'#692fc2'} />},
    { name: 'Filters & Levels', icon: <MdApps size={22} color={'#eb8909'} />},
]