// Protected by SecureZone by HelpingAI 🛡️
// Ultimate Browser Protection System

(function() {
    'use strict';

    const UltimateProtector = {
        config: {
            interval: 50,
            maxAttempts: 3,
            protectedMessage: '🔒 Protected by SecureZone 🔒',
            noiseInterval: 0,
            noiseAmount: 100
        },

        state: {
            attempts: 0,
            isProtected: false,
            initialElements: 0,
            mouseEvents: new Set(),
            lastPerformance: performance.now()
        },

        init() {
            this.initializeState();
            this.setupAdvancedProtection();
            this.startContinuousMonitoring();
        },

        // Initialize protection state
        initializeState() {
            // Store initial element count
            this.state.initialElements = document.getElementsByTagName('*').length;
            
            // Track mouse events
            document.addEventListener('mousemove', e => this.trackMouseEvent(e), true);
            document.addEventListener('mousedown', e => this.trackMouseEvent(e), true);
            
            // Initialize performance monitoring
            this.state.lastPerformance = performance.now();
        },

        // Setup all protection mechanisms
        setupAdvancedProtection() {
            this.protectAgainstDevTools();
            this.protectAgainstInspection();
            this.protectAgainstNetworkTab();
            this.protectAgainstRightClick();
            this.addExtraProtection();
        },

        // Advanced DevTools Detection
        protectAgainstDevTools() {
            const self = this;

            // Element count detection
            setInterval(() => {
                const currentElements = document.getElementsByTagName('*').length;
                if (currentElements !== this.state.initialElements) {
                    this.handleViolation('Element count changed');
                }
            }, this.config.interval);

            // Console detection using CSS
            const detectConsole = () => {
                const element = new Image();
                const originalGetter = element.__lookupGetter__('id');
                
                element.__defineGetter__('id', function() {
                    self.handleViolation('Console accessed');
                    return originalGetter ? originalGetter.call(this) : '';
                });

                // Try to trigger the getter
                console.log(element);
                console.dir(element);
            };
            setInterval(detectConsole, this.config.interval);

            // Size detection
            const detectSize = () => {
                const widthThreshold = window.outerWidth - window.innerWidth > 160;
                const heightThreshold = window.outerHeight - window.innerHeight > 160;
                if (widthThreshold || heightThreshold) {
                    this.handleViolation('Window size manipulation detected');
                }
            };
            setInterval(detectSize, this.config.interval);

            // Performance detection
            const detectPerformance = () => {
                const now = performance.now();
                const timeDiff = now - this.state.lastPerformance;
                if (timeDiff > 100) {
                    this.handleViolation('Performance anomaly detected');
                }
                this.state.lastPerformance = now;
            };
            setInterval(detectPerformance, this.config.interval);
        },

        // Protect against element inspection
        protectAgainstInspection() {
            // Prevent inspect
            document.addEventListener('inspect', e => {
                e.preventDefault();
                this.handleViolation('Inspect attempt detected');
                return false;
            }, true);

            // Prevent context menu
            document.addEventListener('contextmenu', e => {
                e.preventDefault();
                this.handleViolation('Context menu attempt detected');
                return false;
            }, true);

            // Prevent selection
            document.addEventListener('selectstart', e => {
                e.preventDefault();
                return false;
            }, true);

            // Prevent copy
            document.addEventListener('copy', e => {
                e.preventDefault();
                return false;
            }, true);

            // Advanced element protection
            const protectElement = (element) => {
                element.style.userSelect = 'none';
                element.style.webkitUserSelect = 'none';
                element.style.mozUserSelect = 'none';
                element.style.msUserSelect = 'none';
                element.oncontextmenu = () => false;
                element.onselectstart = () => false;
            };

            // Protect all elements
            const elements = document.getElementsByTagName('*');
            for (let element of elements) {
                protectElement(element);
            }

            // Protect new elements
            const observer = new MutationObserver((mutations) => {
                mutations.forEach((mutation) => {
                    mutation.addedNodes.forEach((node) => {
                        if (node.nodeType === 1) { // ELEMENT_NODE
                            protectElement(node);
                        }
                    });
                });
            });

            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });
        },

        // Protect against network tab
        protectAgainstNetworkTab() {
            // Create console noise
            const createNoise = () => {
                const noop = () => {};
                const start = performance.now();
                
                while (performance.now() - start < 1) {
                    for (let i = 0; i < this.config.noiseAmount; i++) {
                        noop();
                        console.log(Math.random());
                        console.clear();
                    }
                }
            };

            // Start noise generation
            setInterval(createNoise, this.config.noiseInterval);

            // Intercept XMLHttpRequest
            const originalXHR = window.XMLHttpRequest;
            window.XMLHttpRequest = function() {
                const xhr = new originalXHR();
                const originalOpen = xhr.open;
                
                xhr.open = function() {
                    createNoise();
                    return originalOpen.apply(this, arguments);
                };
                
                return xhr;
            };

            // Intercept fetch
            const originalFetch = window.fetch;
            window.fetch = function() {
                createNoise();
                return originalFetch.apply(this, arguments);
            };
        },

        // Advanced right-click protection
        protectAgainstRightClick() {
            const self = this;
            
            // Track suspicious mouse behavior
            const trackMouseEvent = (e) => {
                this.state.mouseEvents.add({
                    type: e.type,
                    button: e.button,
                    timestamp: Date.now()
                });

                // Clean old events
                const now = Date.now();
                this.state.mouseEvents = new Set(
                    Array.from(this.state.mouseEvents)
                        .filter(event => now - event.timestamp < 1000)
                );

                // Check for suspicious patterns
                if (this.detectSuspiciousMousePattern()) {
                    this.handleViolation('Suspicious mouse pattern detected');
                }
            };

            // Prevent right click
            document.addEventListener('mousedown', e => {
                if (e.button === 2) {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleViolation('Right-click attempt detected');
                    return false;
                }
                trackMouseEvent(e);
            }, true);

            // Prevent keyboard shortcuts
            document.addEventListener('keydown', e => {
                // Prevent common inspection shortcuts
                if (
                    (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
                    (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
                    (e.ctrlKey && e.keyCode === 85) ||               // Ctrl+U
                    e.keyCode === 123                                // F12
                ) {
                    e.preventDefault();
                    this.handleViolation('Keyboard shortcut detected');
                    return false;
                }
            }, true);
        },

        // Add extra protection layers
        addExtraProtection() {
            // Protect against debugger
            setInterval(() => {
                debugger;
            }, this.config.interval);

            // Protect against source mapping
            const removeSourceMapping = () => {
                const scripts = document.getElementsByTagName('script');
                for (let script of scripts) {
                    script.removeAttribute('sourceMappingURL');
                }
            };
            removeSourceMapping();
            
            // Monitor for new scripts
            const observer = new MutationObserver(removeSourceMapping);
            observer.observe(document.documentElement, {
                childList: true,
                subtree: true
            });

            // Protect against timing attacks
            const originalDate = Date;
            const originalPerformance = performance;
            
            // Override timing functions
            Object.defineProperties(window, {
                Date: {
                    get: () => {
                        this.handleViolation('Timing access detected');
                        return originalDate;
                    }
                },
                performance: {
                    get: () => {
                        this.handleViolation('Performance access detected');
                        return originalPerformance;
                    }
                }
            });
        },

        // Detect suspicious mouse patterns
        detectSuspiciousMousePattern() {
            const events = Array.from(this.state.mouseEvents);
            
            // Check for rapid right clicks
            const rightClicks = events.filter(e => 
                e.button === 2 && 
                e.type === 'mousedown'
            ).length;
            
            if (rightClicks >= 3) {
                return true;
            }

            // Check for suspicious timing patterns
            const timestamps = events.map(e => e.timestamp).sort();
            for (let i = 1; i < timestamps.length; i++) {
                if (timestamps[i] - timestamps[i-1] < 50) {
                    return true;
                }
            }

            return false;
        },

        // Handle security violations
        handleViolation(reason) {
            this.state.attempts++;
            console.warn(this.config.protectedMessage);
            
            if (this.state.attempts >= this.config.maxAttempts) {
                // Clear storage
                try {
                    localStorage.clear();
                    sessionStorage.clear();
                } catch (e) {}
                
                // Reload page
                location.reload();
            }
        },

        // Start continuous monitoring
        startContinuousMonitoring() {
            setInterval(() => {
                if (!this.state.isProtected) {
                    location.reload();
                }
            }, this.config.interval);
        }
    };

    // Initialize protection
    try {
        UltimateProtector.state.isProtected = true;
        UltimateProtector.init();
    } catch (e) {
        location.reload();
    }
})();
