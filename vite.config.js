import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// Small dev-only mock so the supplied /api/checkout contract is exercised
// without requiring a separate backend for this take-home.
function checkoutMock() {
    return {
        name: 'checkout-mock',
        configureServer: function (server) {
            server.middlewares.use('/api/checkout', function (req, res) {
                if (req.method !== 'POST') {
                    res.statusCode = 405;
                    return res.end();
                }
                var body = '';
                req.on('data', function (chunk) { return body += chunk; });
                req.on('end', function () {
                    res.setHeader('Content-Type', 'application/json');
                    try {
                        var bookIds = JSON.parse(body).bookIds;
                        if (!Array.isArray(bookIds) || bookIds.length < 1 || bookIds.length > 4) {
                            res.statusCode = 400;
                            return res.end(JSON.stringify({ error: 'Please select between 1 and 4 books.' }));
                        }
                        //successful checkout response
                        res.statusCode = 200;
                        res.end(JSON.stringify({ orderId: "BOTM-".concat(Math.floor(10000 + Math.random() * 90000)), estimatedShipDate: '2026-10-02' }));
                        //error handling for checkout
                        //             res.statusCode = 500;
                        // res.setHeader("Content-Type", "application/json");
                        // res.end(
                        //   JSON.stringify({
                        //     error: "We couldn't place your order. Please try again.",
                        //   })
                        // );
                    }
                    catch (_a) {
                        res.statusCode = 400;
                        res.end(JSON.stringify({ error: 'Invalid checkout request.' }));
                    }
                });
            });
        }
    };
}
export default defineConfig({ plugins: [react(), checkoutMock()] });
