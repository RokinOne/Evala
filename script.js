var sessionID;

function openChart (selectedChart) {
  var chartName;
  var chartValues;
  var ctx;
  var request;
  var requestString;
  var i;
  var PieChart, BarChart;

  var dataPie = [
    {
      color: "#71F200",
    },
    {
      color: "#FCA600",
    },
    {
      color: "#E50010",
    },
    {
      color: "#2C00FC",
    },
    {
      color: "#00F2D4",
    }
  ];
  var dataBar = {
    labels: [],
    datasets: [{data: []}]};

  Chart.defaults.global.scaleFontColor = "white";
  Chart.defaults.global.scaleFontSize = 15;

  switch (selectedChart) {
    case 1: chartName = "salesmandata";
            break;
    case 2: chartName = "lastyeardata";
            break;
    case 3: chartName = "topsalesorders";
            break;
    case 4: chartName = "topsalesmen";
            break;
  }

  ctx = document.getElementById("myChart"+selectedChart).getContext("2d");

  request = new XMLHttpRequest();
  request.onreadystatechange = function () {
    if ((request.readyState == 4) && (request.status == 200)) {
      chartValues = JSON.parse(request.responseText);

      switch (selectedChart) {
        case 1: for (i=0;i<5;i++) {
                  dataPie[i].value = chartValues.data[i][1];
                  dataPie[i].label = chartValues.data[i][0];
                }
                PieChart = new Chart(ctx).Pie(dataPie);
                break;
        case 2: for (i=0;i<12;i++) {
                  dataBar.labels.push(chartValues.data[i][0]);
                  dataBar.datasets[0].data.push(chartValues.data[i][1]); }
      dataBar.datasets[0].fillColor = "#00F2D4";
                BarChart = new Chart(ctx).Bar(dataBar);
                break;
        case 3: for (i=0;i<5;i++) {
                  dataBar.labels.push(chartValues.data[i].userName);
                  dataBar.datasets[0].data.push(chartValues.data[i].value); }
      dataBar.datasets[0].fillColor = "#FCA600";
                BarChart = new Chart(ctx).Bar(dataBar);
                break;
        case 4: for (i=0;i<5;i++) {
                  dataBar.labels.push(chartValues.data[i][0]);
                  dataBar.datasets[0].data.push(chartValues.data[i][1]); }
      dataBar.datasets[0].fillColor = "#E50010";
                BarChart = new Chart(ctx).Bar(dataBar);
                break;
      }
    }
  };
  requestString = "http://localhost:8080/" + chartName + "?sessionid=" + sessionID;
  request.open("GET", requestString, true);
  request.send();
}

function logout () {
  localStorage.setItem("session","");
  location = "login.html";
}

function login () {
  var username = document.getElementById("loginUsername").value;
  var password = document.getElementById("loginPassword").value;
  var request = "http://localhost:8080/login?username=" + username + "&password=" + password;
  var xmlhttp = new XMLHttpRequest();

  xmlhttp.onreadystatechange = function () {
    if ((xmlhttp.readyState == 4) && (xmlhttp.status == 200)) {
      if (JSON.parse(xmlhttp.responseText).loginSucceeded == true) {
        localStorage.setItem("session",JSON.parse(xmlhttp.responseText).sessionId);
        localStorage.setItem("username",username);
        location = "homepage.html";
      }
      else { alert("login failed"); }
    }
  };
  xmlhttp.open("GET", request, true);
  xmlhttp.send(); }

function openPopup (file) {
  window.open("file:"+file+".html","Support","width=500, height=400");
}

function init () {
  sessionID = localStorage.getItem("session");
  document.getElementById("user").innerHTML = localStorage.getItem("username");

  openChart(1);
  openChart(2);
  openChart(3);
  openChart(4);
}
