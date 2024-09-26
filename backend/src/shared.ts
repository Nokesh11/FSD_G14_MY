export const enum ticketStatus {RESOLVED, PENDING};

export enum debugEnum 
{
    INVALID_CREDENTIALS, 
    INVALID_INST_ID, 
    INVALID_USER_ID, 
    SUCCESS, 
    POWER_DOES_NOT_EXIST,
    USER_ALREADY_EXISTS,
    INVALID_TOKEN,
    INVALID_TICKET_ID,
    INVALID_TICKET_STAGE,
    COL_DOES_NOT_EXIST,
    QUIZ_ALREADY_EXISTS,
    QUIZ_DOES_NOT_EXIST,
    ASSIGNMENT_ALREADY_EXISTS,
    ASSIGNMENT_DOES_NOT_EXIST,
    EXAM_ALREADY_EXISTS,
    EXAM_DOES_NOT_EXIST,
    INST_ID_ALREADY_EXISTS
};

// Have to implemnt course clusters.
export enum powerType 
{
    CREATE_USER, 
    DELETE_USER, 
    CHANGE_PASSWORD, 
    EDIT_POWERS,
    ALL_COURSES_ACCESS,     // have to implement course clusters
    EDIT_ATTENDANCE, 
    VIEW_ATTENDANCE,
    EDIT_QUIZ_SCORES,
    EDIT_ASSIGNMENT_SCORES,
    EDIT_EXAM_SCORES,
    EDIT_CLUSTERS,
    EDIT_STUDENT_COURSES,
    EDIT_FACULTY_COURSES,
};
export const student_type = "student";
export const admin_type = "admin";


/* Generally 

Faculty / teaching staff (professors and teaching assistants) : EDIT_ATTENDANCE, EDIT_QUIZ_SCORES, EDIT_ASSIGNMENT_SCORES, EDIT_EXAM_SCORES, 
Students : VIEW_ATTENDANCE, VIEW_QUIZ_SCORES, VIEW_ASSIGNMENT_SCORES, VIEW_EXAM_SCORES, RESOLVE_TICKETS
Admins : Flexible.. all staff powers + EDIT_STUDENT_COURSES, EDIT_FACULTY_COURSES, EDIT_CLUSTERS, RESOLVE_TICKETS

*/