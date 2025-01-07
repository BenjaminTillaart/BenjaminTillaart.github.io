// Voeg navigatiebalk toe
document.getElementById('navigation').innerHTML = `
  <ul class="nav">
    <li><a href="#" data-page="html/home.html"><i class="fa fa-home"></i>Home</a></li>
    <li><a href="#" data-page="html/about.html"><i class="fa fa-building"></i>Elk Achtergrond</a></li>

    <li><a href="#" data-page="html/services.html"><i class="fa fa-map"></i>Wijkscan</a></li>
    
    <li class="has-submenu">
       <a href="#" data-page="html/portfolio.html"><i class="fa fa-comments"></i>Portfolio groep elk</a>
       <ul class="submenu always-visible">
          <a href="#" data-page="html/benjaminPortfolio.html"><i class="fa fa-user"></i>Benjamin</a>
          <a href="#" data-page="html/robinPortfolio.html"><i class="fa fa-user"></i>Robin</a>
          <a href="#" data-page="html/stijnPortfolio.html"><i class="fa fa-user"></i>Stijn</a>
        </ul>
    </li>

  </ul>
`;

//<li><a href="#home" class="active"><i class="fa fa-home"></i> Home</a></li>
//        <li><a href="#about"><i class="fa fa-user"></i> About</a></li>
//        <li><a href="#services"><i class="fa fa-list"></i>Services</a></li>
//        <li><a href="#portfolio"><i class="fa fa-briefcase"></i>Portfolio</a></li>
//        <li><a href="#contact"><i class="fa fa-comments"></i>Contact</a></li>
// <li><a href="#" data-page="html/contact.html"><i class="fa fa-comments"></i>Contact</a></li>

// Functie om inhoud dynamisch te laden
function loadContent(page) {
  fetch(page)
    .then(response => {
      if (!response.ok) throw new Error(`Error loading ${page}`);
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
    });
}

// Laad standaard de Home-sectie
loadContent('html/home.html');

// Voeg klikgebeurtenis toe aan navigatielinks
document.querySelectorAll('#navigation a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const page = this.getAttribute('data-page');
    loadContent(page);
  });
});