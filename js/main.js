(() => {

  //VARIABLES
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector('#material-template');
  const materialList = document.querySelector('#material-list');

  //Info Boxes API https://swiftpixel.com/earbud/api/infoboxes"
  //Material List API https://swiftpixel.com/earbud/api/materials"

  //FUNCTIONS
  function loadInfoBoxes() {

    //Add loading indicator

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

    })
    .catch();
    //Add erorr message

  }
  
  loadInfoBoxes();

  function loadMaterialInfo() {

    //Add loading indicator

    fetch("https://swiftpixel.com/earbud/api/materials")
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

    })
    .catch()
    //Add error message

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

