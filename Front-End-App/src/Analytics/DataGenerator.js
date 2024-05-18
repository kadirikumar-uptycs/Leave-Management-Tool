export default function generateRandomAttendanceData() {
    const data = [];
    const today = new Date();
  
    for (let i = 0; i < 365; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);

      let randomNumber = Math.random();
      let attendancePercentage;
      if(randomNumber <= 0.05){
        attendancePercentage = 95;
      }else if(randomNumber > 0.05 && randomNumber <= 0.1){
        attendancePercentage = 96;
      }else if(randomNumber > 0.1 && randomNumber <= 0.2){
        attendancePercentage = 97;
      }else if(randomNumber > 0.2 && randomNumber <= 0.3){
        attendancePercentage = 98;
      }else if(randomNumber > 0.3 && randomNumber <= 0.45){
        attendancePercentage = 99;
      }else{
        attendancePercentage = 100;
      }
      data.push({
        date: date.toISOString().split('T')[0],
        value: attendancePercentage
      });
    }
  
    return data.reverse(); // Reverse to make sure the data is in chronological order
  };