// Protected by SecureZone by HelpingAI 🛡️
// Ultimate Console Protection

(function() {
    'use strict';

    const ConsoleProtector = {
        config: {
            interval: 50,
            maxAttempts: 3,
            protectedMessage: '🔒 Console Disabled 🔒',
            debugStrings: [
                'debug',
                'console',
                'log',
                'debugger',
                'inspect'
            ]
        },

        state: {
            attempts: 0,
            isProtected: false,
            originalConsole: { ...console },
            overriddenMethods: new Set()
        },

        init() {
            this.disableConsole();
            this.protectAgainstRestore();
            this.addExtraProtection();
            this.monitorConsole();
            this.protectErrors();
        },

        // Advanced console protection
        disableConsole() {
            const self = this;
            
            // All console methods to protect
            const methods = [
                // Standard methods
                'log', 'debug', 'info', 'warn', 'error', 'clear',
                // Debugging methods
                'dir', 'dirxml', 'trace', 'assert', 'count', 'countReset',
                // Grouping methods
                'group', 'groupCollapsed', 'groupEnd',
                // Timing methods
                'time', 'timeLog', 'timeEnd', 'timeStamp',
                // Profiling methods
                'profile', 'profileEnd',
                // Table and tree methods
                'table', 'markTimeline', 'timeline', 'timelineEnd',
                // Memory methods
                'memory'
            ];

            // Create secure noop function
            const secureNoop = Object.defineProperties(
                () => undefined,
                {
                    toString: {
                        value: () => 'function () { [native code] }',
                        configurable: false,
                        writable: false
                    },
                    caller: {
                        value: null,
                        configurable: false,
                        writable: false
                    },
                    length: {
                        value: 0,
                        configurable: false,
                        writable: false
                    }
                }
            );

            // Protect each method
            methods.forEach(method => {
                try {
                    // Store original method
                    if (console[method]) {
                        this.state.originalConsole[method] = console[method];
                    }

                    // Create protected method
                    const protectedMethod = Object.create(secureNoop);
                    
                    // Add extra protection
                    Object.defineProperties(protectedMethod, {
                        name: {
                            value: method,
                            configurable: false,
                            writable: false
                        },
                        apply: {
                            value: secureNoop,
                            configurable: false,
                            writable: false
                        },
                        bind: {
                            value: secureNoop,
                            configurable: false,
                            writable: false
                        },
                        call: {
                            value: secureNoop,
                            configurable: false,
                            writable: false
                        }
                    });

                    // Override the method
                    Object.defineProperty(console, method, {
                        get: () => {
                            self.checkTampering();
                            return protectedMethod;
                        },
                        set: () => {
                            self.checkTampering();
                            return false;
                        },
                        configurable: false,
                        enumerable: true
                    });

                    this.state.overriddenMethods.add(method);
                } catch (e) {
                    // Silently fail
                }
            });

            // Protect console object itself
            Object.defineProperty(window, 'console', {
                get: () => {
                    self.checkTampering();
                    return console;
                },
                set: () => {
                    self.checkTampering();
                    return false;
                },
                configurable: false
            });
        },

        // Protect against console restoration
        protectAgainstRestore() {
            const self = this;

            // Monitor prototype chain
            const protectedProto = Object.create(null);
            Object.setPrototypeOf(console, protectedProto);

            // Freeze console object
            Object.freeze(console);
            Object.freeze(protectedProto);

            // Protect __proto__
            Object.defineProperty(Object.prototype, '__proto__', {
                get: function() {
                    if (this === console) {
                        self.checkTampering();
                        return protectedProto;
                    }
                    return Object.getPrototypeOf(this);
                },
                set: function(value) {
                    if (this === console) {
                        self.checkTampering();
                        return false;
                    }
                    return Object.setPrototypeOf(this, value);
                },
                configurable: false
            });
        },

        // Add extra protection layers
        addExtraProtection() {
            // Protect Function constructor
            const originalFunction = window.Function;
            window.Function = new Proxy(originalFunction, {
                construct: (target, args) => {
                    const code = args.join('');
                    if (this.config.debugStrings.some(str => code.includes(str))) {
                        this.checkTampering();
                        return () => undefined;
                    }
                    return new target(...args);
                },
                apply: (target, thisArg, args) => {
                    const code = args.join('');
                    if (this.config.debugStrings.some(str => code.includes(str))) {
                        this.checkTampering();
                        return undefined;
                    }
                    return target.apply(thisArg, args);
                }
            });

            // Protect eval
            const originalEval = window.eval;
            window.eval = new Proxy(originalEval, {
                apply: (target, thisArg, args) => {
                    const code = String(args[0]);
                    if (this.config.debugStrings.some(str => code.includes(str))) {
                        this.checkTampering();
                        return undefined;
                    }
                    return target.apply(thisArg, args);
                }
            });
        },

        // Monitor console state
        monitorConsole() {
            setInterval(() => {
                this.state.overriddenMethods.forEach(method => {
                    if (console[method] && console[method]() !== undefined) {
                        this.checkTampering();
                    }
                });
            }, this.config.interval);
        },

        // Protect error messages
        protectErrors() {
            // Override Error constructor
            const originalError = window.Error;
            window.Error = function(message) {
                return new originalError(
                    message.replace(/console|debug|log/gi, '[blocked]')
                );
            };
            window.Error.prototype = originalError.prototype;

            // Protect stack traces
            Object.defineProperty(Error.prototype, 'stack', {
                get: function() {
                    return this.message;
                },
                configurable: false
            });
        },

        // Handle tampering attempts
        checkTampering() {
            this.state.attempts++;
            if (this.state.attempts >= this.config.maxAttempts) {
                location.reload();
            }
        }
    };

    // Initialize protection
    try {
        ConsoleProtector.state.isProtected = true;
        ConsoleProtector.init();
    } catch (e) {
        location.reload();
    }

    // Continuous protection check
    setInterval(() => {
        if (!ConsoleProtector.state.isProtected) {
            location.reload();
        }
    }, 100);
})();
