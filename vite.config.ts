import { defineConfig, Plugin } from 'vite';
import react from '@vitejs/plugin-react';

// Small dev-only mock so the supplied /api/checkout contract is exercised
// without requiring a separate backend for this take-home.
function checkoutMock(): Plugin {
  return {
    name: 'checkout-mock',
    configureServer(server) {
      server.middlewares.use('/api/checkout', (req, res) => {
        if (req.method !== 'POST') { res.statusCode = 405; return res.end(); }
        let body = '';
        req.on('data', chunk => body += chunk);
        req.on('end', () => {
          res.setHeader('Content-Type', 'application/json');
          try {
            const { bookIds } = JSON.parse(body);
            if (!Array.isArray(bookIds) || bookIds.length < 1 || bookIds.length > 4) {
              res.statusCode = 400;
              return res.end(JSON.stringify({ error: 'Please select between 1 and 4 books.' }));
            }
            //successful checkout response
            res.statusCode = 200;
            res.end(JSON.stringify({ orderId: `BOTM-${Math.floor(10000 + Math.random()*90000)}`, estimatedShipDate: '2026-10-02' }));

//error handling for checkout
//             res.statusCode = 500;
// res.setHeader("Content-Type", "application/json");
// res.end(
//   JSON.stringify({
//     error: "We couldn't place your order. Please try again.",
//   })
// );
          } catch {
            res.statusCode = 400;
            res.end(JSON.stringify({ error: 'Invalid checkout request.' }));
          }
        });
      });
    }
  };
}

export default defineConfig({ plugins: [react(), checkoutMock()] });
