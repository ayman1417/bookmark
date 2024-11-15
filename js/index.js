const urlValidation =
  /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*$/;
const bookmarkValidation = /^[a-zA-Z0-9 _-]+$/;
// localStorage.clear();

var bookMark = document.getElementById("name-input");
var webUrl = document.getElementById("url-input");
var table = document.getElementById("tableBody");

var webcontainer = [];
if (localStorage.getItem("products") != null) {
  webcontainer = JSON.parse(localStorage.getItem("products"));
  display(webcontainer);
}

function addWeb() {
  var web = {
    name: bookMark.value.trim(),
    url: webUrl.value.trim(),
  };

    if (!bookmarkValidation.test(web.name)) {
    new bootstrap.Modal(document.getElementById('exampleModal')).show();
    return;
  }

  if (!urlValidation.test(web.url)) {
    new bootstrap.Modal(document.getElementById('exampleModal')).show();
    return;
  }

  webcontainer.push(web);
  localStorage.setItem("products", JSON.stringify(webcontainer));
  display(webcontainer);

  webUrl.value = "";
  bookMark.value = "";
}

function display(webcontainer) {
  container = "";
  for (var i = 0; i < webcontainer.length; i++) {
    container += `<tr>
      <td>${i + 1}</td>
      <td>${webcontainer[i].name}</td>
      
              <td class="d-flex justify-content-center align-items-center">
                <a
                target="_blank"
                  class="btn-visit px-3 py-2 text-white fw-bold btn-color rounded-2 text-decoration-none"
                  href="${webcontainer[i].url}"
                >
                  <i class="fa-solid fa-eye"></i>
                  Visit
                </a>
              </td>
      <td>
          <button     onclick="deleteweb(${i})" class="btn-delete px-2 py-2 text-white fw-bold btn-color rounded-2">
            <i class="fa-solid fa-eye"></i> 
            Delete
          </button>    
      </td>
    </tr>
  `;
  }
  table.innerHTML = container;
}

function deleteweb(id) {
  webcontainer.splice(id, 1);
  localStorage.setItem("products", JSON.stringify(webcontainer));

  display(webcontainer);
}
