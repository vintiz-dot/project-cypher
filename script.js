"use strict";

const promise = getJson("https://dummyjson.com/products");

async function getJson(url) {
  const products = document.querySelector(".product--container");
  try {
    const data = fetch(url);
    if (!data.ok) {
      throw new Error(`No internet connection`);
    }
    const result = await data;

    if (!result.ok) throw new Error("Something went wrong");
    result.json().then(function (data) {
      outdata = data;
      const head = genHead(Object.keys(data.products[0]));

      const body = parseBody(data);
      const htmlTable = `<table><tr>${head}</tr>${body}</table>`;
      products.insertAdjacentHTML("beforeend", htmlTable);
    });
  } catch (error) {
    products.insertAdjacentText("beforeend", error);
    console.log("error", error);
  }
}

function genHead(list) {
  let head = "";
  list.forEach((element) => {
    head += `<th>${element}</th>`;
  });
  return head;
}

function compress(description) {
  let html = "";
  description.forEach((data) => (html += `<td>${data}</td>`));
  return html;
}

function parseBody(data) {
  const allProducts = [];
  let _discard = "";
  const productHTML = [];

  data.products.forEach((product, index) => {
    allProducts.push(Object.values(product));
    allProducts[index][9] = `none`;
    allProducts[index][10] = randomPicture(allProducts[index][10]);
  });
  allProducts.forEach((data) => {
    _discard = compress(data);
    productHTML.push(_discard);
  });
  productHTML.forEach((_, i) => {
    productHTML[i] = `<tr>${productHTML[i]}</tr>`;
  });
  return productHTML.join("");
}

function randomPicture(list) {
  console.log("image", `<img src="${list[randomNumber(list["length"])]}" >`);
  return `<img src="${list[randomNumber(list["length"])]}" >`;
}
function randomNumber(max) {
  return Math.floor(Math.random() * max);
}
