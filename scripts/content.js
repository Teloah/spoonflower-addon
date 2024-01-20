setTimeout(() => {
  const pageClasses = ["x-wallpaper", "x-fabric", "x-home-good"];
  const imageSelector = "img.swiper-image";
  const addedClass = "spoonflower-xl";

  const styleNode = document.createElement("style");
  styleNode.innerHTML = `
  div.swiper-slide:has(img.${addedClass})::after {
    content: "L";
    position: absolute;
    bottom: 1px;
    left: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #2d6e76;
    color: #fff;
    width: 15px;
    height: 15px;
    line-height: 0.75rem;
    font-size: 0.75rem;
    border-radius: 50%;
    border: 1px solid #fff;
  }
`;

  document.body.appendChild(styleNode);

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
