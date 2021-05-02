const googleSheetLink =
  "https://spreadsheets.google.com/feeds/cells/1fpm1AjYJInjZJTjffAqJVmnI3Ju_AvNc8FTj-AREehg/1/public/full?alt=json";
const imgRegexp = /\.(gif|jpg|jpeg|tiff|png)$/i;

function convertArray(arr) {
  let indices = []; // image indexes
  arr.forEach((item, index) => {
    if (imgRegexp.test(item)) {
      indices.push(index);
    }
  });
  return [...new Array(indices.length)].map((item, index) => {
    let i = indices[index];
    let sliceEnd = indices[index + 1] ? indices[index + 1] - 1 : arr.length;
    let variants = [];
    arr.slice(i + 2, sliceEnd).forEach((item, index) => {
      if (index % 2 === 0) {
        variants.push({dimension: item});
      } else {
        variants[(index - 1) / 2].price = item; //add property price to previously created object
      }
    });
    return {
      imgName: arr[i],
      description: arr[i + 1],
      variants
    };
  });
}

document.addEventListener(
  "DOMContentLoaded",
  function () {
    if (window.location.pathname.includes("price")) {
      fetch(googleSheetLink)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          let array = data.feed.entry;
          let lastCell = array[array.length - 1]["gs$cell"];
          let indexesHash = [];
          const _entry = data.feed.entry.map((item, index) => {
            if (item.content["$t"] === "#") {
              indexesHash.push(index);
            }
            return item.content["$t"];
          });
          const titlesShift = 5;
          let obj = {
            parapety: convertArray(_entry.slice(titlesShift, indexesHash[1])),
            kapeluhy: convertArray(_entry.slice(indexesHash[1] + titlesShift, indexesHash[2])),
            inshe: convertArray(_entry.slice(indexesHash[2] + titlesShift))
          };
          console.log(obj);
          console.log("Таблиця: ", lastCell.col, " X ", lastCell.row);

          // a function to build a list
          const template = list => `            
            ${list.map((item, index) => `
              <div class="row price-row">
                <div class="col-sm-1">${index + 1}</div>
                <div class="col-sm-8 price-description">
                  <img src="img/${item.imgName}" alt="" class="price-image">
                  <span>${item.description}</span>
                </div>
                <div class="col-sm-3 price-variants">
                  ${item.variants.map(variant => `
                  <div class="row">
                    <span class="col">
                      ${variant.dimension}
                    </span>
                    <span class="col">
                      ${variant.price}грн
                    </span>A
                  </div>
                  `).join('')}
                </div>
               </div>
            `).join('')}
            `;

          // add the template to the page
/*          Object
            .entries(obj)
            .forEach(
              ([key, value]) => document.querySelector(`.price-${key}-list`).innerHTML = template(value)
            );*/
        })
    }
  },
  false
);
