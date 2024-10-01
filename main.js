document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("companyForm");
  const companyList = document.getElementById("companyList");

  // ローカルストレージから会社情報を読み込んで表示する
  function loadCompanies() {
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    companies.forEach((company) => addCompanyToList(company));
  }

  // 会社情報をリストに追加する
  function addCompanyToList(company) {
    const li = document.createElement("li");
    li.textContent = `会社名: ${company.name}, URL: ${company.url}, パスワード: ${company.password}`;
    companyList.appendChild(li);
  }

  // 会社情報をローカルストレージに保存
  function saveCompany(name, url, password) {
    const companies = JSON.parse(localStorage.getItem("companies")) || [];
    companies.push({ name, url, password });
    localStorage.setItem("companies", JSON.stringify(companies));
  }

  // フォーム送信時に会社情報を保存し、リストに表示
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("companyName").value;
    const url = document.getElementById("url").value;
    const password = document.getElementById("password").value;

    saveCompany(name, url, password);
    addCompanyToList({ name, url, password });

    form.reset();
  });

  // ページ読み込み時に会社情報を表示
  loadCompanies();
});
