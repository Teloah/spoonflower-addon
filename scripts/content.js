setTimeout(() => {
  const pageClasses = ["x-wallpaper", "x-fabric", "x-home-good"];
  const imageSelector = "img.swiper-image";
  const addedClass = "spoonflower-xl";

  const updateImage = (img) => {
    img.src = img.src.replace("/xs/", "/l/").replace("/m/", "/l/");
    img.classList.add(addedClass);
  };

  const updateLazyImages = () => {
    const parentDiv = document.querySelector(".b-products-overview");

    if (!parentDiv) {
      return;
    }

    const config = { attributes: false, childList: true, subtree: true };

    const callback = (mutationList) => {
      for (const mutation of mutationList) {
        if (mutation.type === "childList") {
          const nodes = mutation.addedNodes;
          for (const node of nodes) {
            if (node.nodeName === "IMG" && node.classList.contains("image")) {
              updateImage(node);
            }
          }
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(parentDiv, config);
  };

  const updateImmediateImages = () => {
    const productsSelectors = ["article.b-products-overview img.image"];
    const designsSelectors = pageClasses.map(
      (c) => `article.${c} ${imageSelector}`
    );

    const selector = productsSelectors.concat(designsSelectors).join(", ");

    const images = document.querySelectorAll(selector);
    images.forEach(updateImage);
  };

  updateImmediateImages();
  updateLazyImages();
}, 2000);
