const tr = document.getElementsByTagName("tr");

function tableSearch(filter) {
    let td, txtValue;
    for (let i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName("td")[1]; // Search in column 0
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

const search = (filter) => {}; // New Search Func

function getSearchInput() {
    const input = document.querySelector("#search-input");
    const filter = input.value.toUpperCase();
    return search(filter);
}