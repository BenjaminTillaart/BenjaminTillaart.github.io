// Voeg navigatiebalk toe
document.getElementById('navigation').innerHTML = `
  <ul class="nav">
    <li><a href="#" data-page="html/home.html"><i class="fa fa-home"></i>Home</a></li>
    <li><a href="#" data-page="html/about.html"><i class="fa fa-building"></i>Elk Achtergrond</a></li>
    <li class="has-submenu">
       <a href="#" data-page="html/portfolio.html"><i class="fa fa-comments"></i>Portfolio groep elk</a>
       <ul class="submenu always-visible">
          <li><a href="#" data-page="html/benjaminPortfolio.html"><i class="fa fa-user"></i>Benjamin</a></li>
          <li><a href="#" data-page="html/robinPortfolio.html"><i class="fa fa-user"></i>Robin</a></li>
          <li><a href="#" data-page="html/stijnPortfolio.html"><i class="fa fa-user"></i>Stijn</a></li>
          <ul class="submenu always-visible">
            <li><a href="#" data-page="html/apis/weerAPI.html"><i class="fa fa-user"></i>Weer</a></li>
            <li><a href="#" data-page="html/apis/nasa.html"><i class="fa fa-user"></i>Nasa</a></li>
          </ul>
        </ul>
    </li>
  </ul>
`;

function loadContent(page) {
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error(`Fout bij het laden van: ${page}`);
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = `
        <p>De pagina kon niet worden geladen. Controleer of het bestand bestaat en probeer opnieuw.</p>
      `;
    });
}

// Laad standaard de Home-sectie
loadContent('html/home.html');

// Voeg klikgebeurtenis toe aan navigatielinks
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('#navigation a').forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const page = this.getAttribute('data-page');
      loadContent(page);
    });
  });
});