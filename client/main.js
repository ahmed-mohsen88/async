const myForm = document.getElementById("myForm");
const myData = document.getElementById("animal");
const retData = document.getElementById("retData");
const newFragment = document.createDocumentFragment();
const contDiv = document.getElementById("contDiv");

myForm.onsubmit = (event) => {
  event.preventDefault();
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
    newCard.setAttribute("class", "col-md-4 mt-5 col-sm-12 ");
    newCard.innerHTML = `
                     <div class="card" style="width: 18rem;">
                     <img src="..." class="card-img-top" alt="...">
                     <div class="card-body">
                         <h2 class="card-title">Favorite Animal</h2>
                         <h3 id="retData">${element.animal}</h3>
                         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the
                             card's content.</p>
                         <a href="#" class="btn btn-primary">Go somewhere</a>
                     </div>
                 </div>
                     `;
    console.log(newCard);
    newFragment.appendChild(newCard);
  });
  contDiv.appendChild(newFragment);
};
