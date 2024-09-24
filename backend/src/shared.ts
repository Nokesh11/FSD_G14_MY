export const enum userType {STUDENT, ADMIN};
export const enum ticketStatus {RESOLVED, PENDING};
export enum debugEnum 
{
    INVALID_CREDENTIALS, 
    INVALID_USER_TYPE, 
    INVALID_INST_ID, 
    INVALID_USER_ID, 
    SUCCESS, 
    POWER_DOES_NOT_EXIST,
    USER_ALREADY_EXISTS,
    INVALID_TOKEN
};
export enum powerType 
{
    CREATE_USER, 
    DELETE_USER, 
    CHANGE_PASSWORD, 
    EDIT_POWERS, 
    EDIT_ATTENDANCE, 
    VIEW_ATTENDANCE,
    EDIT_QUIZ_SCORES,
    EDIT_ASSIGNMENT_SCORES,
    EDIT_EXAM_SCORES,
    EDIT_CLUSTERS
};
