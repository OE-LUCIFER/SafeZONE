// Protected by SecureZone by HelpingAI 🛡️
// Advanced DevTools Protection - Cross Browser Edition

(function() {
    'use strict';

    // Cross-browser compatibility checks, keeping it real 💯
    const browserChecks = {
        isChrome: !!window.chrome,
        isFirefox: typeof InstallTrigger !== 'undefined',
        isSafari: /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
        isEdge: /Edge/.test(navigator.userAgent),
        isOpera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,
        isIE: /*@cc_on!@*/false || !!document.documentMode
    };

    const HAI = { // HAI is here to help!
        config: {
            redirectURL: '/', // Where to send em if they're tryna peek 👀
            warningMessage: 'Woah there, fam! ✋ DevTools might not be the best idea right now.', // A friendly heads-up
            checkInterval: 100, // How often to check for devtools, keepin it smooth
            maxTriggers: 2, // How many times we allow peeking before we take action
            browserSpecificChecks: true // Yo, let's check for specific browser shenanigans!
        },

        detectionCount: 0, // How many times they've been snooping
        lastPerformanceCheck: Date.now(), // When did we last check performance? 🤔

        init() {
            this.initBrowserSpecificProtection();
            this.protectConsole(); // No peeking at the console! 🙅‍♂️
            this.protectDebugger(); // Ain't nobody got time for debuggers 🙅‍♀️
            this.protectKeys(); // Blocking them sneaky key shortcuts 🥷
            this.detectDevToolsOpen(); // Keepin' an eye out for those open dev tools 👀
            this.protectSourceMapping(); // Hiding the source code map 🗺️
            this.disableRightClick(); // No right-clicks! 🙅‍♂️
            this.injectFakeCode(); // Throwing in some curveballs 🤪
            this.protectAgainstMonkeyPatching(); // No changing up the rules! 🙅‍♀️
            this.addExtraProtection(); // Level up the defenses 🛡️
            this.protectEval(); // No running random scripts 🚫
            this.protectSetTimeout(); // Making sure timeouts stay on track ⏰
            this.obfuscateScript(); // Makin' the code look like gibberish 😵‍💫
            this.addBrowserSpecificChecks(); // Checkin' if the browser is being sus 🤨
            this.protectAgainstProxies(); // No sneaky proxies 🙅
            this.addPerformanceChecks(); // Watchin' the performance like a hawk 🦅
            this.protectIframes(); // Keepin' it secure in iframes too 🪟
        },

        // Browser-specific protection initialization, keeping it 💯
        initBrowserSpecificProtection() {
            if (browserChecks.isChrome) {
                this.initChromeProtection(); // Chrome, we got you!
            } else if (browserChecks.isFirefox) {
                this.initFirefoxProtection(); // Firefox, stay slick!
            } else if (browserChecks.isSafari) {
                this.initSafariProtection(); // Safari, keep it classy!
            } else if (browserChecks.isEdge) {
                this.initEdgeProtection(); // Edge, we see you!
            }
        },

        // Chrome-specific protection, for the real ones 😎
        initChromeProtection() {
            // Detect Chrome DevTools protocol, we're not playin'
            const checkChromeDevTools = () => {
                const devtools = /./;
                devtools.toString = () => {
                    this.handleDevToolsDetection(); // We caught you!
                    return 'devtools';
                };
                console.log(devtools); // Keepin' an eye on ya!
            };
            setInterval(checkChromeDevTools, 1000); // Checking every second

            // Detect Chrome extensions, they can't hide from us!
            if (chrome && chrome.runtime) {
                this.handleDevToolsDetection(); // Busted!
            }
        },

        // Firefox-specific protection, keepin' it 🔥
        initFirefoxProtection() {
            // Detect Firebug, we remember that tool 👀
            if (window.Firebug && window.Firebug.chrome && window.Firebug.chrome.isInitialized) {
                this.handleDevToolsDetection(); // Not on our watch!
            }

            // Detect Firefox devtools, sneaky!
            const checkFirefoxDevTools = () => {
                if (typeof InstallTrigger !== 'undefined') {
                    const element = document.createElement('div');
                    Object.defineProperty(element, 'id', {
                        get: () => {
                            this.handleDevToolsDetection(); // Caught red-handed!
                            throw new Error('DevTools detected');
                        }
                    });
                    console.log(element);
                }
            };
            setInterval(checkFirefoxDevTools, 1000); // Checkin' every second
        },

         // Safari-specific protection, keeping it stylish 💅
        initSafariProtection() {
             // Detect Safari Web Inspector, we're not fooled 🤨
           const checkSafariDevTools = () => {
            if (/^((?!chrome|android).)*safari/i.test(navigator.userAgent)) {
            const element = document.createElement('div');
            element.__defineGetter__('id', () => {
            this.handleDevToolsDetection(); // Gotcha!
            throw new Error('DevTools detected');
            });
             console.log(element);
               }
           };
             setInterval(checkSafariDevTools, 1000); // Every sec
        },


        // Edge-specific protection, we see you, Edge 👀
        initEdgeProtection() {
            // Detect Edge DevTools, they can't hide 
            if (browserChecks.isEdge) {
                const checkEdgeDevTools = () => {
                    const element = document.createElement('div');
                    Object.defineProperty(element, 'id', {
                        get: () => {
                            this.handleDevToolsDetection(); // We know what you're doin'!
                            throw new Error('DevTools detected');
                        }
                    });
                    console.log(element);
                };
                setInterval(checkEdgeDevTools, 1000); // Checkin' every second
            }
        },

         // Add browser-specific checks, to stay sharp 💯
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
                    this.handleDevToolsDetection(); // Catch em all!
                      }
                  } catch (e) {}
                });
          }, this.config.checkInterval); // Checkin' at the configured interval
       },

        // Protect against proxies, no sneaky moves 🙅‍♂️
        protectAgainstProxies() {
            const handler = {
                get: (target, prop) => {
                    this.handleDevToolsDetection(); // We got our eyes on ya!
                    return target[prop];
                }
            };

            // Protect key objects, keepin' it secure 💪
            ['console', 'debugger', 'performance'].forEach(obj => {
                if (window[obj]) {
                    try {
                        window[obj] = new Proxy(window[obj], handler);
                    } catch (e) {}
                }
            });
        },

        // Add performance checks, watchin' the speed ⚡️
        addPerformanceChecks() {
            const checkPerformance = () => {
                const now = Date.now();
                const timeDiff = now - this.lastPerformanceCheck;

                if (timeDiff > 100) { // Debugging detected
                    this.handleDevToolsDetection(); // Busted!
                }

                this.lastPerformanceCheck = now; // Updating last check
            };

            setInterval(checkPerformance, 50); // Check frequently
        },

         // Advanced console protection, no peeking! 👀
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


        // Enhanced debugger protection, not on our watch! 🙅‍♀️
        protectDebugger() {
            const loops = ['setInterval', 'requestAnimationFrame'];
            loops.forEach(loop => {
                window[loop](() => {
                    debugger; // Tricky!
                    this.checkPerformance(); // We're onto you!
                }, 50);
            });
        },

        // Performance check to detect stepping through code, keepin it real 💪
        checkPerformance() {
            const start = performance.now();
            debugger; // You can't hide from us 
            const end = performance.now();
            if (end - start > 100) {
                this.handleDevToolsDetection(); // Busted!
            }
        },

       // Protect against keyboard shortcuts with additional combinations, no sneaky fingers! 🙅‍♂️
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
                       this.handleDevToolsDetection(); // Caught in the act!
                      return false;
                   }
               }
            }, true);

            // Prevent key combinations even if modifier keys are pressed in different order, we're thorough!
           window.addEventListener('keyup', (event) => {
              if (event.keyCode in protectedKeys) {
                event.preventDefault();
                 event.stopPropagation();
                 return false;
              }
             }, true);
        },

        // Enhanced DevTools detection, stay sharp! 👀
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
                   this.handleDevToolsDetection(); // Busted!
                }
           }, this.config.checkInterval); // Keepin' it on the reg
       },

       // Protect against source mapping with enhanced security, no source code for you! 🙅‍♂️
        protectSourceMapping() {
          const removeSourceMaps = () => {
            document.querySelectorAll('*').forEach(element => {
                 ['sourceMappingURL', 'sourceURL'].forEach(attr => {
                    element.removeAttribute(attr); // Gotta hide those maps!
                 });
             });
            };

           const observer = new MutationObserver((mutations) => {
             removeSourceMaps();
             mutations.forEach(mutation => {
             if (mutation.type === 'attributes' &&
                     /source(URL|MappingURL)/.test(mutation.attributeName)) {
                   this.handleDevToolsDetection(); // We know what you're up to!
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

         // Protect against monkey patching, rules are rules! 🙅‍♀️
        protectAgainstMonkeyPatching() {
           const protectedProps = ['console', 'debugger', 'eval', 'setTimeout'];
           protectedProps.forEach(prop => {
                 Object.defineProperty(window, prop, {
                 configurable: false, // Can't be changed
                writable: false // Can't be written
              });
          });
      },

        // Protect eval, no running scripts behind our backs 🙅‍♂️
        protectEval() {
          window.eval = new Proxy(window.eval, {
            apply: (target, thisArg, args) => {
                 this.handleDevToolsDetection(); // Nope!
                return target.apply(thisArg, args); // Still running it through to trigger error
              }
          });
     },

        // Protect setTimeout to prevent code injection, keepin' it safe and sound 🛡️
        protectSetTimeout() {
           window.setTimeout = new Proxy(window.setTimeout, {
                apply: (target, thisArg, args) => {
                    if (typeof args[0] === 'string') {
                        this.handleDevToolsDetection(); // Not gonna allow that!
                        return;
                   }
                  return target.apply(thisArg, args);
                }
            });
     },


       // Additional protection measures, level up! 💪
        addExtraProtection() {
           // Prevent iframe debugging, no nesting allowed
           if (window.top !== window.self) {
               window.top.location = window.self.location;
            }

          // Disable stack traces, can't follow the breadcrumbs 🍞
             Error.stackTraceLimit = 0;

          // Prevent debugging through Function constructor, no creating loopholes
          window.Function = new Proxy(window.Function, {
            construct: (target, args) => {
                 this.handleDevToolsDetection(); // Gotcha!
                 return target(...args); // Still running it through to trigger error
           }
         });
      },


        // Obfuscate the script itself, makin' it unreadable! 😵‍💫
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
        
        // Advanced iframe protection system 🔒, keepin' things locked down!
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
                        self.handleDevToolsOpen(); // We caught you!
                   }
                 return true;
              }
             return false;
         }

            // Add frame protection headers
            function addFrameProtectionHeaders() {
                try {
                   // Set CSP headers, keepin' it secure 
                    const meta = document.createElement('meta');
                   meta.httpEquiv = 'Content-Security-Policy';
                    meta.content = "frame-ancestors 'none'";
                    document.head.appendChild(meta);

                   // Set X-Frame-Options, no funny business 🙅
                    const xfo = document.createElement('meta');
                    xfo.httpEquiv = 'X-Frame-Options';
                    xfo.content = 'DENY';
                    document.head.appendChild(xfo);
                } catch (e) {
                    self.handleDevToolsOpen(); // Something went wrong!
              }
          }

            // Protect against iframe resizing, keep it the right size! 📏
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

            // Initialize protection, let's get to it! 💪
            try {
               // Add frame protection headers, keeping it all safe! 
               addFrameProtectionHeaders();

               // Initial checks
               if (isInIframe()) {
                    if (!verifyParentDomain()) {
                        this.handleDevToolsOpen(); // Can't trust this iframe!
                   }
                }

              // Set up continuous monitoring
              const protectionInterval = setInterval(() => {
                 if (detectIframeManipulation()) {
                     clearInterval(protectionInterval);
                     this.handleDevToolsOpen(); // Busted!
                    }
                   protectAgainstResizing(); // Keepin it safe!
              }, protectionConfig.interval);

              // Add window blur protection
                window.addEventListener('blur', () => {
                    if (document.activeElement.tagName === 'IFRAME') {
                        this.handleDevToolsOpen(); // You were in an iframe, busted!
                    }
                });

              // Block iframe creation
               const observer = new MutationObserver((mutations) => {
                    mutations.forEach((mutation) => {
                       mutation.addedNodes.forEach((node) => {
                            if (node.tagName === 'IFRAME') {
                             node.remove();
                                this.handleDevToolsOpen(); // No new iframes!
                           }
                        });
                    });
               });

                observer.observe(document.documentElement, {
                    childList: true,
                    subtree: true
               });
          } catch (e) {
             this.handleDevToolsOpen(); // Something went wrong
          }
       },


        // Enhanced DevTools detection handler, let's take action! 🚀
        handleDevToolsDetection() {
            this.detectionCount++;

            if (this.detectionCount >= this.config.maxTriggers) {
                // Clear all storage, no evidence left behind! 🗑️
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
                
                 // Remove all event listeners, fresh start!
                const clone = document.body.cloneNode(true);
                document.body.parentNode.replaceChild(clone, document.body);
                
               // Clear the page with browser-specific message, we're keeping it real
                let browserName = '';
                if (browserChecks.isChrome) browserName = 'Chrome';
                 else if (browserChecks.isFirefox) browserName = 'Firefox';
                else if (browserChecks.isSafari) browserName = 'Safari';
                else if (browserChecks.isEdge) browserName = 'Edge';
               else if (browserChecks.isOpera) browserName = 'Opera';
               else browserName = 'your browser';
                
                 document.body.innerHTML = `${this.config.warningMessage}<br>DevTools detected in ${browserName}!`;
                
              // Random delay before redirect, addin' some spice! 🌶️
                 const randomDelay = Math.floor(Math.random() * 500) + 500;
                 setTimeout(() => {
                    window.location.href = this.config.redirectURL; // Time to go
                }, randomDelay);
                
                this.detectionCount = 0; // Resetting the counter
            }
        },

           // Disable right-click, no sneaky clicks! 🙅‍♂️
        disableRightClick() {
             document.addEventListener('contextmenu', (event) => {
                 event.preventDefault(); // Stop that right-click!
                  this.handleDevToolsDetection(); // You thought you were sneaky!
             });
         },

          // Inject fake code, throwing in some red herrings 🎣
          injectFakeCode() {
             const fakeCode = `
                function fakeFunction1() {
                    console.log('This is a fake function!');
                }
             
                function fakeFunction2() {
                 if (window.location.href === 'about:blank') return;
                    console.log('Another fake one here');
                }
             
                 try{fakeFunction1();fakeFunction2();}catch(e){}
               
            `;
            const script = document.createElement('script');
           script.textContent = fakeCode;
           document.head.appendChild(script);
        }
    };

    // Initialize protection immediately and after DOM load, let's do this! 💪
    HAI.init();
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => HAI.init()); // Waiting for the DOM to load
    }
})();
