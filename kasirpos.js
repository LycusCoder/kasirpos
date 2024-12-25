document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("salesChart").getContext("2d");
  const salesChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: ["January", "February", "March", "April", "May", "June", "July"],
      datasets: [
        {
          label: "Penjualan",
          data: [65, 59, 80, 81, 56, 55, 40],
          borderColor: "rgba(75, 192, 192, 1)",
          borderWidth: 1,
          fill: false,
        },
      ],
    },
    options: {
      responsive: true,
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: "Bulan",
          },
        },
        y: {
          display: true,
          title: {
            display: true,
            text: "Jumlah Penjualan",
          },
        },
      },
    },
  });

  document
    .getElementById("sales-metrics")
    .addEventListener("change", function () {
      salesChart.data.datasets[0].hidden = !this.checked;
      salesChart.update();
    });

  document
    .getElementById("best-selling-products")
    .addEventListener("change", function () {
      if (this.checked) {
        salesChart.data.datasets.push({
          label: "Produk Terlaris",
          data: [28, 48, 40, 19, 86, 27, 90],
          borderColor: "rgba(255, 99, 132, 1)",
          borderWidth: 1,
          fill: false,
        });
      } else {
        salesChart.data.datasets = salesChart.data.datasets.filter(
          (dataset) => dataset.label !== "Produk Terlaris"
        );
      }
      salesChart.update();
    });

  document
    .getElementById("financial-graph")
    .addEventListener("change", function () {
      if (this.checked) {
        salesChart.data.datasets.push({
          label: "Keuangan",
          data: [18, 48, 77, 9, 100, 27, 40],
          borderColor: "rgba(54, 162, 235, 1)",
          borderWidth: 1,
          fill: false,
        });
      } else {
        salesChart.data.datasets = salesChart.data.datasets.filter(
          (dataset) => dataset.label !== "Keuangan"
        );
      }
      salesChart.update();
    });

  document.getElementById("dark-mode").addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("bg-gray-900", "text-white");
      document.body.classList.remove("bg-gray-100", "text-black");
      document.getElementById("light-mode").checked = false;
    }
  });

  document.getElementById("light-mode").addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("bg-gray-100", "text-black");
      document.body.classList.remove("bg-gray-900", "text-white");
      document.getElementById("dark-mode").checked = false;
    }
  });

  document
    .getElementById("green-theme")
    .addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("bg-green-100", "text-green-900");
        document.body.classList.remove(
          "bg-blue-100",
          "text-blue-900",
          "bg-orange-100",
          "text-orange-900"
        );
      }
    });

  document.getElementById("blue-theme").addEventListener("change", function () {
    if (this.checked) {
      document.body.classList.add("bg-blue-100", "text-blue-900");
      document.body.classList.remove(
        "bg-green-100",
        "text-green-900",
        "bg-orange-100",
        "text-orange-900"
      );
    }
  });

  document
    .getElementById("orange-theme")
    .addEventListener("change", function () {
      if (this.checked) {
        document.body.classList.add("bg-orange-100", "text-orange-900");
        document.body.classList.remove(
          "bg-green-100",
          "text-green-900",
          "bg-blue-100",
          "text-blue-900"
        );
      }
    });

  function updateDateTime() {
    const now = new Date();
    const date = now.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const time = now.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
    document.getElementById("date").textContent = date;
    document.getElementById("time").textContent = time;
  }

  function updateTime() {
    const currentTimeElement = document.getElementById("currentTime");
    const currentDateElement = document.getElementById("currentDate");
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, "0");
    const minutes = now.getMinutes().toString().padStart(2, "0");
    const seconds = now.getSeconds().toString().padStart(2, "0");
    const day = now.getDate().toString().padStart(2, "0");
    const month = (now.getMonth() + 1).toString().padStart(2, "0");
    const year = now.getFullYear();
    currentTimeElement.textContent = `${hours}:${minutes}:${seconds}`;
    currentDateElement.textContent = `${day}/${month}/${year}`;
  }

  function updateBoth() {
    updateDateTime();
    updateTime();
  }

  setInterval(updateBoth, 1000);
  updateBoth(); // Memanggil fungsi sekali sebelum interval dimulai

  async function updateWeather() {
    try {
      const response = await fetch(
        "https://api.openweathermap.org/data/2.5/weather?q=Jakarta&units=metric&appid=75599254b67859c2e3290546497db598"
      );
      const data = await response.json();
      document.getElementById("weather").textContent = `${data.main.temp}°C`;
    } catch (error) {
      document.getElementById("weather").textContent = "Error loading weather";
    }
  }

  updateWeather();
  setInterval(updateWeather, 60000); // Update weather every 60 seconds

  function navbarDropdown(id) {
    const dropdowns = document.getElementsByClassName("konten-dropdown");
    for (let i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].id !== id) {
        dropdowns[i].style.display = "none";
      }
    }
    const dropdown = document.getElementById(id);
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }

  function showContent(contentId) {
    const content = document.getElementById("content");
    content.innerHTML = document.getElementById(contentId).innerHTML;
  }

  function toggleDropdown(dropdownId) {
    const dropdown = document.getElementById(dropdownId);
    dropdown.style.display =
      dropdown.style.display === "block" ? "none" : "block";
  }

  function toggleChatbot() {
    const chatbotWindow = document.getElementById("chatbotWindow");
    chatbotWindow.classList.toggle("hidden");
  }

  // Close dropdowns if clicked outside
  window.onclick = function (event) {
    if (!event.target.matches(".cursor-pointer")) {
      const dropdowns = document.getElementsByClassName("dropdown-content");
      for (let i = 0; i < dropdowns.length; i++) {
        const openDropdown = dropdowns[i];
        if (openDropdown.style.display === "block") {
          openDropdown.style.display = "none";
        }
      }
    }
  };
});
