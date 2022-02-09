const tr = document.getElementsByTagName("tr");

function tableSearch(filter) {
  let td, txtValue;
  for (let i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td")[0]; // Search first row
    if (td) {
      txtValue = td.textContent || td.innerText;
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
  }
}

function getSearchInput() {
  const input = document.querySelector("#search-input");
  const filter = input.value.toUpperCase();
  return tableSearch(filter);
}
// to scroll smoothly
const scrollToElement = (id) => {
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
};
