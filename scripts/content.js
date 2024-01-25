setTimeout(() => {
  const pageClasses = ["x-wallpaper", "x-fabric", "x-home-good"];
  const imageSelector = "img.swiper-image";
  const addedClass = "spoonflower-xl";

  const findImages = () => {
    const selector = pageClasses
      .map((c) => `article.${c} ${imageSelector}`)
      .join(", ");

    return document.querySelectorAll(selector);
  };

  const updateImage = (img) => {
    img.src = img.src.replace("/xs/", "/l/");
    img.classList.add(addedClass);
  };

  const images = findImages();
  images.forEach(updateImage);
}, 2000);
