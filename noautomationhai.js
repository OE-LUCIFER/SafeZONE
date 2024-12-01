// Protected by SecureZone by HelpingAI 🛡️
// Created with 💯 by HAI

(function() {
    'use strict';

    // Advanced Scraping Protection
    const antiScrapingProtection = () => {
        // Advanced DOM Manipulation Protection
        const originalQuerySelector = document.querySelector;
        const originalQuerySelectorAll = document.querySelectorAll;
        const originalGetElementById = document.getElementById;
        const originalGetElementsByClassName = document.getElementsByClassName;
        const originalGetElementsByTagName = document.getElementsByTagName;

        // Trap for automated DOM queries
        document.querySelector = function(...args) {
            if (Math.random() < 0.3) { // 30% chance to return fake data
                return createFakeElement();
            }
            return originalQuerySelector.apply(this, args);
        };

        document.querySelectorAll = function(...args) {
            const result = originalQuerySelectorAll.apply(this, args);
            // Mix in some fake elements
            return mixWithFakeElements(result);
        };

        // Create convincing fake elements
        const createFakeElement = () => {
            const el = document.createElement('div');
            el.setAttribute('data-fake-id', Math.random().toString(36));
            el.innerHTML = generateFakeContent();
            return el;
        };

        // Generate fake content
        const generateFakeContent = () => {
            const fakeContents = [
                '<span>Important Data</span>',
                '<div>Sensitive Information</div>',
                '<p>Critical Content</p>'
            ];
            return fakeContents[Math.floor(Math.random() * fakeContents.length)];
        };

        // Mix real elements with fake ones
        const mixWithFakeElements = (collection) => {
            const array = Array.from(collection);
            for (let i = 0; i < 3; i++) {
                array.splice(
                    Math.floor(Math.random() * array.length),
                    0,
                    createFakeElement()
                );
            }
            return array;
        };

        // Add multiple honeypot elements
        const addHoneypots = () => {
            const honeypotCount = 5;
            for (let i = 0; i < honeypotCount; i++) {
                const honeypot = document.createElement('div');
                honeypot.style.display = 'none';
                honeypot.className = `data-container-${Math.random().toString(36).substr(2, 9)}`;
                honeypot.innerHTML = `<a href="#" class="important-link-${i}">Critical Data</a>`;
                document.body.appendChild(honeypot);
            }
        };

        // Dynamic element attribute scrambling
        const scrambleAttributes = () => {
            document.querySelectorAll('*').forEach(el => {
                if (Math.random() < 0.1) { // 10% chance for each element
                    el.setAttribute(`data-${Math.random().toString(36).substr(2, 9)}`, 
                                 Math.random().toString(36).substr(2, 9));
                }
            });
        };

        // Initialize protections
        addHoneypots();
        setInterval(scrambleAttributes, 2000);

        // Monitor for rapid DOM queries
        let queryCount = 0;
        const queryThreshold = 50;
        const timeWindow = 1000;

        const monitorQueries = () => {
            queryCount++;
            if (queryCount > queryThreshold) {
                document.body.innerHTML = 'Suspicious activity detected! Access denied! 🚫';
                generateCaptcha();
            }
            setTimeout(() => queryCount--, timeWindow);
        };

        // Add query monitoring to DOM methods
        const addQueryMonitoring = (obj, methodName) => {
            const original = obj[methodName];
            obj[methodName] = function(...args) {
                monitorQueries();
                return original.apply(this, args);
            };
        };

        ['querySelector', 'querySelectorAll', 'getElementById', 
         'getElementsByClassName', 'getElementsByTagName'].forEach(method => {
            addQueryMonitoring(document, method);
        });
    };

    // Selenium and WebDriver Detection
    const checkSelenium = () => {
        const automationFlags = [
            '_selenium',
            'callSelenium',
            '_Selenium_IDE_Recorder',
            'selenium',
            'webdriver',
            '_phantom',
            'phantom',
            'domAutomation',
            'domAutomationController'
        ];

        for (const flag of automationFlags) {
            if (window[flag]) return true;
        }

        return !!document.documentElement.getAttribute('webdriver') ||
               !!window.navigator.webdriver ||
               !!window._phantom ||
               !!window.callPhantom;
    };

    // Detect Headless Browsers
    const detectHeadless = () => {
        const languages = navigator.languages;
        const webdriver = navigator.webdriver;
        const pluginsLength = navigator.plugins.length;
        
        return !languages || languages.length === 0 || webdriver || pluginsLength === 0;
    };

    // Enhanced Bot Detection
    const detectBot = () => {
        const userAgent = navigator.userAgent.toLowerCase();
        const botPatterns = [
            'bot', 'spider', 'crawl', 'phantomjs', 'headless',
            'selenium', 'webdriver', 'puppet', 'playwright',
            'python', 'scraper', 'request', 'axios', 'fetch',
            'beautifulsoup', 'mechanize', 'httrack', 'wget',
            'curl', 'phantomjs', 'nightmare', 'jsdom', 'cheerio',
            'puppeteer', 'cypress', 'webdriver', 'selenium-webdriver',
            'chromedriver', 'geckodriver', 'phantomjs', 'casperjs',
            'request-promise', 'superagent', 'node-fetch', 'got',
            'jsdom', 'zombie', 'nightmare'
        ];
        
        // Advanced bot behavior detection
        const suspicious = [
            !('ontouchstart' in window),
            !('DeviceMotionEvent' in window),
            !('DeviceOrientationEvent' in window),
            !('RequestAnimationFrame' in window),
            navigator.hardwareConcurrency < 2,
            !window.localStorage,
            !window.indexedDB,
            !window.openDatabase,
            !('webkitRequestAnimationFrame' in window),
            !('mozRequestAnimationFrame' in window),
            !('performance' in window),
            !('WebSocket' in window),
            !('FileReader' in window),
            !('Notification' in window),
            typeof navigator.onLine === 'undefined'
        ].filter(Boolean).length >= 6;

        // Check for inconsistent browser features
        const inconsistentFeatures = [
            !!(window.chrome) && !!(window.chrome.runtime) && !!(window.chrome.webstore),
            !!(window.document.documentMode) && !!(window.StyleMedia),
            !!(window.opera) && !!(window.opr)
        ].filter(Boolean).length >= 2;

        return botPatterns.some(pattern => userAgent.includes(pattern)) || 
               suspicious || 
               inconsistentFeatures;
    };

    // Random CAPTCHA Generator
    const generateCaptcha = () => {
        const captchaContainer = document.createElement('div');
        captchaContainer.style.position = 'fixed';
        captchaContainer.style.top = '50%';
        captchaContainer.style.left = '50%';
        captchaContainer.style.transform = 'translate(-50%, -50%)';
        captchaContainer.style.background = '#fff';
        captchaContainer.style.padding = '20px';
        captchaContainer.style.boxShadow = '0 0 10px rgba(0,0,0,0.5)';
        captchaContainer.style.zIndex = '9999';

        const code = Math.random().toString(36).substring(2, 8).toUpperCase();
        captchaContainer.innerHTML = `
            <h3>Please verify you're human 🤖</h3>
            <p>Enter this code: <strong>${code}</strong></p>
            <input type="text" id="captchaInput" />
            <button onclick="verifyCaptcha('${code}')">Verify</button>
        `;

        document.body.appendChild(captchaContainer);
    };

    // Main Protection Function
    const protectPage = () => {
        // Initialize anti-scraping protection
        antiScrapingProtection();

        // Add random delays to confuse automation
        const randomDelay = () => Math.floor(Math.random() * 2000) + 1000;

        // Continuous checks with random delays and patterns
        let lastCheckTime = Date.now();
        
        setInterval(() => {
            const now = Date.now();
            const timeDiff = now - lastCheckTime;
            
            // Detect if timing is too precise (bot behavior)
            if (timeDiff < 995 || timeDiff > 1005) {
                setTimeout(() => {
                    if (checkSelenium() || detectHeadless() || detectBot()) {
                        document.body.innerHTML = 'Automation detected! Access denied! 🚫';
                        generateCaptcha();
                    }
                }, randomDelay());
            }
            
            lastCheckTime = now;
        }, 1000);

        // Initial check
        if (checkSelenium() || detectHeadless() || detectBot()) {
            document.body.innerHTML = 'Automation detected! Access denied! 🚫';
            generateCaptcha();
        }
    };

    // Verify CAPTCHA
    window.verifyCaptcha = (code) => {
        const input = document.getElementById('captchaInput');
        if (input.value === code) {
            document.querySelector('div[style*="position: fixed"]').remove();
            location.reload();
        } else {
            alert('Invalid CAPTCHA! Try again! 🤔');
            input.value = '';
        }
    };

    // Initialize protection
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', protectPage);
    } else {
        protectPage();
    }
})();
