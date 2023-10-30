
  export function generateRandomStudent() {
    const names = [
      "John",
      "Jane",
      "Robert",
      "Emily",
      "Michael",
      "Olivia",
      "David",
      "Sophia",
      "William",
      "Ava",
    ];
    const majors = [
      "Mathematics",
      "History",
      "Physics",
      "Biology",
      "Computer Science",
      "Psychology",
      "Chemistry",
    ];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomMajor = majors[Math.floor(Math.random() * majors.length)];
    const randomAttendance = Math.floor(Math.random() * 20); 

    return {
      id: `${Math.random()}`,
      name: randomName,
      major: randomMajor,
      attendance: randomAttendance,
    };
  }