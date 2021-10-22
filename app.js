const appdata = {
    apikey: "4c91684c692ae435a6f296801dd01f08",
    baseUrl: "https://api.openweathermap.org/data/2.5/weather",
    units: "metric",
    unknownValue: "NA",
};

function getWeatherInformation(event) {
    event.preventDefault();
    const location = document.querySelector(".wather_app .box .wather_icon .input_group")[0].value;
   
     fetch(
        `${appdata.baseUrl}?q=${location}&units=${appdata.units}&APPID=${appdata.apikey}`
     )
         .then((response) => {
             if (response.status === 200) {
                 return response.json();
             }
             throw Error('Error fetching data.');
         })
         .then((data) => {
             updateDom(data);
            // console.log(data)
         })
         .catch((error) => {
             console.log(error);
             alert(`Error getting information ${location}`);
         })
        }

         function updateDom(data){
             const dateInformation = getCurrentDay();

             // update location i.e. city and Country
             document.querySelector('.information .weather_info .city .fa-street-view').innerHTML = `${data?.name || appdata.unknownValue}${data?.sys?.country || appdata.unknownValue}`;
 
             // update temperature
             document.querySelector('.information .weather_info .temp').innerHTML = `${data?.main?.temp || 0 }&deg;c`

             // update temperature status
            //  document.querySelector('.information .atmosphere .fa-sun'). = `${data?.weather[0].main || appdata.unknownValue}`
            

           

            const infonode = document.querySelectorAll(".info .info_one small")
              // wind
            infonode[0].innerHTML = `${data?.wind?.speed || appdata.unknownValue}&nbsp;m/s`;

            // humadity
            infonode[1].innerHTML = `${data?.main?.humidity || appdata.unknownValue}%`;
           
            // pressure
            infonode[2].innerHTML = `${data?.main?.pressure || appdata.unknownValue}&nbsp;hpa`
  
            //min temp
             infonode[3].innerHTML = `${data?.main?.temp_min || appdata.unknownValue}&deg;c`


             const infonode_one = document.querySelectorAll(".info .info_two small")
             //win direction
             infonode_one[0].innerHTML=`${data?.wind?.speed || appdata.unknownValue}&deg;`

             //visibility

             infonode_one[1].innerHTML = `${data?.visibility || appdata.unknownValue}&nbsp;mtrs;`

             //cloud
             infonode_one[2].innerHTML = `${data?.clouds?.all || appdata.unknownValue}%;`

             //max

             infonode_one[3].innerHTML = `${data?.main?.temp_max || appdata.unknownValue}&deg;c`



         }
        
    








    // get current date

    const curDate = document.getElementById('date')

    let wather_icon = document.getElementById('wather_icon')

    // check atmosphere

    const tempStatus = "{tempstatus}";
    if (tempStatus == 'Sunny') {
        wather_icon.innerHTML = '<i class="fas fa-sun"></i>';
    } else if (tempStatus == 'Clouds') {
        wather_icon.innerHTML = "<i class='fas fa-clouds' style = 'color: #f1f2f6 ;'></i>";
    }
    else if (tempStatus == 'Rainy') {
        wather_icon.innerHTML = "<i class='fas fa-rain' style = 'color: #a4b0be ;'></i>"
    }

    // get current Day 

    const getCurrentDay = () => {
        var weekday = new Array(7);
        weekday[0] = "Sunday";
        weekday[1] = "Monday";
        weekday[2] = "Tuesday";
        weekday[3] = "Wednesday";
        weekday[4] = "Thursday";
        weekday[5] = "Friday";
        weekday[6] = "Saturday";
        let currentTime = new Date();
        let day = (weekday[currentTime.getDay()]);
        return day;
    }

    //get current Time 
    const getCurrenTime = () => {
        // months
        var months = [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Aug",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ];
        var next = new Date();
        var month = months[next.getMonth()]; // start data 0 i.e. +1
        var date = next.getDate();


        var hours = next.getHours();
        var mins = next.getMinutes();

        var periods = 'AM';

        if (hours > 11) {
            periods = 'PM';
            if (hours > 12) hours -= 12;
        }
        if (mins < 10) {
            mins = '0' + mins;
        }

        return `${month}${date} | ${hours}:${mins}${periods}`;
    };
    curDate.innerHTML = getCurrenTime() + "|"; getCurrentDay();




