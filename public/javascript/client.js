const submitButton = document.getElementById("search-button");
submitButton.addEventListener("click", (e) => {
  window.location.href =
    "games"+ 
    "?search=" + 
    document.getElementById("search-input").value;
});

if (window.location.href.includes("=")){ 
  document.getElementById("search-input").value =
    window.location.href.split("=")[1];
}
