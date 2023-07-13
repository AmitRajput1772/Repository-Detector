const searchArea = document.querySelector("[searchArea]");
const searchButton = document.querySelector("[searchButton]");
const root = document.documentElement.style;
const userImage = document.querySelector("[userImage]");
const uName = document.querySelector("[fullName]");
const userName = document.querySelector("[userName]");
const uDate = document.querySelector("[date]");
const uDesc = document.querySelector("[Desc]");
const noResult = document.querySelector("[noResults]");
const uRepository = document.querySelector("[repository]");
const uFollowers = document.querySelector("[followersNum]");
const uFollowing = document.querySelector("[followingNum]");
const uLocation = document.querySelector("[location]");
const uWebsite = document.querySelector("[website]");
const uTwitter = document.querySelector("[twitter]");
const uCompany = document.querySelector("[company]");
const url = "https://api.github.com/users/";
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const moonDay = document.querySelector("[moonDay]");
const modeText =document.querySelector("[dark]");
const modeIcon = document.querySelector("[moon]");
let darkMode = false;
noResult.style.display = "none";

// event listener

searchArea.addEventListener("keydown", function(e) {
    if(e.key=="Enter") {
        if(searchArea.value!=""){
            getUserData(url + searchArea.value);
        }
    }
});

searchArea.addEventListener("input",function() {
    noResult.style.display = "none";
});

moonDay.addEventListener("click", function () {
    if (darkMode == false) {
      darkModeProperties();
    } else {
      lightModeProperties();
    }
});

searchButton.addEventListener("click",function () {
    if(searchArea.value !== ""){
        getUserData(url +searchArea.value);
    }
});



// functions

function getUserData(giturl) {
    fetch(giturl)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            updateProfile(data);
        });
}


function updateProfile(data) {
    if(data.message !== "Not Found") {
        datesegments = data.created_at.split("T").shift().split("-");
        console.log(datesegments);
        uDate.innerText=`Joined ${datesegments[2]} ${months[(datesegments[1])-1]} ${datesegments[0]}`
        // uDate.innerText =`${data.created_at}`;
        // uDate.innerText= `${datesegments}`;
        userImage.src = `${data.avatar_url}`;
        uName.innerText =data.name==null ? data.login : `${data.name}`;
        userName.innerText =`@${data.login}`;
        userName.href = `${data.html_url}`;
        uRepository.innerText =`${data.public_repos}`;
        uFollowers.innerText = `${data.followers}`;
        uFollowing.innerText =`${data.following}`;
        uLocation.innerText =data.location == null ? "Not Available" :`${data.location}`;
        uDesc.innerText = data.bio == null ? "This profile has no bio" : `${data.bio}`;
        uWebsite.innerText = data.blog == "" ? "Not Available" : `${data.blog}`;
        uWebsite.href=data.blog == "" ? "#" : data.blog;
        uTwitter.innerText = data.twitter_username == null ?"Not Available" : `${data.twitter_username}`;
        uTwitter.href =data.twitter_username != null ? `https://twitter.com/${data.twitter_username}` : "#";
        uCompany.innerText = data.company ==null ? "Not available " : `${data.company}`;
    }
    else{
        noResult.style.display = "block";
    }

}

getUserData(url +"AmitRajput1772");

function darkModeProperties() {
    root.setProperty("--lm-bg", "#141D2F");
    root.setProperty("--lm-bg-content", "#1E2A47");
    root.setProperty("--lm-text", "white");
    root.setProperty("--lm-text-alt", "white");
    root.setProperty("--lm-shadow-xl", "rgba(70,88,109,0.15)");
    modeText.innerText = "LIGHT";
    modeIcon.src = "./images/sun-icon.svg";
    root.setProperty("--lm-icon-bg", "brightness(1000%)");
    darkMode = true;
}

function lightModeProperties() {
    root.setProperty("--lm-bg","#f6f8ff");
    root.setProperty("--lm-bg-content","#fefefe");
    root.setProperty("--lm-text","#4b6a9b");
    root.setProperty("--lm-text-alt"," #2b3442");
    root.setProperty("--lm-shadow","0px 0px 30px -10px rgba(70, 96, 187, 0.2)");
    root.setProperty("--lm-shadow-inactive","0px 16px 30px -10px rgba(0, 0, 0, 0.2)");
    root.setProperty("--lm-icon-bg","brightness(100%)");
    root.setProperty("--btn"," #0079ff");
    root.setProperty("--btn-hover","#60abff");
    modeText.innerText = "Dark";
    modeIcon.src = "./images/moon-icon.svg";
    darkMode = false;
}

