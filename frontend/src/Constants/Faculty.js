import { Home, FileText, Clock, Book, Percent, TicketMinus } from 'lucide-react';

export const faculty = [
    { icon: <Home />, text: "Dashboard", path: "dashboard" },
    // { icon: <Calendar />, text: "Attendance", path: "attendance" },
    { icon: <TicketMinus />, text: "Pending Ticket", path: "resolve_tickets" },
    { icon: <FileText />, text: "DocVault", path: "docvault" },
    { icon: <Clock />, text: "TimeTable", path: "timetable" },
    { icon: <Book />, text: "Almanac", path: "almanac" },
    { icon: <Percent />, text: "Scores", path: "scores" },
];