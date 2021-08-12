export const imageZoom = (imgID: string, resultID: string, lensID: string) => {
  const moveLens = (e: MouseEvent) => {
    e.preventDefault();

    const pos = getCursorPos(e);

    let x = pos.x - lens.offsetWidth / 2;
    let y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) {
      x = img.width - lens.offsetWidth;
    }
    if (x < 0) {
      x = 0;
    }
    if (y > img.height - lens.offsetHeight) {
      y = img.height - lens.offsetHeight;
    }
    if (y < 0) {
      y = 0;
    }

    lens.style.left = x + "px";
    lens.style.top = y + "px";

    result.style.backgroundPosition = "-" + x * cx + "px -" + y * cy + "px";
  };

  const getCursorPos = (e: MouseEvent) => {
    const a = img.getBoundingClientRect();

    let x = e.pageX - a.left;
    let y = e.pageY - a.top;

    x -= window.pageXOffset;
    y -= window.pageYOffset;
    return { x: x, y: y };
  };

  const img = document.getElementById(imgID) as HTMLImageElement;
  const result = document.getElementById(resultID);
  const lens = document.getElementById(lensID) as HTMLElement;

  img.parentElement.insertBefore(lens, img);

  const cx = result.offsetWidth / lens.offsetWidth;
  const cy = result.offsetHeight / lens.offsetHeight;

  result.style.backgroundImage = "url('" + img.src + "')";
  result.style.backgroundSize = img.width * cx + "px " + img.height * cy + "px";

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);
};
