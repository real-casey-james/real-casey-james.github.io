let data = {}

function fetcher () {(async () => {
  const response = await fetch('https://api.github.com/repos/real-casey-james/real-casey-james.github.io/contents/ascii/data');
  data = await response.json();
  let htmlString = '';
  for (let file of data) {
    htmlString += `<button onclick="getFile('.${file.path.slice(5)}')">${file.name.slice(0,-4)}</button>`;
  }
  document.getElementById('buttonContainer').outerHTML = htmlString;
})()
}

function getFile (path) {
  
fetch(path)
  .then(function(response) {
    response.text().then(function(text) {
      document.getElementById("artContainer").innerHTML = text
    });
  });
}

function changeColor() {
  document.body.style.color = document.getElementById("textColor").value;
  document.body.style.backgroundColor = document.getElementById("backgroundColor").value;
}

function changeFont() {
  document.getElementById("art").style.fontSize = document.getElementById("fontSize").value + 'px'
}