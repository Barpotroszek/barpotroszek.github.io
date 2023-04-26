const schedule = [
  [
    [8, 0],  [8, 45],],
  [[8, 50],  [9, 35],],
  [[9, 40],  [10, 25],],
  [[10, 30],  [11, 15],],
  [[11, 35],  [12, 20],],
  [[12, 40],  [13, 25],],
  [[13, 30],  [14, 15],],
  [[14, 20],  [15, 5],],
];


function updateTime(){
    const text = document.getElementById("time");
    const now = new Date();
    const getLessonEnd = () => {
      for (const lesson of schedule) {
        const [[bh, bm], [eh, em]] = lesson; //beginningHour, ..., endHour, endMinute
        const beginning = new Date();
        const end = new Date();
        beginning.setHours(bh, bm, 0);
        end.setHours(eh, em, 0);

        //if now is later than beginning of lesson and before of this end
        if (
          now.getTime() > beginning.getTime() &&
          now.getTime() < end.getTime()
        )
          return end;
      }
      return "Nie ma tera lekcji, ciesz się chwilą wolności :DDD";
    };

    const endLesson = getLessonEnd();
    if(typeof(endLesson)==="string"){
        text.innerText = endLesson;
        return;
    }
    const leftTime = new Date(endLesson.getTime()-now.getTime()).getTime()/1000;
    text.innerText = `Do końca lekcji (${endLesson.getHours()}:${endLesson.getMinutes()}) => 0:${Math.floor(leftTime/60)}:${Math.floor(leftTime%60)}`
}

window.onload = () => {
  updateTime()
  setInterval(updateTime, 1000)
  document.getElementById("btnMedia").onclick = startStream();
};
