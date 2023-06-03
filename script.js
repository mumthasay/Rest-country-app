const countriesEl = document.querySelector(".contries-container");
const dropDownEl = document.querySelector(".drop-down");
const dropEl = document.querySelector(".drop");
const region = document.querySelectorAll(".region");
const search = document.querySelector(".search");
const searchBox = document.querySelector(".search-box");

// function to fetch data
async function getCountry() {
  try {
    const url = await fetch("https://restcountries.com/v3.1/all");
    if (!url.ok) {
      throw new Error("Error fetching data");
    }
    const res = await url.json();
    console.log(res);

    res.forEach((data) => {
      showCountry(data);
    });
  } catch (error) {
    console.log(error);
    displayErrorMsg("Error fetching data. Please try again later");
  }
}

// Function to display error message
function displayErrorMsg(message) {
  const errorMessage = document.createElement("p");
  errorMessage.classList.add("error-message");
  errorMessage.textContent = message;
  countriesEl.innerHTML = "";
  countriesEl.appendChild(errorMessage);
}

getCountry();

// function to show all the countries as a card
function showCountry(data) {
  const country = document.createElement("div");
  country.classList.add("country");
  country.innerHTML = `<div class="country-image">
    <img src="${data.flags.png}" alt="" />
  </div>
  <div class="country-info">
    <h5 class="country-name">${data.name.common}</h5>
    <p><strong>Population:</strong> ${data.population}</p>
    <p class="region-name"><strong>Region:</strong> ${data.region}</p>
    <p><strong>Capital:</strong> ${data.capital}</p>
  </div>`;
  countriesEl.appendChild(country);
  
  country.addEventListener("click", () => {
    showCountryDetails(data);
  });
}

// toggle drop down
dropDownEl.addEventListener("click", () => {
  dropEl.classList.toggle("show-drop-down");
});

// show countries by region
const regionName = document.getElementsByClassName("region-name");
const countryName = document.getElementsByClassName("country-name");
region.forEach((element) => {
  element.addEventListener("click", () => {
    Array.from(regionName).forEach((data) => {
      if (
        data.innerText.includes(element.innerText) ||
        element.innerText == "All"
      ) {
        data.parentElement.parentElement.style.display = "grid";
      } else {
        data.parentElement.parentElement.style.display = "none";
      }
    });
  });
});

// search for a particular country
search.addEventListener("input", () => {
  Array.from(countryName).forEach((data) => {
    if (data.innerText.toLowerCase().includes(search.value.toLowerCase())) {
      data.parentElement.parentElement.style.display = "grid";
    } else {
      data.parentElement.parentElement.style.display = "none";
    }
  });
});

// show details of a specific country
const countryDetailsContainer = document.querySelector(
  ".country-details-container"
);
function showCountryDetails(data) {
  countryDetailsContainer.classList.toggle("show");
  countryDetailsContainer.innerHTML = `<button class="back">Go Back</button>
    <div class="modal">
        <div class="flag-container">
            <img src="${data.flags.png}" alt="">
        </div>
        <div class="details-modal">
            <h1>${data.name.common}</h1>
            <div class="details-box">
                <div class="detail-left details">
                    <p><strong>Official Name: </strong>${data.name.official}</p>
                    <p><strong>Population: </strong>${data.population}</p>
                    <p><strong>Region: </strong>${data.region}</p>
                    <p><strong>Sub-region: </strong>${data.subregion}</p>
                </div>
                <div class="detail-right details">
                    <p><strong>Capital: </strong>${data.capital}</p>
                    <p><strong>Top Level Domain: </strong>${data.tld[0]}</p>
                    <p><strong>Time Zone: </strong>${data.timezones[0]}</p>
                    <p><strong>Status: </strong>${data.status}</p>
                </div>
            </div>
        </div>
    </div>`;
   
//   back button
  const backBtn = countryDetailsContainer.querySelector(".back");
  backBtn.addEventListener("click", () => {
    countryDetailsContainer.classList.toggle("show");
  });
}
