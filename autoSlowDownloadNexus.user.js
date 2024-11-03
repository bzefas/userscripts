// ==UserScript==
// @name         Auto Slow Download Nexus Mods
// @version      1.0
// @description  Auto click download button (slow) and close page.
// @author       brundt
// @match        *://*.nexusmods.com/*
// @match        *://nexusmods.com/*
// @icon         https://images.nexusmods.com/favicons/ReskinOrange/favicon-32x32.png
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Get the button element
    const slowButton = document.getElementById('slowDownloadButton');

    if (!slowButton) return; // Exit if button is not found

    // Define the callback function for the observer
    const onIntersect = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                slowButton.click();
                setTimeout(() => window.close(), 2000);
                observer.disconnect(); // Stop observing after action
            }
        });
    };

    // Set up the Intersection Observer
    const observer = new IntersectionObserver(onIntersect, {
        root: null, // Use the viewport as root
        threshold: 0.1 // Trigger when 10% of the button is visible
    });

    // Start observing the button
    observer.observe(slowButton);
})();
