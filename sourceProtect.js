// Protected by SecureZone by HelpingAI 🛡️
// Ultimate Source Code Protection

(function() {
    'use strict';

    const sourceProtect = {
        config: {
            encryptionKey: Math.random().toString(36).substring(7) + Date.now(),
            protectedMessage: '🔒 Protected by SecureZone 🔒',
            enableConsoleWarning: true,
            maxDecryptAttempts: 3,
            checkInterval: 50
        },

        state: {
            decryptAttempts: 0,
            lastCheck: Date.now(),
            originalScripts: new WeakMap(),
            isProtected: false
        },

        init() {
            this.initAdvancedProtection();
            this.setupSourceCodeEncryption();
            this.protectAgainstInspection();
            this.setupAdditionalProtection();
            this.protectAgainstDebugging();
            this.setupAntiTampering();
            this.setupCodeObfuscation();
            this.protectStrings();
            this.addHoneypots();
        },

        // Initialize advanced protection
        initAdvancedProtection() {
            const self = this;
            Object.keys(this).forEach(key => {
                const original = this[key];
                if (typeof original === 'function') {
                    this[key] = new Proxy(original, {
                        apply: (target, thisArg, args) => {
                            if (self.state.isProtected) {
                                return target.apply(thisArg, args);
                            }
                            throw new Error('Security violation detected');
                        }
                    });
                }
            });

            const protectionCode = this.toString();
            setInterval(() => {
                if (this.toString() !== protectionCode) {
                    location.reload();
                }
            }, this.config.checkInterval);
        },

        // Enhanced source code encryption
        setupSourceCodeEncryption() {
            const self = this;

            function encryptCode(code) {
                try {
                    let encrypted = btoa(unescape(encodeURIComponent(code)));
                    encrypted = self.xorEncrypt(encrypted, self.config.encryptionKey);
                    encrypted = self.addCodeNoise(encrypted);
                    return self.shuffleString(encrypted);
                } catch (e) {
                    return self.config.protectedMessage;
                }
            }

            function xorEncrypt(text, key) {
                return text.split('').map((char, i) => 
                    String.fromCharCode(char.charCodeAt(0) ^ key.charCodeAt(i % key.length))
                ).join('');
            }

            function addCodeNoise(code) {
                const noise = Array(10).fill().map(() => 
                    Math.random().toString(36).substring(2)
                ).join('');
                return code.split('').map(c => 
                    c + noise[Math.floor(Math.random() * noise.length)]
                ).join('');
            }

            function shuffleString(str) {
                const arr = str.split('');
                for (let i = arr.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [arr[i], arr[j]] = [arr[j], arr[i]];
                }
                return arr.join('');
            }

            function protectExternalScript(script) {
                const xhr = new XMLHttpRequest();
                xhr.open('GET', script.src, false);
                xhr.onreadystatechange = () => {
                    if (xhr.readyState === 4 && xhr.status === 200) {
                        script.textContent = encryptCode(xhr.responseText);
                        script.removeAttribute('src');
                    }
                };
                try {
                    xhr.send();
                } catch (e) {
                    script.textContent = self.config.protectedMessage;
                }
            }

            function protectScripts() {
                document.querySelectorAll('script').forEach(script => {
                    if (!self.state.originalScripts.has(script)) {
                        self.state.originalScripts.set(script, script.cloneNode(true));
                        
                        if (script.src) {
                            protectExternalScript(script);
                        } else if (!script.textContent.includes('sourceProtect')) {
                            script.textContent = encryptCode(script.textContent);
                        }
                    }
                });
            }

            // Assign methods to this
            this.xorEncrypt = xorEncrypt;
            this.addCodeNoise = addCodeNoise;
            this.shuffleString = shuffleString;

            // Set up observer
            const observer = new MutationObserver((mutations) => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (node.tagName === 'SCRIPT') {
                            protectScripts();
                        }
                    });
                });
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });

            // Initial protection
            protectScripts();
        },

        // Advanced code obfuscation
        setupCodeObfuscation() {
            const fakeNames = ['init', 'process', 'execute', 'validate', 'check'];
            fakeNames.forEach(name => {
                window[`_${name}_${Math.random().toString(36).substr(2)}`] = 
                    new Function('return false');
            });

            const trap = new Proxy({}, {
                get: () => {
                    this.state.decryptAttempts++;
                    if (this.state.decryptAttempts > this.config.maxDecryptAttempts) {
                        location.reload();
                    }
                    return trap;
                }
            });
            window._secretData = trap;
        },

        // Protect strings
        protectStrings() {
            const originalString = String;
            String = new Proxy(String, {
                construct: (target, args) => {
                    if (args[0] && args[0].includes('debugger')) {
                        return new target(this.config.protectedMessage);
                    }
                    return new target(...args);
                }
            });
            String.prototype = originalString.prototype;
        },

        // Add honeypots
        addHoneypots() {
            const honeypot = document.createElement('div');
            honeypot.style.display = 'none';
            honeypot.innerHTML = `
                <script>
                    // Decryption key: ${Math.random().toString(36).substring(7)}
                    // Source map: sourcemap.js.map
                    // Debug mode: enabled
                </script>
            `;
            document.body.appendChild(honeypot);

            const observer = new MutationObserver(() => {
                location.reload();
            });
            observer.observe(honeypot, {
                attributes: true,
                childList: true,
                subtree: true
            });
        },

        // Anti-tampering protection
        setupAntiTampering() {
            const protectObject = (obj, name) => {
                const handler = {
                    set: () => false,
                    defineProperty: () => false,
                    deleteProperty: () => false,
                    preventExtensions: () => false,
                    setPrototypeOf: () => false
                };
                Object.freeze(obj.prototype);
                Object.freeze(obj);
                window[name] = new Proxy(obj, handler);
            };

            ['Object', 'Function', 'String', 'Array'].forEach(name => {
                protectObject(window[name], name);
            });

            Object.freeze(window);
            Object.freeze(document);
        },

        // Protect against inspection
        protectAgainstInspection() {
            ['text', 'textContent', 'innerText', 'innerHTML'].forEach(prop => {
                Object.defineProperty(HTMLScriptElement.prototype, prop, {
                    get: () => this.config.protectedMessage,
                    set: () => true,
                    configurable: false
                });
            });

            document.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.keyCode === 85) {
                    e.preventDefault();
                    return false;
                }
            });

            document.addEventListener('contextmenu', (e) => {
                if (e.target.tagName === 'SCRIPT') {
                    e.preventDefault();
                    return false;
                }
            });
        },

        // Additional protection
        setupAdditionalProtection() {
            document.querySelectorAll('*[sourcemappingurl]').forEach(el => {
                el.removeAttribute('sourcemappingurl');
            });

            Error.stackTraceLimit = 0;

            window.addEventListener('keydown', (e) => {
                if ((e.ctrlKey || e.metaKey) && e.keyCode === 83) {
                    e.preventDefault();
                    return false;
                }
            });
        },

        // Protect against debugging
        protectAgainstDebugging() {
            if (this.config.enableConsoleWarning) {
                const noop = () => this.config.protectedMessage;
                ['log', 'info', 'warn', 'error', 'debug'].forEach(method => {
                    console[method] = noop;
                });
            }

            setInterval(() => {
                const start = performance.now();
                debugger;
                const end = performance.now();
                if (end - start > 100) {
                    location.reload();
                }
            }, 1000);
        }
    };

    // Initialize with self-protection
    try {
        sourceProtect.state.isProtected = true;
        sourceProtect.init();
    } catch (e) {
        location.reload();
    }

    // Continuous protection check
    setInterval(() => {
        if (!sourceProtect.state.isProtected) {
            location.reload();
        }
    }, 100);
})();
