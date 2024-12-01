// Protected by SecureZone by HelpingAI 🛡️
// Advanced DevTools Protection - Cross Browser Edition

(function() {
    'use strict';

    // Cross-browser compatibility checks
    const browserChecks = {
        isChrome: !!window.chrome,
        isFirefox: typeof InstallTrigger !== 'undefined',
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isEdge: /Edge/.test(navigator.userAgent),
        isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isIE: /*@cc_on!@*/false || !!document.documentMode
    };

    const disableDevTools = {
        config: {
            redirectURL: '/',
            warningMessage: 'DevTools detected! Access denied! 🚫',
            checkInterval: 50,
            maxTriggers: 2,
            browserSpecificChecks: true
        },

        detectionCount: 0,
        lastPerformanceCheck: Date.now(),

        init() {
            this.initBrowserSpecificProtection();
            this.protectConsole();
            this.protectDebugger();
            this.protectKeys();
            this.detectDevToolsOpen();
            this.protectSourceMapping();
            this.disableRightClick();
            this.injectFakeCode();
            this.protectAgainstMonkeyPatching();
            this.addExtraProtection();
            this.protectEval();
            this.protectSetTimeout();
            this.obfuscateScript();
            this.addBrowserSpecificChecks();
            this.protectAgainstProxies();
            this.addPerformanceChecks();
            this.protectIframes();
        },

        // Browser-specific protection initialization
        initBrowserSpecificProtection() {
            if (browserChecks.isChrome) {
                this.initChromeProtection();
            } else if (browserChecks.isFirefox) {
                this.initFirefoxProtection();
            } else if (browserChecks.isSafari) {
                this.initSafariProtection();
            } else if (browserChecks.isEdge) {
                this.initEdgeProtection();
            }
        },

        // Chrome-specific protection
        initChromeProtection() {
            // Detect Chrome DevTools protocol
            const checkChromeDevTools = () => {
                const devtools = /./;
                devtools.toString = () => {
                    this.handleDevToolsDetection();
                    return 'devtools';
                };
                console.log(devtools);
            };
            setInterval(checkChromeDevTools, 1000);

            // Detect Chrome extensions
            if (chrome && chrome.runtime) {
                this.handleDevToolsDetection();
            }
        },

        // Firefox-specific protection
        initFirefoxProtection() {
            // Detect Firebug
            if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
                this.handleDevToolsDetection();
            }

            // Detect Firefox devtools
            const checkFirefoxDevTools = () => {
                if (typeof InstallTrigger !== 'undefined') {
                    const element = document.createElement('div');
                    Object.defineProperty(element, 'id', {
                        get: () => {
                            this.handleDevToolsDetection();
                            throw new Error('DevTools detected');
                        }
                    });
                    console.log(element);
                }
            };
            setInterval(checkFirefoxDevTools, 1000);
        },

        // Safari-specific protection
        initSafariProtection() {
            // Detect Safari Web Inspector
            const checkSafariDevTools = () => {
                if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
                    const element = document.createElement('div');
                    element.__defineGetter__('id', () => {
                        this.handleDevToolsDetection();
                        throw new Error('DevTools detected');
                    });
                    console.log(element);
                }
            };
            setInterval(checkSafariDevTools, 1000);
        },

        // Edge-specific protection
        initEdgeProtection() {
            // Detect Edge DevTools
            if (browserChecks.isEdge) {
                const checkEdgeDevTools = () => {
                    const element = document.createElement('div');
                    Object.defineProperty(element, 'id', {
                        get: () => {
                            this.handleDevToolsDetection();
                            throw new Error('DevTools detected');
                        }
                    });
                    console.log(element);
                };
                setInterval(checkEdgeDevTools, 1000);
            }
        },

        // Add browser-specific checks
        addBrowserSpecificChecks() {
            const checks = [
                // Chrome-specific
                () => !!window.chrome && !!window.chrome.runtime,
                // Firefox-specific
                () => typeof InstallTrigger !== 'undefined' && window.navigator.userAgent.indexOf("Firefox") > -1,
                // Safari-specific
                () => /^((?!chrome|android).)*safari/i.test(navigator.userAgent) && Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0,
                // Edge-specific
                () => /Edge/.test(navigator.userAgent) && !!window.StyleMedia,
                // Opera-specific
                () => !!window.opr && !!window.opr.addons || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0
            ];

            setInterval(() => {
                checks.forEach(check => {
                    try {
                        if (check()) {
                            this.handleDevToolsDetection();
                        }
                    } catch (e) {}
                });
            }, this.config.checkInterval);
        },

        // Protect against proxies
        protectAgainstProxies() {
            const handler = {
                get: (target, prop) => {
                    this.handleDevToolsDetection();
                    return target[prop];
                }
            };

            // Protect key objects
            ['console', 'debugger', 'performance'].forEach(obj => {
                if (window[obj]) {
                    try {
                        window[obj] = new Proxy(window[obj], handler);
                    } catch (e) {}
                }
            });
        },

        // Add performance checks
        addPerformanceChecks() {
            const checkPerformance = () => {
                const now = Date.now();
                const timeDiff = now - this.lastPerformanceCheck;
                
                if (timeDiff > 100) { // Debugging detected
                    this.handleDevToolsDetection();
                }
                
                this.lastPerformanceCheck = now;
            };

            setInterval(checkPerformance, 50);
        },

        // Advanced console protection
        protectConsole() {
            const noop = () => undefined;
            const consoleProxy = new Proxy({}, {
                get: () => noop,
                set: () => false,
                deleteProperty: () => false,
                defineProperty: () => false,
                setPrototypeOf: () => false
            });

            Object.defineProperty(window, 'console', {
                get: () => consoleProxy,
                set: () => false,
                configurable: false,
                enumerable: false
            });
        },

        // Enhanced debugger protection
        protectDebugger() {
            const loops = ['setInterval', 'requestAnimationFrame'];
            loops.forEach(loop => {
                window[loop](() => {
                    debugger;
                    this.checkPerformance();
                }, 50);
            });
        },

        // Performance check to detect stepping through code
        checkPerformance() {
            const start = performance.now();
            debugger;
            const end = performance.now();
            if (end - start > 100) {
                this.handleDevToolsDetection();
            }
        },

        // Protect against keyboard shortcuts with additional combinations
        protectKeys() {
            const protectedKeys = {
                123: 'F12',
                73: 'I',
                74: 'J',
                67: 'C',
                85: 'U',
                83: 'S',
                82: 'R',
                116: 'F5'
            };

            window.addEventListener('keydown', (event) => {
                if (event.keyCode in protectedKeys) {
                    if (event.ctrlKey || event.shiftKey || event.altKey || event.metaKey) {
                        event.preventDefault();
                        event.stopPropagation();
                        this.handleDevToolsDetection();
                        return false;
                    }
                }
            }, true);

            // Prevent key combinations even if modifier keys are pressed in different order
            window.addEventListener('keyup', (event) => {
                if (event.keyCode in protectedKeys) {
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            }, true);
        },

        // Enhanced DevTools detection
        detectDevToolsOpen() {
            const checks = [
                () => window.outerWidth - window.innerWidth > 160,
                () => window.outerHeight - window.innerHeight > 160,
                () => window.Firebug?.chrome?.isInitialized,
                () => window.chrome?.webstore,
                () => !!window.__REACT_DEVTOOLS_GLOBAL_HOOK__,
                () => !!window.__REDUX_DEVTOOLS_EXTENSION__,
                () => !!window.VUE_DEVTOOLS_GLOBAL_HOOK__,
                () => window.console.firebug,
                () => typeof window.InstallTrigger !== 'undefined',
                () => /Chrome/.test(window.navigator.userAgent) && /Google Inc/.test(window.navigator.vendor)
            ];

            setInterval(() => {
                if (checks.some(check => {
                    try {
                        return check();
                    } catch {
                        return false;
                    }
                })) {
                    this.handleDevToolsDetection();
                }
            }, this.config.checkInterval);
        },

        // Protect against source mapping with enhanced security
        protectSourceMapping() {
            const removeSourceMaps = () => {
                document.querySelectorAll('*').forEach(element => {
                    ['sourceMappingURL', 'sourceURL'].forEach(attr => {
                        element.removeAttribute(attr);
                    });
                });
            };

            const observer = new MutationObserver((mutations) => {
                removeSourceMaps();
                mutations.forEach(mutation => {
                    if (mutation.type === 'attributes' && 
                        /source(URL|MappingURL)/.test(mutation.attributeName)) {
                        this.handleDevToolsDetection();
                    }
                });
            });

            observer.observe(document.documentElement, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['sourceMappingURL', 'sourceURL']
            });

            removeSourceMaps();
        },

        // Protect against monkey patching
        protectAgainstMonkeyPatching() {
            const protectedProps = ['console', 'debugger', 'eval', 'setTimeout'];
            protectedProps.forEach(prop => {
                Object.defineProperty(window, prop, {
                    configurable: false,
                    writable: false
                });
            });
        },

        // Protect eval
        protectEval() {
            window.eval = new Proxy(window.eval, {
                apply: (target, thisArg, args) => {
                    this.handleDevToolsDetection();
                    return target.apply(thisArg, args);
                }
            });
        },

        // Protect setTimeout to prevent code injection
        protectSetTimeout() {
            window.setTimeout = new Proxy(window.setTimeout, {
                apply: (target, thisArg, args) => {
                    if (typeof args[0] === 'string') {
                        this.handleDevToolsDetection();
                        return;
                    }
                    return target.apply(thisArg, args);
                }
            });
        },

        // Additional protection measures
        addExtraProtection() {
            // Prevent iframe debugging
            if (window.top !== window.self) {
                window.top.location = window.self.location;
            }

            // Disable stack traces
            Error.stackTraceLimit = 0;

            // Prevent debugging through Function constructor
            window.Function = new Proxy(window.Function, {
                construct: (target, args) => {
                    this.handleDevToolsDetection();
                    return target(...args);
                }
            });
        },

        // Obfuscate the script itself
        obfuscateScript() {
            const randomFunctions = [];
            for (let i = 0; i < 10; i++) {
                const fn = `function ${Math.random().toString(36).substr(2)}(){
                    try{return ${Math.random().toString(36).substr(2)}}catch(e){return false}
                }`;
                randomFunctions.push(fn);
            }
            const script = document.createElement('script');
            script.textContent = randomFunctions.join('\n');
            document.head.appendChild(script);
        },

        // Advanced iframe protection system 🔒
        protectIframes() {
            const self = this;
            const protectionConfig = {
                interval: 100,
                maxAttempts: 3,
                attempts: 0,
                blockedDomains: ['*'], // Block all domains by default
                allowedDomains: [], // Add trusted domains here
            };

            // Check if we're in an iframe
            function isInIframe() {
                try {
                    return window.self !== window.top;
                } catch (e) {
                    return true;
                }
            }

            // Verify parent domain
            function verifyParentDomain() {
                try {
                    const parentDomain = window.parent.location.hostname;
                    return protectionConfig.allowedDomains.includes(parentDomain);
                } catch (e) {
                    return false;
                }
            }

            // Advanced iframe detection
            function detectIframeManipulation() {
                try {
                    // Check frame depth
                    let frameDepth = 0;
                    let currentWindow = window;
                    
                    while (currentWindow !== window.top) {
                        frameDepth++;
                        currentWindow = currentWindow.parent;
                        
                        if (frameDepth > 1) {
                            throw new Error('Nested iframes detected');
                        }
                    }

                    // Check frame properties
                    const suspicious = [
                        window.parent !== window.top,
                        window.parent.frames.length > 1,
                        window.frameElement !== null,
                        document.referrer && !protectionConfig.allowedDomains.includes(new URL(document.referrer).hostname)
                    ].filter(Boolean).length;

                    if (suspicious >= 2) {
                        throw new Error('Suspicious iframe behavior detected');
                    }

                    // Check for frame busting attempts
                    if (window.top.location.href !== window.location.href) {
                        throw new Error('Frame busting attempt detected');
                    }

                } catch (e) {
                    protectionConfig.attempts++;
                    if (protectionConfig.attempts >= protectionConfig.maxAttempts) {
                        self.handleDevToolsOpen();
                    }
                    return true;
                }
                return false;
            }

            // Add frame protection headers
            function addFrameProtectionHeaders() {
                try {
                    // Set CSP headers
                    const meta = document.createElement('meta');
                    meta.httpEquiv = 'Content-Security-Policy';
                    meta.content = "frame-ancestors 'none'";
                    document.head.appendChild(meta);

                    // Set X-Frame-Options
                    const xfo = document.createElement('meta');
                    xfo.httpEquiv = 'X-Frame-Options';
                    xfo.content = 'DENY';
                    document.head.appendChild(xfo);
                } catch (e) {
                    self.handleDevToolsOpen();
                }
            }

            // Protect against iframe resizing
            function protectAgainstResizing() {
                try {
                    if (window.frameElement) {
                        Object.defineProperties(window.frameElement, {
                            'width': { configurable: false, writable: false },
                            'height': { configurable: false, writable: false },
                            'style': { configurable: false, writable: false }
                        });
                    }
                } catch (e) {
                    // Silently fail
                }
            }

            // Initialize protection
            try {
                // Add frame protection headers
                addFrameProtectionHeaders();

                // Initial checks
                if (isInIframe()) {
                    if (!verifyParentDomain()) {
                        this.handleDevToolsOpen();
                    }
                }

                // Set up continuous monitoring
                const protectionInterval = setInterval(() => {
                    if (detectIframeManipulation()) {
                        clearInterval(protectionInterval);
                        this.handleDevToolsOpen();
                    }
                    protectAgainstResizing();
                }, protectionConfig.interval);

                // Add window blur protection
                window.addEventListener('blur', () => {
                    if (document.activeElement.tagName === 'IFRAME') {
                        this.handleDevToolsOpen();
                    }
                });

                // Block iframe creation
                const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                        mutation.addedNodes.forEach((node) => {
                            if (node.tagName === 'IFRAME') {
                                node.remove();
                                this.handleDevToolsOpen();
                            }
                        });
                    });
                });

                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true
                });

            } catch (e) {
                this.handleDevToolsOpen();
            }
        },

        // Enhanced DevTools detection handler
        handleDevToolsDetection() {
            this.detectionCount++;
            
            if (this.detectionCount >= this.config.maxTriggers) {
                // Clear all storage
                try {
                    localStorage.clear();
                    sessionStorage.clear();
                    indexedDB.deleteDatabase('all');
                    
                    // Clear cookies
                    document.cookie.split(";").forEach(cookie => {
                        document.cookie = cookie.replace(/^ +/, "").replace(/=.*/, 
                            "=;expires=" + new Date().toUTCString() + ";path=/");
                    });
                } catch(e) {}
                
                // Remove all event listeners
                const clone = document.body.cloneNode(true);
                document.body.parentNode.replaceChild(clone, document.body);
                
                // Clear the page with browser-specific message
                let browserName = '';
                if (browserChecks.isChrome) browserName = 'Chrome';
                else if (browserChecks.isFirefox) browserName = 'Firefox';
                else if (browserChecks.isSafari) browserName = 'Safari';
                else if (browserChecks.isEdge) browserName = 'Edge';
                else if (browserChecks.isOpera) browserName = 'Opera';
                else browserName = 'your browser';
                
                document.body.innerHTML = `${this.config.warningMessage}<br>DevTools detected in ${browserName}!`;
                
                // Random delay before redirect
                const randomDelay = Math.floor(Math.random() * 500) + 500;
                setTimeout(() => {
                    window.location.href = this.config.redirectURL;
                }, randomDelay);
                
                this.detectionCount = 0;
            }
        }
    };

    // Initialize protection immediately and after DOM load
    disableDevTools.init();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => disableDevTools.init());
    }
})();
