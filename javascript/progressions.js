const skillCards = document.getElementById("cards");
const skillDropdownList = document.getElementById("filter");
const skillOverlay = document.getElementById("skill-overlay");
const skillPopup = document.getElementById("skill-popup")

const fetchData = async () => {
  try {
    const response = await fetch('/json/skills.json');
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    const skills = await response.json();
    return skills;
  } catch (error) {
    console.error('Error loading the JSON file:', error);
    return [];
  }
};

const setCards = (skills) => {
  skillCards.innerHTML = skills.map(
    ({ name, image, description }) =>
      `<div class="skill-card">
          <h2>${name}</h2>
          <img src="${image}" alt="${name}" class="skill-card-image">
       </div>
      `
  ).join("");

  const skillContainer = document.querySelectorAll(".skill-card")
  skillContainer.forEach((container, index) => {
    container.addEventListener("click", () => {
      console.log(skills[index].name);
      skillOverlay.style.display = "block";
      skillPopup.style.display = "flex";
      skillPopup.innerHTML = `
        <div id="skill-view-container">
          <h2>${skills[index].name}</h2>
          <p>${skills[index].description}</p>
          <button class="close-button">Close</button>
        </div>
      `;

      document.querySelector(".close-button").addEventListener("click", () => {
        skillOverlay.style.display = "none";
        skillPopup.style.display = "none";
      });

    });
  });
};


skillOverlay.addEventListener("click", (e) => {
  if(!skillPopup.contains(e.target)){
    skillOverlay.style.display = "none";
    skillPopup.style.display = "none";
  }
});


skillDropdownList.addEventListener("change", async (e) => {
  const skills = await fetchData();
  if(e.target.value === "all"){
    setCards(skills);
  }
  else {
    setCards(skills.filter((skill) => skill.type === e.target.value));
  }
})

document.addEventListener("DOMContentLoaded", async () => {
  const skills = await fetchData();
  setCards(skills);
});





