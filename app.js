// service worker 注册

if (serviceWorker in navigator) {
  navigator.serviceWorker
    .register("/sw-test/sw.js", { scope: "/sw-test" })
    .then((reg) => {
      if (reg.installing) {
        console.log("Service worker 安装中");
      } else if (reg.waiting) {
        console.log("Service worker 安装完成");
      } else if (reg.active) {
        console.log("Service worker 激活状态");
      }
    })
    .catch((err) => {
      console.log("注册失败" + err);
    });
}

function imgLoad(imgJSON) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open("GET", imgJSON.url);
    request.responseType = "blob";

    request.onload = () => {
      if (request.status === 200) {
        resolve([request.response, imgJSON]);
      } else {
        reject(Error(""));
      }
    };
    request.send();
  });
}

window.onload = function () {
  const imgSection = document.querySelector("select");

  const gallery = {
    images: [
      {
        name: "Darth Vader",
        alt: "A Black Clad warrior lego toy",
        url: "gallery/myLittleVader.jpg",
        credit:
          '<a href="https://www.flickr.com/photos/legofenris/">legOfenris</a>, published under a <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">Attribution-NonCommercial-NoDerivs 2.0 Generic</a> license.',
      },

      {
        name: "Snow Troopers",
        alt: "Two lego solders in white outfits walking across an icy plain",
        url: "gallery/snowTroopers.jpg",
        credit:
          '<a href="https://www.flickr.com/photos/legofenris/">legOfenris</a>, published under a <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">Attribution-NonCommercial-NoDerivs 2.0 Generic</a> license.',
      },

      {
        name: "Bounty Hunters",
        alt:
          "A group of bounty hunters meeting, aliens and humans in costumes.",
        url: "gallery/bountyHunters.jpg",
        credit:
          '<a href="https://www.flickr.com/photos/legofenris/">legOfenris</a>, published under a <a href="https://creativecommons.org/licenses/by-nc-nd/2.0/">Attribution-NonCommercial-NoDerivs 2.0 Generic</a> license.',
      },
    ],
  };

  for (let i = 0; i <= gallery.images.length - 1; ++i) {
    imgLoad(gallery.images[i])
      .then(([file, imageData]) => {
        const imageEl = document.createElement("img");
        const figureEl = document.createElement("figure");
        const captionEl = document.createElement("caption");
        //  根据文件内容创建访问改资源的URL
        const imageURL = window.URL.createObjectURL(file);

        imageEl.src = imageURL;
        imageEl.setAttribute("alt", imageData.alt);
        captionEl.innerHTML = `<strong>${imageData.name}</strong>: Taken by ${imageData.credit}`;

        imgSection.appendChild(figureEl);
        figureEl.appendChild(imageEl);
        figureEl.appendChild(captionEl);
      })
      .then((err) => console.log(err));
  }
};
