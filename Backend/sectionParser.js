
let class_apis = []
// get the object created from all course parser
const obj = require('./allCourseParser')
let section_array = []
let activity_id
let meeting_time
let meeting_days
let building
let room
let quarter
let course_id

// add any course id to get use api
let api_string = 'https://course-app-api.planning.sis.uw.edu/api/courses/CSE%20121/details?courseId='
// column names for our csv file
const headers = ["activity_id", "course_id", "quarter", "building", "room", "meeting_days", "meeting_times"]
section_array.push(headers)


let api_count = 0
// gets the list of course ids
while (obj.classes[api_count] !== undefined) {
    let result = api_string.concat(obj.classes[api_count].courseId)
    class_apis.push(result)
    api_count++
}

// gets the data for all sections of all classes
async function getData() {
    try {
        for (let i = 0; i < class_apis.length; i++) {
            let count = 0
            let count2 = 1
            // retrieve data for each class
            let specData = await fetchData(class_apis[i])
            // outer while loop is for if the class is offered for more than one quarter. will loop through all quarters
            console.log(class_apis[i])
            if (specData.courseOfferingInstitutionList[0] !== undefined) {
                while (specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2] !== undefined) {
                    // loops through all the section offerings. A, AA ,AB, etc.
                    while (specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count] !== undefined) {
                        quarter = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].term
                        if (quarter === 'Autumn 2023') {
                            quarter = "AU 23"
                        } else if (quarter === 'Summer 2023') {
                            quarter = "SU 23"
                        }
                        // formats the class title to "CSE NUM" format
                        activity_id = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count].activityId
                        activity_id = activity_id.substring(7)
                        activity_id = activity_id.replace(':', ' ')
                        activity_id = activity_id.replace(':', ' ')
                        activity_id = activity_id.replace(' ', '')
                        meeting_days = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count].meetingDetailsList[0].days
                        meeting_time = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count].meetingDetailsList[0].time
                        building = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count].meetingDetailsList[0].building
                        room = specData.courseOfferingInstitutionList[0].courseOfferingTermList[count2].activityOfferingItemList[count].meetingDetailsList[0].room
                        course_id = obj.classes[i].courseId
                        const newRow = [activity_id, course_id, quarter, building, room, meeting_days, meeting_time]
                        // adds a new row to the csv
                        section_array.push(newRow)
                        count++
                    }
                    count2--
                }
            }
        }
        saveCSV()
    } catch (error) {
        console.log(error)
    }
}

getData()

// function to fetch data from each api
async function fetchData(result) {
    try {
        const response = await fetch(result)
        return await response.json()
    } catch (error) {
        console.log(error)
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
    ).join('\r\n')
}

// saves the CSV
function saveCSV() {
    let csv = arrayToCSV(section_array)
    const fs = require('fs')
    fs.writeFile('./data/sections.csv', csv, err => {
        if (err) {
            console.error(err)
        }
    })
}