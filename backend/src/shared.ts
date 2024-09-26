export const enum ticketStatus {RESOLVED, PENDING};

export enum debugEnum 
{
    INVALID_CREDENTIALS,      // 0
    INVALID_INST_ID,          // 1
    INVALID_USER_ID,          // 2
    SUCCESS,                  // 3
    POWER_DOES_NOT_EXIST,     // 4
    USER_ALREADY_EXISTS,      // 5
    INVALID_TOKEN,            // 6
    INVALID_TICKET_ID,        // 7
    INVALID_TICKET_STAGE,     // 8
    COL_DOES_NOT_EXIST,       // 9
    QUIZ_ALREADY_EXISTS,      // 10
    QUIZ_DOES_NOT_EXIST,      // 11
    ASSIGNMENT_ALREADY_EXISTS,// 12
    ASSIGNMENT_DOES_NOT_EXIST,// 13
    EXAM_ALREADY_EXISTS,      // 14
    EXAM_DOES_NOT_EXIST,      // 15
    INST_ID_ALREADY_EXISTS    // 16
};

// Have to implemnt course clusters.
export enum powerType 
{
    CREATE_USER, 
    DELETE_USER, 
    CHANGE_PASSWORD, 
    EDIT_POWERS,
    VIEW_POWERS,
    ALL_COURSES_ACCESS,     // have to implement course clusters
    EDIT_ATTENDANCE, 
    ADD_QUIZ,
    ADD_EXAM,
    ADD_ASSIGNMENT,
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

Faculty / teaching staff (professors and teaching assistants) : EDIT_ATTENDANCE, EDIT_QUIZ_SCORES, EDIT_ASSIGNMENT_SCORES, EDIT_EXAM_SCORES, ADD_QUIZ, ADD_ASSIGNMENT, ADD_EXAM
Students : VIEW_ATTENDANCE, VIEW_QUIZ_SCORES, VIEW_ASSIGNMENT_SCORES, VIEW_EXAM_SCORES, RESOLVE_TICKETS
Admins : Flexible.. all staff powers + EDIT_STUDENT_COURSES, EDIT_FACULTY_COURSES, EDIT_CLUSTERS, RESOLVE_TICKETS

*/