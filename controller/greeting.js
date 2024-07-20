const welcomingText = document.getElementById("onLive");
const name = "Ali";
const nowEgypt = new Date().toLocaleString("en-US", { timeZone: "Africa/Cairo" });
const hourEgypt = new Date(nowEgypt).getHours();

let realDayTime;
if (hourEgypt >= 5 && hourEgypt < 12) {
    realDayTime = "صباح الخير";
} else if (hourEgypt >= 12 && hourEgypt < 18) {
    realDayTime = "مساء الخير";
} else {
    realDayTime = "ليلتك سعيدة";
}

function realTimeMsg() {
    if (welcomingText) {
        welcomingText.innerText = `${realDayTime} يا ${name}`;
    } else {
        welcomingText.innerText = `اهلاً بيك من تاني يا ${name}`;
    }
}

realTimeMsg();