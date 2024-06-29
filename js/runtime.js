// Initialize current time
var now = new Date;

// Function to calculate and update time-related and Voyager 1 information
function createtime() {
    // Increment current time by 1 second
    now.setTime(now.getTime() + 1e3);

    // Define target dates for calculations
    var start_date = new Date("08/01/2022 00:00:00");
    var voyager_start_date = new Date("08/09/2022 00:00:00");

    // Calculate elapsed time since start_date
    var seconds_elapsed = (now - start_date) / 1000;
    var site_days = Math.floor(seconds_elapsed / (60 * 60 * 24));
    var site_hours = Math.floor(seconds_elapsed / (60 * 60)) - site_days * 24;
    var site_minutes = Math.floor(seconds_elapsed / 60) - site_days * 1440 - site_hours * 60;
    var site_seconds = Math.round(seconds_elapsed % 60);

    // Calculate Voyager 1 distance
    var voyager_seconds_elapsed = (now - voyager_start_date) / 1000;
    var voyager_distance_km = Math.trunc(234e8 + voyager_seconds_elapsed * 17);
    var voyager_distance_au = (voyager_distance_km / 1496e5).toFixed(6);

    // Determine work hours based on current hour
    var current_hour = now.getHours();
    var is_work_hours = current_hour >= 9 && current_hour < 18;

    // Choose appropriate image and message based on work hours
    var image_src = is_work_hours ?
        'https://sourcebucket.s3.ladydaily.com/badge/F小屋-科研摸鱼中.svg' :
        'https://sourcebucket.s3.ladydaily.com/badge/F小屋-下班休息啦.svg';
    var image_title = is_work_hours ?
        '什么时候能够实现财富自由呀~' :
        '下班了就该开开心心地玩耍~';

    // Construct HTML content
    var html_content = `
        <img class='boardsign' src='${image_src}' title='${image_title}'><br>
        <div style="font-size:13px; font-weight:bold">
            本站居然运行了 ${site_days} 天 ${site_hours} 小时 ${site_minutes} 分 ${site_seconds} 秒
            <i id="heartbeat" class='fas fa-heartbeat'></i><br>
            旅行者 1 号当前距离地球 ${voyager_distance_km} 千米，约为 ${voyager_distance_au} 个天文单位 🚀
        </div>`;

    // Update DOM element with id="workboard" if it exists
    if (document.getElementById("workboard")) {
        document.getElementById("workboard").innerHTML = html_content;
    }
}

// Call createtime() every 1000ms (1 second)
setInterval(() => {
    createtime();
}, 1000);
