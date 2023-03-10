const myForm = document.getElementById("myForm");
const myData = document.getElementById("animal");
const retData = document.getElementById("retData");
const newFragment = document.createDocumentFragment();
const contDiv = document.getElementById("contDiv");

myForm.onsubmit = (event) => {
  postAnimal();
  getAnimal().then((data) => {
    updateUi(data);
  });
};

const postAnimal = async (
  url = "http://localhost:8000/post",
  data = { animal: myData.value }
) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

const getAnimal = async (url = "http://localhost:8000/get") => {
  const response = await fetch(url);
  try {
    const allData = await response.json();
    console.log(allData);
    return allData;
  } catch (error) {
    console.log("error", error);
  }
};

const updateUi = async (data) => {
  data.forEach((element) => {
    const newCard = document.createElement("div");
    newCard.setAttribute("class", "col-md-4 mt-3 col-xs-12 gx-3 cardDiv");
    newCard.innerHTML = `
                     <div class="card w-100" style="width:12rem;">
                     <img src = "https://thumbs.dreamstime.com/z/road-dark-forest-magic-33128118.jpg" class="card-img-top" alt="...">
                     <div class="card-body">
                         <h2 class="card-title">Favorite Animal</h2>
                         <h3 id="retData"class="text-primary">${element.animal}</h3>
                     </div>
                 </div>
                     `;
    console.log(newCard);
    newFragment.appendChild(newCard);
  });
  contDiv.appendChild(newFragment);
};

getAnimal().then((data) => {
  updateUi(data);
});
