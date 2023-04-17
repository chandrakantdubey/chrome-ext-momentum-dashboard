async function getUnsplashImg() {
  try {
    const res = await fetch(
      "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=mountain"
    );
    const data = await res.json();
    document.body.style.backgroundImage = `url(${data.urls.regular})`;
    document.querySelector(
      ".author-name"
    ).textContent = `${data.user.first_name} ${data.user.last_name}`;
  } catch (error) {
    console.error(
      error.message.includes("undefined") ? "Enter correct url" : error.message
    );
    document.body.style.backgroundImage = `url(https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwyMTEwMjl8MHwxfHJhbmRvbXx8fHx8fHx8fDE2MjI4NDE2NzA&ixlib=rb-1.2.1&q=80&w=1080)`;
  }
}

getUnsplashImg();

async function getCryptoData() {
  try {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/dogecoin");
    const data = await res.json();

    document.querySelector("#crypto-name").textContent = `${data.name}`;
    document.getElementById("crypto-img").src = `${data.image.small}`;

    document.getElementById(
      "crypto-price-current"
    ).textContent = `Current Price : $${data.market_data.current_price.usd}`;
    document.getElementById(
      "crypto-price-high"
    ).textContent = `24 hour high : $${data.market_data.high_24h.usd}`;
    document.getElementById(
      "crypto-price-low"
    ).textContent = `24 hour low : $${data.market_data.low_24h.usd}`;
  } catch (error) {
    console.log(error);
  }
}
getCryptoData();
setInterval(() => {
  document.querySelector(
    ".time"
  ).textContent = `${new Date().toLocaleTimeString("en-in", {
    timeStyle: "medium",
  })}`;
}, 1000);

function getWeather() {
  console.log(
    navigator.geolocation.getCurrentPosition((pos) => {
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${pos.coords.latitude}&lon=${pos.coords.longitude}&units=metric&appid=7ae84cf9cefdf4b3c99a7e9d84030380`
      )
        .then((res) => {
          if (!res.ok) throw Error("Weather data not available!");
          return res.json();
        })
        .then((data) => {
          const iconUrl = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
          console.log(data);
          document.querySelector(".weather").innerHTML = `
                <img src=${iconUrl} width="60px"/>
                <p>${data.main.temp} °C</p>
                <p class="weather-city">${data.name}</p>
              `;
        })
        .catch((err) => console.log(err));
    })
  );

  //
}

getWeather();
