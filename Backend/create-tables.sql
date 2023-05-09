CREATE TABLE Courses (
    course_id varchar(100),
    quarter varchar (6),
    id varchar(20),
    instructor varchar(100),
    class_title varchar(100),
    course_number varchar (10),
    --capacity int,
    prerequisite varchar(300),
    credits varchar(5),
    level int,
    --building varchar(3),
    --room varchar(10),
    meeting_days varchar(10),
    meeting_times varchar(40),
    --meeting_end int,
    --est_enroll_status varchar(100),
    --available int,
    gen_ed_req varchar (100),
    PRIMARY KEY(course_id, quarter)
);

CREATE TABLE Sections (
    activity_id varchar(10),  -- CSE121 AA, CSE121 AC, etc.
    course_id varchar(100) REFERENCES Courses(course_id),
    quarter varchar(6) REFERENCES Courses(quarter),
    PRIMARY KEY(activity_id, course_id, quarter),
    building varchar(3),
    room varchar(10),
    meeting_days varchar(10),
    meeting_times varchar(20),

);

CREATE TABLE Users (
    email varchar(100) PRIMARY KEY,
    username varchar(100),
    major varchar(100),
    standing varchar(20), --freshman, sophomore, etc.
    password varbinary(144)
);

CREATE TABLE HaveTaken (
    email varchar(100) REFERENCES Users,
    course_id varchar(100) REFERENCES Courses(course_id)
);

CREATE TABLE PlanningToTake (
    email varchar(100) REFERENCES Users,
    course_id varchar(100) REFERENCES Courses(course_id),
    quarter varchar(6) REFERENCES Courses(quarter),
    section_code varchar(5) REFERENCES Sections(activity_id)
);

CREATE TABLE Reviews (
    course_id varchar(100) REFERENCES Courses(course_id),
    username varchar(100),
    rating int,
    review varchar(1000)
);