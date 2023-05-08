
let class_apis = [];
// get the object created from all course parser
const obj = require('./allCourseParser');
let section_array = [];
let activity_id;
let meeting_time
let meeting_days;
let building;
let room;

// add any course id to get use api
let api_string = 'https://course-app-api.planning.sis.uw.edu/api/courses/CSE%20121/details?courseId='
const headers = ["Activity ID", "Meeting Time", "Meeting Days", "Building", "Room"];
section_array.push(headers);


let api_count = 0;
// gets the list of course ids
while (obj.classes[api_count] !== undefined) {
    let result = api_string.concat(obj.classes[api_count].courseId);
    class_apis.push(result);
    api_count++;
}

// gets the data for all sections of all classes
async function getData() {
    try {
        for (let i = 0; i < class_apis.length; i++) {
            let count = 0;
            let specData = await fetchData(class_apis[i]);
            while (specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count] !== undefined) {
                activity_id = specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count].activityId;
                meeting_days = specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count].meetingDetailsList[0].days;
                meeting_time = specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count].meetingDetailsList[0].time;
                building = specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count].meetingDetailsList[0].building;
                room = specData.courseOfferingInstitutionList[0].courseOfferingTermList[0].activityOfferingItemList[count].meetingDetailsList[0].room;
                const newRow = [activity_id, meeting_time, meeting_days, building, room];
                section_array.push(newRow);
                count++;
            }
        }
        saveCSV();
    } catch (error) {
        console.log(error);
    }
}

getData();

// function to fetch data from each api
async function fetchData(result) {
    try {
        const response = await fetch(result);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// converts the array to CSV format
function arrayToCSV(data) {
    return data.map(row =>
        row
            .map(String)
            .map(v => v.replaceAll('"', '""'))
            .map (v => `"${v}"`)
            .join(',')
    ).join('\r\n');
}

// saves the CSV
function saveCSV() {
    let csv = arrayToCSV(section_array);
    const fs = require('fs');
    fs.writeFile('sections.csv', csv, err => {
        if (err) {
            console.error(err);
        }
    });
}