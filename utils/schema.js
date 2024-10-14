import { boolean, json, pgTable, serial, text, varchar, integer } from "drizzle-orm/pg-core";

export const MockInterview=pgTable('mockInterview',{
    id:serial('id').primaryKey(),
    jsonMockResp:text('jsonMockResp').notNull(),
    jobPosition:varchar('jobPosition').notNull(),
    jobDesc:varchar('jobDesc').notNull(),
    jobExperience:varchar('jobExperience').notNull(),
    createdBy:varchar('createdBy').notNull(),
    createdAt:varchar('createdAt'),    
    mockId:varchar('mockId').notNull()
})


export const UserAnswer=pgTable('userAnswer',{

    id:serial('id').primaryKey(),
    mockIdRef: varchar('mockId').notNull(),
    question:varchar('question').notNull(),
    correctAns:text('correctAns'),
    userAns:text('userAns'),
    feedback:text('feedback'),
    rating:varchar('rating'),
    userEmail:varchar('userEmail'),
    createdAt:varchar('createdAt'),
})



export const CourseList=pgTable('CourseList',{
    id:serial('id').primaryKey(),
    courseId:varchar('courseId').notNull(),
    courseName:varchar('courseName').notNull(),
    category:varchar('category').notNull(),
    level:varchar('level').notNull(),
    includeVideo:varchar('includeVideo').notNull().default('Yes'),
    duration:varchar('duration').notNull(),
    NoOfChapters:varchar('NoOfChapters').notNull(),
    courseOutput:json('courseOutput').notNull(),
    createdBy:varchar('createdBy').notNull(),
    userName:varchar('Username'),
    userProfileImage:varchar('userProfileImage'),
    courseBanner:varchar("courseBanner")
    .default('/placeholder.svg'),
    publish:boolean('publish').default(false)
})




export const Chapters = pgTable('chapters', {
    id: serial('id').primaryKey(),
    courseId: varchar('courseId').notNull(), 
    chapterId: integer('chapterId').notNull(),
    content: json('content').notNull(),
    videoId: varchar('videoId').notNull(),
});
