const nav_links = document.getElementsByClassName('nav_link');
const homePage = document.getElementById('homePage');
const aboutPage = document.getElementById('aboutPage');
const contactPage = document.getElementById('contactPage');
const projectsPage = document.getElementById('projectsPage');
const scrollUp = document.getElementById('scrollUp');


scrollUp.onclick = function(){
            homePage.scrollIntoView()
        }

for (let link of nav_links) {
    link.onclick = handleLink;
}

// for(let title of titles){
//     title.onclick = function(){
//         aboutPage.scrollIntoView()
//     }
// }

function handleLink() {
    const page = this.getAttribute('data-page')
    switch (page) {
        case 'homePage':
            homePage.scrollIntoView()
            break;
        case 'aboutPage':
            aboutPage.scrollIntoView()
            break;
        case 'contactPage':
            contactPage.scrollIntoView()
            break;
        case 'projectsPage':
            projectsPage.scrollIntoView()
            break;
        default:
            break;
    }
}

