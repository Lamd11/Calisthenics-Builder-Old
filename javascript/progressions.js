document.addEventListener("DOMContentLoaded", () => {
    const skillCards = document.getElementById("skill-cards");
    const skillDropdownList = document.getElementById("filter");
  
    const fetchData = () => {
      fetch('/json/skills.json')
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
          }
          return response.json();
        })
        .then(skills => {
          // Use the skills data
          console.log(skills);
  
          // Example: Display skills on the page
          skillCards.innerHTML = ''; // Clear any previous content
          skills.forEach(skill => {
            const skillCard = document.createElement('div');
            skillCard.classList.add('skill-card');
  
            skillCard.innerHTML = `
              <h2>${skill.name}</h2>
              <img src="${skill.image}" alt="${skill.name}">
              <p>${skill.description}</p>
            `;
  
            skillCards.appendChild(skillCard);
          });
        })
        .catch(error => {
          console.error('Error loading the JSON file:', error);
        });
    };
  
    skillDropdownList.addEventListener("change", (e) => {
      switch (e.target.value) {
        case "all":
          fetchData();
          break;
        // Add more cases for other filters if needed
      }
    });
  
    // Optionally, you can load the skills data on page load
    fetchData();
  });
  