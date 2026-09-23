import { useState } from 'react';
import { BookItem } from './components/BookItem';
import { address, books } from './data/mockData';
import type { CheckoutFailure, CheckoutSuccess } from './types';

export default function CheckoutPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [confirmation, setConfirmation] = useState<CheckoutSuccess | null>(null);
  const total = books.reduce((sum, book) => sum + book.price, 0);

  async function handlePlaceOrder() {
    setIsLoading(true); setError(null);
    try {
      const response = await fetch('/api/checkout', {
        method:'POST', headers:{'Content-Type':'application/json'},
        body:JSON.stringify({ bookIds: books.map(book => book.id) })
      });
      const data: CheckoutSuccess | CheckoutFailure = await response.json();
      if (!response.ok) throw new Error('error' in data ? data.error : 'Unable to place your order.');
      if (!('orderId' in data)) throw new Error('Unexpected response from checkout.');
      setConfirmation(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Something went wrong. Please try again.');
    } finally { setIsLoading(false); }
  }

  if (confirmation) return <main className="shell"><section className="card success" aria-live="polite">
    <div className="check">✓</div><p className="eyebrow">ORDER CONFIRMED</p><h1>Your books are on the way.</h1>
    <p>Order <strong>{confirmation.orderId}</strong> has been placed successfully.</p>
    <div className="ship-date"><span>Estimated ship date</span><strong>{new Date(`${confirmation.estimatedShipDate}T00:00:00`).toLocaleDateString('en-US',{month:'long',day:'numeric',year:'numeric'})}</strong></div>
  </section></main>;

  return <main className="shell">
    <header><p className="brand">BOOK OF THE MONTH</p><h1>Review your order</h1><p className="muted">Check your selections and shipping details before placing your order.</p></header>
    <div className="layout"><section className="card"><h2>Your box <span>{books.length} books</span></h2>
      <div className="books">{books.map(book => <BookItem key={book.id} book={book}/>)}</div>
    </section>
    <aside><section className="card"><h2>Shipping address</h2><address><strong>{address.name}</strong><br/>{address.street}<br/>{address.city}, {address.state} {address.zip}</address></section>
      <section className="card summary"><div><span>Order total</span><strong>${total.toFixed(2)}</strong></div><p>Shipping included with membership</p>
        {error && <div className="error" role="alert">{error}</div>}
        <button onClick={handlePlaceOrder} disabled={isLoading || books.length === 0} aria-busy={isLoading}>{isLoading ? <><span className="spinner"/>Placing order…</> : 'Place Order'}</button>
        <small>By placing your order, you confirm your selections and shipping address.</small>
      </section></aside></div>
  </main>;
}
