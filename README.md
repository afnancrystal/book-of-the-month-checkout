# Book of the Month Checkout

A small React + TypeScript implementation of the checkout exercise. It displays 1 to 4 selected books, calculates the order total, shows the member's saved shipping address, and submits the selected book IDs to the supplied `POST /api/checkout` contract.

## Run locally

Requires Node.js 18+.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (normally `http://localhost:5173`).

To verify a production build:

```bash
npm run build
npm run preview
```

## API contract

The UI sends:

```json
{ "bookIds": ["book-1", "book-2"] }
```

to `POST /api/checkout`. For this standalone exercise, `vite.config.ts` contains a small development-only mock for that exact endpoint so reviewers can exercise the complete success flow without a separate server.

In a production application the mock would be removed and the same frontend request would target the real checkout service.

## UX / implementation decisions

- The Place Order button is disabled while submitting to reduce accidental duplicate orders.
- Loading text and a spinner make the in-progress state explicit.
- API errors are displayed inline with `role="alert"` so failure is clear and accessible.
- Successful checkout replaces the form with the returned order ID and estimated ship date.
- The order total is derived from the displayed books rather than duplicated in state.
- Components and TypeScript types are intentionally small; for an exercise of this size, adding global state or a data-fetching dependency would add complexity without much benefit.
- Book/address data are mocked as allowed by the prompt.
- In production, pricing and the authoritative order total should be calculated/validated server-side, along with authentication, idempotency, observability, analytics, and automated integration tests.

## Assumptions

The member arrives with 1–4 books already selected, so changing the cart or address is outside this page's scope. The provided endpoint only requires book IDs, so the saved address is displayed for confirmation but is not included in the request body.
