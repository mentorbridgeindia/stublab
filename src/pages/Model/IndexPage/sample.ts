export const sample = [
  {
    name: "API 1",
    code: `
  {
    "name": string,
    "age": number,
    "isActive": boolean,
    "createdAt": string,
    "updatedAt": string,
  }
  `,
  },
  {
    name: "API 2",
    code: `
  {
    "mark": number,
    "percentage": number,
    "isPassed": boolean,
    "createdAt": string,
    "updatedAt": string,
  }
  `,
  },
  {
    name: "API 3",
    code: `
  {
    "bus": string,
    "route": {
      "name": string,
      "distance": number,
      "time": number,
      "start": {
        "latitude": number,
        "longitude": number,
      },
      "end": {
        "latitude": number,
        "longitude": number,
      },
    },
    "driver": string,
    "createdAt": string,
    "updatedAt": string,
  }
  `,
  },
  {
    name: "API 4",
    code: `
  {
    "professor": string,
    "subject": string,
    "students": string[],
    "createdAt": string,
    "updatedAt": string,
    "joinDate": string,
    "isActive": boolean,
    "isDeleted": boolean,
    "salary": number,
    "bonus": number,
    "totalSalary": number,
    "totalStudents": number,
    "totalSubjects": number,
    "totalAttendance": number,
    "totalAbsence": number,
    "totalAssignment": number,
    "totalQuiz": number,
    "totalExam": number,
    "totalProject": number,
  }
  `,
  },
];
