// ==UserScript==
// @name         StreamEast Fullscreen Toggle
// @version      1.0
// @author       brundt
// @description  Toggle fullscreen for the StreamEast stream (hide chat and adjust player size)
// @match        *://the.streameast.app/*/*
// @icon         https://the.streameast.app/favicon-48x48.png
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // Create the toggle button
    const toggleButton = document.createElement('button');
    toggleButton.title = 'Toggle Fullscreen';
    toggleButton.style.position = 'fixed';
    toggleButton.style.top = '20px';
    toggleButton.style.right = '20px';
    toggleButton.style.padding = '2.5px 10px 7.5px';
    toggleButton.style.backgroundColor = '#007bff';
    toggleButton.style.color = 'white';
    toggleButton.style.border = 'none';
    toggleButton.style.borderRadius = '5px';
    toggleButton.style.cursor = 'pointer';
    toggleButton.style.zIndex = '99999';

    const fullscreenIcon = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="white" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 9V3h6V1H1v8h2zm18-8h-8v2h6v6h2V1zm-8 22h8v-8h-2v6h-6v2zM3 15h2v6h6v2H1v-8z"/>
      </svg>`;
    toggleButton.innerHTML = `${fullscreenIcon}`;

    document.body.appendChild(toggleButton);

    // Flag to keep track of toggle state
    let isFullWidth = false;

    // Toggle function
    toggleButton.addEventListener('click', function () {
        const streamContainer = document.querySelector('div.col-lg-9');
        const chatContainer = document.querySelector('div#wp_chat');
        const theaterButton = document.querySelector('button#theater-mode-btn');
        const playerContainer = streamContainer.querySelector('div[data-player]');
        const playerWrapper = document.querySelector('.play-wrapper');

        playerWrapper.click();
        theaterButton.click();

        if (streamContainer && chatContainer && playerContainer) {
            if (isFullWidth) {
                // Reset to original
                chatContainer.style.display = '';
                theaterButton.style.display = '';
            } else {
                // Make stream full width and hide chat
                chatContainer.style.display = 'none';
                theaterButton.style.display = 'none';

                // Set playerContainer width and height to window size
                playerContainer.style.width = `${window.innerWidth}px`;
                playerContainer.style.height = `${window.innerHeight}px`;
            }
            // Toggle state
            isFullWidth = !isFullWidth;
        } else {
            console.warn('Could not find required elements on the page.');
        }
    });

    // Adjust player size on window resize if in full-width mode
    window.addEventListener('resize', () => {
        if (isFullWidth) {
            const playerContainer = document.querySelector('div.col-lg-9 div[data-player]');
            if (playerContainer) {
                playerContainer.style.width = `${window.innerWidth}px`;
                playerContainer.style.height = `${window.innerHeight}px`;
            }
        }
    });
})();
