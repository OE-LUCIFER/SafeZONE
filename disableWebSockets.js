// Protected by SecureZone by HelpingAI 🛡️
// Ultimate WebSocket Protection

(function() {
    'use strict';

    const WebSocketProtector = {
        config: {
            interval: 100,
            maxReconnectAttempts: 3,
            blacklistedPatterns: [
                /devtools/gi,
                /debug/gi,
                /inspect/gi,
                /hack/gi
            ],
            encryptionKey: Math.random().toString(36).substring(7) + Date.now(),
            protectedMessage: '🔒 Protected WebSocket 🔒'
        },

        state: {
            connections: new Map(),
            reconnectAttempts: 0,
            isProtected: false,
            originalWebSocket: window.WebSocket
        },

        init() {
            this.setupWebSocketProtection();
            this.monitorConnections();
            this.protectAgainstTampering();
            this.addMessageEncryption();
            this.setupConnectionMonitoring();
        },

        // Advanced WebSocket Protection
        setupWebSocketProtection() {
            const self = this;
            
            // Create protected WebSocket constructor
            window.WebSocket = function(url, protocols) {
                // Validate connection
                if (!self.validateConnection(url)) {
                    throw new Error('Invalid WebSocket connection');
                }

                // Create WebSocket with protection
                const ws = new self.state.originalWebSocket(url, protocols);
                const connectionId = Math.random().toString(36).substr(2);
                
                // Store connection
                self.state.connections.set(connectionId, {
                    url,
                    protocols,
                    timestamp: Date.now(),
                    messageCount: 0
                });

                // Protect WebSocket properties
                self.protectWebSocketProperties(ws);

                // Add message protection
                self.addMessageProtection(ws);

                // Add event protection
                self.protectEventHandlers(ws);

                return ws;
            };

            // Maintain prototype chain
            window.WebSocket.prototype = this.state.originalWebSocket.prototype;
            Object.freeze(window.WebSocket);
            Object.freeze(window.WebSocket.prototype);
        },

        // Validate WebSocket connection
        validateConnection(url) {
            try {
                const wsUrl = new URL(url);
                // Check protocol
                if (!['ws:', 'wss:'].includes(wsUrl.protocol)) {
                    return false;
                }
                // Check blacklisted patterns
                return !this.config.blacklistedPatterns.some(pattern => 
                    pattern.test(url)
                );
            } catch (e) {
                return false;
            }
        },

        // Protect WebSocket properties
        protectWebSocketProperties(ws) {
            const protectedProps = {
                binaryType: ws.binaryType,
                bufferedAmount: 0,
                extensions: '',
                protocol: ws.protocol,
                readyState: ws.readyState,
                url: ws.url
            };

            Object.keys(protectedProps).forEach(prop => {
                Object.defineProperty(ws, prop, {
                    get: () => protectedProps[prop],
                    set: () => false,
                    configurable: false
                });
            });
        },

        // Add message encryption and protection
        addMessageProtection(ws) {
            const self = this;
            
            // Protect send method
            const originalSend = ws.send;
            ws.send = function(data) {
                try {
                    // Encrypt data before sending
                    const encryptedData = self.encryptMessage(data);
                    return originalSend.call(this, encryptedData);
                } catch (e) {
                    throw new Error('Message blocked');
                }
            };

            // Protect receive method
            Object.defineProperty(ws, 'onmessage', {
                get: function() {
                    return this._onmessage;
                },
                set: function(fn) {
                    this._onmessage = function(event) {
                        try {
                            // Decrypt and sanitize incoming data
                            event.data = self.processIncomingMessage(event.data);
                            fn.call(this, event);
                        } catch (e) {
                            console.warn('Message blocked');
                        }
                    };
                },
                configurable: false
            });
        },

        // Protect event handlers
        protectEventHandlers(ws) {
            const events = ['open', 'close', 'error'];
            events.forEach(event => {
                const eventProp = 'on' + event;
                Object.defineProperty(ws, eventProp, {
                    get: function() {
                        return this['_' + eventProp];
                    },
                    set: function(fn) {
                        this['_' + eventProp] = function(event) {
                            try {
                                // Validate event before calling handler
                                if (this.validateEvent(event)) {
                                    fn.call(this, event);
                                }
                            } catch (e) {
                                console.warn('Event blocked');
                            }
                        };
                    },
                    configurable: false
                });
            });
        },

        // Message encryption
        encryptMessage(data) {
            try {
                if (typeof data === 'string') {
                    // XOR encryption
                    return data.split('').map((char, i) => 
                        String.fromCharCode(char.charCodeAt(0) ^ 
                        this.config.encryptionKey.charCodeAt(i % this.config.encryptionKey.length))
                    ).join('');
                }
                return data;
            } catch (e) {
                return this.config.protectedMessage;
            }
        },

        // Process incoming messages
        processIncomingMessage(data) {
            if (typeof data === 'string') {
                // Remove potentially harmful content
                data = data.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
                
                // Decrypt data
                data = this.encryptMessage(data); // XOR encryption works both ways
                
                // Sanitize against blacklisted patterns
                this.config.blacklistedPatterns.forEach(pattern => {
                    data = data.replace(pattern, '');
                });
            }
            return data;
        },

        // Monitor WebSocket connections
        setupConnectionMonitoring() {
            setInterval(() => {
                this.state.connections.forEach((conn, id) => {
                    // Check for suspicious activity
                    if (this.isConnectionSuspicious(conn)) {
                        this.terminateConnection(id);
                    }
                });
            }, this.config.interval);
        },

        // Check for suspicious connection activity
        isConnectionSuspicious(conn) {
            const now = Date.now();
            return (
                conn.messageCount > 1000 || // Too many messages
                (now - conn.timestamp) > 3600000 || // Connection too old
                this.config.blacklistedPatterns.some(pattern => 
                    pattern.test(conn.url)
                )
            );
        },

        // Terminate suspicious connections
        terminateConnection(id) {
            const conn = this.state.connections.get(id);
            if (conn && conn.ws) {
                conn.ws.close();
                this.state.connections.delete(id);
            }
        },

        // Anti-tampering protection
        protectAgainstTampering() {
            const self = this;
            
            // Protect WebSocket constructor
            Object.defineProperty(window, 'WebSocket', {
                get: () => self.state.isProtected ? window.WebSocket : undefined,
                set: () => false,
                configurable: false
            });

            // Protect prototype
            Object.freeze(WebSocket.prototype);
            
            // Monitor for tampering attempts
            setInterval(() => {
                if (window.WebSocket !== self.state.originalWebSocket) {
                    location.reload();
                }
            }, this.config.interval);
        }
    };

    // Initialize protection
    try {
        WebSocketProtector.state.isProtected = true;
        WebSocketProtector.init();
    } catch (e) {
        location.reload();
    }
})();
