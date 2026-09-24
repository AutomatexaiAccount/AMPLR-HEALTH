import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'cashfree-api',
        configureServer(server) {
          server.middlewares.use('/api/create-cashfree-order', async (req, res) => {
            if (req.method === 'POST') {
              let body = '';
              req.on('data', chunk => body += chunk);
              req.on('end', async () => {
                try {
                  const data = JSON.parse(body);
                  const fetchFn = globalThis.fetch;
                  
                  const response = await fetchFn('https://sandbox.cashfree.com/pg/orders', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json',
                      'x-api-version': '2023-08-01',
                      'x-client-id': env.VITE_CASHFREE_CLIENT_ID,
                      'x-client-secret': env.VITE_CASHFREE_CLIENT_SECRET
                    },
                    body: JSON.stringify({
                      order_id: `ORDER_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                      order_amount: data.order_amount,
                      order_currency: 'INR',
                      customer_details: {
                        customer_id: (data.customer_id || `CUST_${Date.now()}`).replace(/[^a-zA-Z0-9_]/g, '_').substring(0, 50),
                        customer_name: data.customer_name || 'Customer',
                        customer_email: data.customer_email || 'test@example.com',
                        customer_phone: (data.customer_phone || '9999999999').replace(/[^0-9]/g, '').substring(0, 14)
                      },
                      order_meta: {
                        return_url: `http://localhost:3000/${data.return_path || ''}?order_id={order_id}`
                      }
                    })
                  });
                  
                  const responseData = await response.json();
                  console.log('Cashfree API Response:', responseData);
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(responseData));
                } catch (error) {
                  console.error('Cashfree Proxy Error:', error);
                  res.statusCode = 500;
                  res.end(JSON.stringify({ error: error.message }));
                }
              });
            } else {
              res.statusCode = 405;
              res.end();
            }
          });
        }
      }
    ],
    server: {
      port: 3000
    }
  };
})
