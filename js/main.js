document.getElementById("current-date").innerHTML = getArabicDate();

getSelectedCity();
getPrayerTimes("Damascus");

function getArabicDate() {
  let hijri = new Intl.DateTimeFormat('ar-SA', { day: 'numeric', month: 'long', weekday: 'long', year: 'numeric' }).format(Date.now());
  let milady = new Intl.DateTimeFormat('ar-SY', { day: 'numeric', month: 'long', year: 'numeric' }).format(Date.now());
  let fullDate = `${hijri} - ${milady} م`
  return fullDate;
}

function getSelectedCity() {
  let city = document.getElementById("cities");
  let cityValue = "";
  city.addEventListener("change", () => {
    cityValue = city.value;
    let theText = city.options[city.selectedIndex].text;
    document.getElementById("city-title").innerHTML = theText;
    getPrayerTimes(cityValue);
  })
}


function getPrayerTimes(city) {
  let value = "";
  axios.get(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=Syria&method=4`)
    .then(function (response) {
      // handle success
      console.log(response.data['data']['timings']);
      value = response.data['data']['timings'];
      document.getElementById("fjr").innerHTML = value.Fajr;
      document.getElementById("Sunrise").innerHTML = value.Sunrise;
      document.getElementById("Dhuhr").innerHTML = value.Dhuhr;
      document.getElementById("Asr").innerHTML = value.Asr;
      document.getElementById("Sunset").innerHTML = value.Sunset;
      document.getElementById("Isha").innerHTML = value.Isha;

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    })
    .finally(function () {
      // always executed
    });

}
