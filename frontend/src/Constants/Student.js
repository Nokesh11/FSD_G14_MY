import {Home, Calendar, FileText, Clock, Book} from 'lucide-react';

export const student = [
    { icon: <Home />, text: "Dashboard", active: true },
    { icon: <Calendar />, text: "Attendance", active: false },
    { icon: <FileText />, text: "DocVault", active: false, alert: true },
    { icon: <Clock />, text: "TimeTable", active: false },
    { icon: <Book />, text: "Almanac", active: false },
];