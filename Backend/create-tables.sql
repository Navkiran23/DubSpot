CREATE TABLE Courses (
    course_id varchar(100) PRIMARY KEY,
    id varchar(20),
    instructor varchar(100),
    class_title varchar(100),
    course_number int,
    --capacity int,
    prerequisite varchar(300),
    credits int,
    level int,
    --building varchar(3),
    --room varchar(10),
    meeting_days varchar(10),
    meeting_times int,
    --meeting_end int,
    --est_enroll_status varchar(100),
    --available int,
    gen_ed_req varchar (100)
);

CREATE TABLE Sections (
    section_code varchar(5),
    course_id varchar(100) REFERENCES Courses,
    PRIMARY KEY(section_code, course_id),
    building varchar(3),
    room varchar(10),
    meeting_days varchar(10),
    meeting_start int,
    meeting_end int
);

CREATE TABLE Users (
    email varchar(100) PRIMARY KEY,
    username varchar(100),
    major varchar(100),
    standing varchar(20), --freshman, sophomore, etc.
    Password varbinary(32)
);

CREATE TABLE HaveTaken (
    email varchar(100) REFERENCES Users,
    course_id varchar(100) REFERENCES Courses
);

CREATE TABLE PlanningToTake (
    email varchar(100) REFERENCES Users,
    course_id varchar(100) REFERENCES Courses,
    section_code varchar(5) REFERENCES Sections
);