static async addAssignment (courseName : string, year : number, section : string, assignmentName : string, maxMarks : number, instID : string): Promise<debugEnum> 
{
    const courseID = `${courseName}-${section}-${year}`;
    const header_id = new ObjectId(COURSE_HEADER_ID);
    const res = await Central.getUser(COURSE_HEADER_ID, courseID, instID);
    
    if (res.message !== debugEnum.SUCCESS) {
        return res.message;
    }

    const headerDoc = res.user;
    const col = res.col;

    // Check if the assignment already exists
    for (let assignment of headerDoc!.assignments)
        {
            if (assignment.name === assignmentName)
            {
                return debugEnum.QUIZ_ALREADY_EXISTS;
            }
        }

    // Add the assignment to the header document
    await col!.updateOne(
        { _id: header_id },
        { $push: { assignments: { name: assignmentName, maxMarks: maxMarks } } }
    );

    // Update all other documents to add the assignment
    const docs = await col!.find().toArray();
    const updatePromises = docs
        .filter(doc => doc._id !== header_id) // Filter out the header document
        .map(doc => 
            col!.updateOne(
                { _id: doc._id }, 
                { $push: { assignments: { name: assignmentName, marks: 0 } } } // Use correct structure
            )
        );

    await Promise.all(updatePromises); // Wait for all updates to complete

    return debugEnum.SUCCESS;
}