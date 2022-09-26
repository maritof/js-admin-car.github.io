const url = "https://car-backend-simple.herokuapp.com/v1";
const updEndp = {
  update: false,
  id: null,
};

function getInput(e) {
  e.preventDefault();
  let car = {
    name: e.target.name.value,
    category: e.target.category.value,
    capacity: e.target.capacity.value,
    luggage: e.target.luggage.value,
    air_conditioning: true,
    transmission: e.target.transmission.value,
    mileage: e.target.mileage.value,
  };
  if (updEndp.update == true) {
    car.id = updEndp.id;
    updateData(car, car.id);
  } else {
    createData(car);
  }
}

async function createData(car) {
  const resp = await fetch(url + /cars/, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  window.location.href = "index.html";
}

async function getCar(url, id) {
  const resp = await fetch(url + /cars/ + id + "/", {
    method: "GET",
  });
  const car = await resp.json();
  return car;
}

async function updateData(car, id) {
  const resp = await fetch(url + /cars/ + id + "/", {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(car),
  });
  window.location.href = "index.html";
}

async function getParamsUrl() {
  const querystring = window.location.search;
  const params = new URLSearchParams(querystring);
  const id = params.get("car");
  if (id != null) {
    const car = await getCar(url, id);
    setData(car);
    updEndp.update = true;
    updEndp.id = id;
  }
}

function setData(car) {
  document.getElementById("input_name").setAttribute("value", car.name);
  document.getElementById("input_category").setAttribute("value", car.category);
  document.getElementById("input_capacity").setAttribute("value", car.capacity);
  document.getElementById("input_luggage").setAttribute("value", car.luggage);
  document.getElementById("input_transmission").setAttribute("value", car.transmission);
  document.getElementById("input_mileage").setAttribute("value", car.mileage);
}

getParamsUrl();
