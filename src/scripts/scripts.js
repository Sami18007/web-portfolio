// Here are all of the scripts for the website.

let navBar = Element;
let navigationLinks = [];
let sections = [];
let selectedStrings;

let latestHeight = "0";

/**
 * Initialize navBar when the page is loaded or
 * the orientation of the screen is changed
 */
let initNavBar = () => {
    // Here we change the positioning of the navBar's 
    // content if it's too wide to fit the screen.
    const navBarSlider = navBar.querySelector("div");
    if (window.screen.orientation.type === "portrait-primary") {
        navBar.style.justifyContent = "flex-start";
    } else {
        navBar.style.justifyContent = "center";
    }

    markAsCurrentSection(0);
};

/**
 * Initialize sections when the page is loaded or
 * the orientation of the screen is changed
 */
let initSections = () => {
    if (window.screen.orientation.type === "landscape-primary") {
        const pushRightList = document.getElementsByClassName("push-right");

        for (let i = 0; i < pushRightList.length; i++)
            pushRightList[i].style.paddingLeft = "calc(50% + 2.75vh + 0.25vmin)";

        for (let i = 0; i < sections.length; i++) {
            sections[i].querySelector("div.section-window").style.width = "50%";
            sections[i].querySelector("div.section-content").style.width = "50%";
            setTimeout(() => {
                sections[i].querySelector("div.section-window").style.height = 
                    getComputedStyle(sections[i].querySelector("div.section-content")).getPropertyValue("height");
            }, 100);
        }
    } else {
        const pushRightList = document.getElementsByClassName("push-right");

        for (let i = 0; i < pushRightList.length; i++)
            pushRightList[i].style.paddingLeft = "calc(2.75vh + 0.25vmin)";

        for (let i = 0; i < sections.length; i++) {
            sections[i].querySelector("div.section-window").style.width = "100%";
            sections[i].querySelector("div.section-content").style.width = "100%";
            sections[i].querySelector("div.section-window").style.height = "35vh";
        }
    }

    for (let i = 0; i < sections.length; i++) {
        showIntroduction(i);
    }
};

/**
 * Execute this when the page is loaded or orientation
 * of the screen is changed
 */
onload = () => {
    while (typeof(navBar) === "function" || typeof(navBar) === "undefined") {
        navBar = document.getElementsByTagName("nav")[0];
        navigationLinks = navBar.querySelectorAll("a");
        sections = document.getElementsByTagName("section");
    }

    initNavBar();
    initSections();
};

// Detect whether device supports orientationchange event, 
// otherwise fall back to the resize event.
let supportsOrientationChange = "onorientationchange" in window;
let orientationEvent = supportsOrientationChange ? "orientationchange" : "resize";
window.addEventListener(orientationEvent, () => {
    onload();
});

let currentlySelectedSection = 0;
let latestOffset = 0;
let isNavBarVisible = true;
/**
 * Execute this when the page is scrolled
 */
onscroll = function() {
    if (typeof(navBar) !== "function" && typeof(navBar) !== "undefined") {
        // Here we check if the user scrolls down or up.
        // - down -> hide the navBar
        // - up -> show the navBar
        if (window.pageYOffset > latestOffset) {
            if (isNavBarVisible === true) {
                isNavBarVisible = false;
                navBar.style.top = "-" + (Number.parseFloat(
                    getComputedStyle(navBar).getPropertyValue("height")
                    ) + 5) + "px";
            }
        } else {
            if (isNavBarVisible === false) {
                isNavBarVisible = true;
                navBar.style.top = "0";
            }
        }

        // Here we mark the section on top of the screen as current to the navBar.
        if (window.pageYOffset < sections[1].offsetTop - window.innerHeight / 2) {
            if (currentlySelectedSection !== 0) {
                currentlySelectedSection = 0;
                markAsCurrentSection(0);
            }
        }
        // else if (window.pageYOffset < sections[2].offsetTop - window.innerHeight / 2) {
        //     if (currentlySelectedSection !== 1) {
        //         currentlySelectedSection = 1;
        //         markAsCurrentSection(1);
        //     }
        // }
        else {
            if (currentlySelectedSection !== 1) {
                currentlySelectedSection = 1;
                markAsCurrentSection(1);
            }
        }
        // else if (window.pageYOffset < sections[3].offsetTop - window.innerHeight / 2) {
        //     if (currentlySelectedSection !== 2) {
        //         currentlySelectedSection = 2;
        //         markAsCurrentSection(2);
        //     }
        // } else if (window.pageYOffset < sections[4].offsetTop - window.innerHeight / 2) {
        //     if (currentlySelectedSection !== 3) {
        //         currentlySelectedSection = 3;
        //         markAsCurrentSection(3);
        //     }
        // } else {
        //     if (currentlySelectedSection !== 4) {
        //         currentlySelectedSection = 4;
        //         markAsCurrentSection(4);
        //     }
        // }

        latestOffset = window.pageYOffset;
    }
};

/**
 * Mark a section name in navBar as current by drawing a line under it
 * @param {number} index 
 */
let markAsCurrentSection = (index) => {
    for (let i = 0; i < navigationLinks.length; i++) {
        navigationLinks[i].querySelector(".border-bottom").style.width = "0";
    }

    navigationLinks[index].querySelector(".border-bottom").style.width = 
        "calc(100% - var(--margin-small) - var(--margin-small))";
};

/**
 * Show introduction in the section instead of details/technologies
 * @param {number} section 
 */
let showIntroduction = (section) => {
    const buttonBorders = sections[section]
        .querySelectorAll("div.section-nav button div.border-bottom");

    const changableContents = sections[section]
        .querySelectorAll("div.section-content div.hiddable");

    changableContents[0].style.visibility = "visible";
    changableContents[1].style.visibility = "hidden";

    buttonBorders[0].style.width = "calc(100% - var(--margin-small) - var(--margin-small))";

    buttonBorders[1].style.width = "0";
};

/**
 * Show details/technologies in the section instead of introduction
 * @param {number} section 
 */
let showTechnology = (section) => {
    const buttonBorders = sections[section]
        .querySelectorAll("div.section-nav button div.border-bottom");

    const changableContents = sections[section]
        .querySelectorAll("div.section-content div.hiddable");

    changableContents[0].style.visibility = "hidden";
    changableContents[1].style.visibility = "visible";

    buttonBorders[0].style.width = "0";
    buttonBorders[1].style.width = "calc(100% - var(--margin-small) - var(--margin-small))";
};

/**
 * Show the image of the section in whole on top of everything else
 * @param {number} section 
 */
let showImage = (section) => {
    const imageViewer = document.getElementById("image-viewer");
    const imageView = imageViewer.querySelector("img");
    const imageUrl = getComputedStyle(sections[section])
        .getPropertyValue("background-image").split("\"")[1];

    imageView.src = imageUrl;
    imageViewer.style.display = "flex";
};

/**
 * Hide the image that is visible
 */
let hideImage = () => {
    const imageViewer = document.getElementById("image-viewer");

    imageViewer.style.display = "none";
};