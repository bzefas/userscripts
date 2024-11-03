// ==UserScript==
// @name         Swaps twitter copy link
// @version      1.0
// @author       brundt
// @match        https://twitter.com/*
// @match        https://x.com/*
// @icon         https://abs.twimg.com/favicons/twitter.3.ico
// ==/UserScript==

const previewFixURL = 'fixupx'; // Can be replaced

(function() {
    'use strict';

    document.addEventListener("copy", (e) => {
        e.preventDefault();  // Prevent the default copy behavior
        const selected = getSelection().toString().trim(); // Get and trim selected text

        if (selected && modifyUrl(selected)) { // Only proceed if selected text is non-empty and valid
            navigator.clipboard.writeText(modifyUrl(selected)).catch(console.error);
        }
    });

    // Function to modify the URL
    function modifyUrl(selected) {
        const regex = /^https?:\/\/((.+)\.)?(twitter|x)\.com\/(.+)\/status\/(\d+)(\?.+)?$/;
        return selected.match(regex) ? selected.replace(regex, `https://${previewFixURL}.com/$4/status/$5`) : null;
    }
})();
