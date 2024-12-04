(() => {

  //VARIABLES
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector('#material-template');
  const materialList = document.querySelector('#material-list');
  const wrapperCon = document.querySelector('#wrapper');

  //Info Boxes API https://swiftpixel.com/earbud/api/infoboxes"
  //Material List API https://swiftpixel.com/earbud/api/materials"

  //FUNCTIONS
  function loadInfoBoxes() {

    //Add loading indicator
    // loader.classList.toggle('hidden');

    //make AJAX call here
    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes.results);

      infoBoxes.forEach((infoBox, index) => {
        let selected = document.querySelector(`#hotspot-${index + 1}`);

        const imageElement = document.createElement('img');
        imageElement.src = `images/${infoBox.thumbnail}`;
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = infoBox.heading;
  
        const textElement = document.createElement('p');
        textElement.textContent = infoBox.description;

        //Add images
  
        selected.appendChild(imageElement);
        selected.appendChild(titleElement);
        selected.appendChild(textElement);
      });

      // loader.classList.toggle('hidden');

    })
    .catch();
    //Add erorr message

  }
  
  loadInfoBoxes();

  function loadMaterialInfo() {

    //Add loading indicator
    loader.classList.toggle('hidden');

    fetch("https://swiftpixel.com/earbud/api/mateials")
    .then(response => response.json())
    .then(materialListData => {

      materialListData.forEach(material => {
        //Clone the template
        const clone = materialTemplate.content.cloneNode(true);
        //Populate template
        const materialHeading = clone.querySelector('.material-heading');
        materialHeading.textContent = material.heading;
        
        const materialDescription = clone.querySelector('.material-description');
        materialDescription.textContent = material.description;

        materialList.appendChild(clone);
      });

      loader.classList.toggle('hidden');

    })
    .catch(error => {
      console.log(error);
      const errorMessage = document.createElement('p');
      errorMessage.textContent = 'Oh! Something went wrong. Please check your internet connection or give it another try later.';
      wrapperCon.appendChild(errorMessage);
      // loader.classList.toggle('hidden');
  })
    

  }

  loadMaterialInfo();

  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //EVENT LISTENERS

  hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

