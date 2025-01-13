/* ============================== typing animation ============================ */
function initTypedAnimation() {
  const typingElement = document.querySelector(".typing");
  if (typingElement) {
    new Typed(".typing", {
      strings: ["", "Benjamin Tillaart", "Robin Hendriks", "Stijn Ruesink"],
      typeSpeed: 100,
      backSpeed: 60,
      loop: true,
    });
  }
}

function loadContent(page) {
  // Voeg een timestamp toe aan de URL om caching te omzeilen
  const timestamp = new Date().getTime();
  const urlWithTimestamp = page + '?t=' + timestamp;

  fetch(urlWithTimestamp)
    .then(response => {
      if (!response.ok) throw new Error(`Error loading ${page}`);
      return response.text();
    })
    .then(html => {
      document.getElementById('content').innerHTML = html;
      window.scrollTo({ top: 0, behavior: 'smooth' });

      // Herlaad alle script-tags binnen de geladen HTML
      document.querySelectorAll('#content script').forEach(script => {
        const newScript = document.createElement('script');
        newScript.textContent = script.textContent;
        document.body.appendChild(newScript);
        script.remove();
      });

      // Controleer welke pagina geladen is en voer de juiste acties uit
      if (page.includes("weerAPI")) {
        weatherBalloon(2750053, 'nijmegen'); // Nijmegen
        weatherBalloon(6544254, 'drachten'); // Drachten
      }

      // Start de animatie opnieuw als de homepagina wordt geladen
      if (page.includes('home.html')) {
        initTypedAnimation();  // Zorg ervoor dat deze functie aanwezig is op de homepagina
      }

      // Extra logica voor andere pagina's, bijvoorbeeld Nasa of andere
      if (page.includes("nasa")) {
        // Voeg specifieke acties toe voor de Nasa-pagina indien nodig
      }

    })
    .catch(error => {
      console.error(error);
      document.getElementById('content').innerHTML = '<p>Failed to load content.</p>';
    });
}

/* ============================== Aside ============================ */
const nav = document.querySelector(".nav"),
      navList = nav.querySelectorAll("li"),
      totalNavList = navList.length,
      allSection = document.querySelectorAll(".section"),
      totalSection = allSection.length;
      for(let i=0; i<totalNavList; i++)
      {
          const a = navList[i].querySelector("a");
          a.addEventListener("click", function()
          {
              removeBackSection();
              for(let j=0; j<totalNavList; j++)
              {
                  if(navList[j].querySelector("a").classList.contains("active"))
                  {
                      addBackSection(j);
                     // allSection[j].classList.add("back-section");
                  }
                  navList[j].querySelector("a").classList.remove("active");
              }
              this.classList.add("active")
              showSection(this);
              if(window.innerWidth < 1200)
              {
                  asideSectionTogglerBtn();
              }
          })
      }
      function removeBackSection()
      {
        for(let i=0; i<totalSection; i++)
        {
            allSection[i].classList.remove("back-section");
        }   
      }
      function addBackSection(num)
      {
        allSection[num].classList.add("back-section");
      }
      function showSection(element)
      {
          for(let i=0; i<totalSection; i++)
          {
              allSection[i].classList.remove("active");
          }
          const target = element.getAttribute("href").split("#")[1];
          document.querySelector("#" + target).classList.add("active")
      }
      function updateNav(element)
      {
          for(let i=0; i<totalNavList; i++)
          {
              navList[i].querySelector("a").classList.remove("active");
              const target = element.getAttribute("href").split("#")[1];
              if(target === navList[i].querySelector("a").getAttribute("href").split("#")[1])
              {
                navList[i].querySelector("a").classList.add("active");
              }
          }
      }
      document.querySelector(".hire-me").addEventListener("click", function()
      {
          const sectionIndex = this.getAttribute("data-section-index");
          //console.log(sectionIndex);
          showSection(this);
          updateNav(this);
          removeBackSection();
          addBackSection(sectionIndex);
      })
      const navTogglerBtn = document.querySelector(".nav-toggler"),
            aside = document.querySelector(".aside");
            navTogglerBtn.addEventListener("click", () => 
            {
                asideSectionTogglerBtn();
            })
            function asideSectionTogglerBtn()
            {
                aside.classList.toggle("open");
                navTogglerBtn.classList.toggle("open");
                for(let i=0; i<totalSection; i++ )
                {
                    allSection[i].classList.toggle("open");
                }
            }