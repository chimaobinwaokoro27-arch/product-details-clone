# Kiln — Products & Detail

A two-page product catalogue built with React, React Router and Tailwind CSS, using the
[DummyJSON products API](https://dummyjson.com/products).

- `/` — a grid of 12 products
- `/products/:id` — the single product that was clicked

## Design reference

**E-Commerce Products Page** by Sharon Ahmed —
<https://dribbble.com/shots/24612382-E-Commerce-Products-Page>

Browse the wider set at <https://dribbble.com/search/product-card> if you want to compare.

### Three things I took from it

1. **One accent colour, everything else neutral.** The reference keeps the page almost entirely
   neutral and spends colour on a single job. I used warm `stone` greys for everything and
   defined one accent — `clay` (a burnt terracotta) — used in only a few places: the wordmark
   dot, the price, the primary button, the cart badge, and link hovers. Nothing else is coloured.
2. **A clear size difference between the title and the price.** The reference's product cards set
   the title small and quiet so the price is the thing you read first. On the cards the title is
   `15px` medium-weight grey and the price is `20px` semibold in the accent. On the detail page
   the gap is much wider: a `5xl` display-serif title against a `3xl` price.
3. **More space than feels necessary between the cards.** `gap-y-16` on the grid and `py-20` on
   the page, so the products breathe like gallery pieces rather than a dense listing.

Titles also use `line-clamp-1` so every card is exactly the same height regardless of how long the
product name is.

## Cart

A small client-side cart sits on top of the two required pages. It adds no new route.

- Cart state lives in a Zustand store (`useCartStore`), so it survives navigation between routes
  without a provider being mounted anywhere.
- The cart icon in the header is a hand-written inline SVG (`CartIcon.jsx`) that inherits
  `currentColor`, so it recolours with whatever accent or neutral it sits on. It carries a count
  badge once the cart is not empty.
- Clicking the icon opens a slide-over drawer with quantity steppers, remove buttons, a live
  subtotal, and a clear-cart action. `Escape` closes it.
- The cart persists to `localStorage` under `kiln.cart.v1`, so it survives a refresh.
- Adding the same product twice increments the existing line rather than duplicating it.

### Add to cart on the cards

**The brief specifies that a card shows only the thumbnail, title and price. An Add to cart
button was added to every card in the grid on request, so the card now shows a fourth element.**
Flagging it explicitly in case the brief is being marked against the letter.

The button could not simply be nested inside the card's `<Link>`, since a `<button>` inside an
anchor is invalid and would fire the navigation too. Instead the card uses a stretched-link
pattern: the root is an `<article>`, the `<Link>` is an absolutely positioned overlay covering
the whole card at `z-10`, and the button sits above it at `z-20`. The result is that clicking the
image, title or price still navigates to the detail page, while clicking Add to cart only adds
the item. The link carries an `aria-label` because it wraps no text of its own.

Both the cards and the detail page read the same `lastAddedId` from the cart store for their
"Added" confirmation, so adding the same product from either place lights up both consistently.

## Running it

```bash
npm install
npm run dev
```

Then open the local URL Vite prints. Other scripts:

```bash
npm run build    # production build
npm run preview  # serve the production build
npm run lint     # oxlint
```

## The two endpoints

The two endpoints do **not** return the same shape, and this is the main thing to get right:

| Endpoint | Shape | How to read it |
| --- | --- | --- |
| `GET /products?limit=12` | `{ products, total, skip, limit }` | wrapped — map over `data.products` |
| `GET /products/:id` | `{ id, title, price, description, thumbnail, ... }` | **not** wrapped — `data` *is* the product |

Writing `data.products` on the single-product response gives you `undefined`.

## Project structure

```
src/
├── components/
│   ├── CartDrawer.jsx              header cart button (count badge) + slide-over drawer
│   ├── CartIcon.jsx                hand-written inline cart SVG
│   ├── Layout.jsx                  header + <Outlet /> + footer
│   └── ProductCard.jsx             thumbnail, title, price, add to cart — links to /products/:id
├── lib/
│   └── formatPrice.js              shared Intl currency formatter
├── pages/
│   ├── ProductsListPage.jsx        fetch /products?limit=12, render the grid
│   ├── ProductDetailPage.jsx       fetch /products/:id from useParams, add to cart
│   └── NotFoundPage.jsx
├── store/
│   ├── useCartStore.js             cart items, derived totals, add/increment/decrement/remove/clear
│   ├── useCartDrawerStore.js       drawer open/closed
│   ├── useProductDetailStore.js    one product, loading, error, retry, fetch
│   └── useProductListStore.js      product grid, loading, error, retry, fetch
├── App.jsx                         routes
├── index.css                       Tailwind theme tokens
└── main.jsx                        renders <App />
```

## State management: Zustand

This copy is a **state management rewrite only**. The app looks and behaves exactly as it did
before — see [Verifying nothing changed](#verifying-nothing-changed) for how that was checked.

All app state used to live in React state: eight `useState` hooks, one `useReducer`, one `useRef`,
and a `createContext`/`useCart` pair. It now lives in four Zustand stores:

| Store | Replaces |
| --- | --- |
| `useCartStore` | `useReducer` (items), `useState` (lastAddedId), `useRef` (timer), the `CartContext` provider, and the derived `itemCount` / `subtotal` / `isEmpty` |
| `useProductDetailStore` | 4 × `useState` on the detail page, plus its fetch |
| `useProductListStore` | 4 × `useState` on the list page, plus its fetch |
| `useCartDrawerStore` | `useState` open flag on the drawer |

The migration was done one piece at a time, one commit per piece, in the order above.

**Behaviour deliberately preserved, including the awkward parts:**

- The reducer's `add` case still increments an existing line instead of adding a duplicate.
- `decrement` still filters out lines that reach zero, removing the line entirely.
- The detail load still clears `product` to `null` and resets `document.title` per product, while
  the list load resets the title to the catalogue — and a list retry still does *not* clear the
  existing `products` array, because the original didn't.
- `setLoading(false)` still runs in a `finally` that also fires on `AbortError`, because the
  original's `finally` did.
- The `AbortController` cleanup and the effect dependencies that re-trigger each fetch stay in the
  components. State moved to the store; the fetch *lifecycle* did not.

**Two small, intentional differences:**

- `localStorage` persistence moved from a `useEffect` to a `useCartStore.subscribe` call guarded on
  the `items` reference changing. The old effect also rewrote the unchanged initial value on
  mount; subscribing to the actual change stores identical data without that redundant write.
- The 1600 ms "Added" timer is module-scoped rather than store state, because it is not
  render-relevant. The old provider cleared it on unmount; with no provider there is no unmount,
  and the timeout's only effect is setting `lastAddedId` back to `null`, which is idempotent.

### Verifying nothing changed

- The emitted CSS bundle is **byte-identical** before and after the rewrite
  (`index-2Y3ouJgT.css`, SHA-256 `5E24623F…`). Since Tailwind only emits rules for class names
  present in the source, and not one class name changed, the styling provably cannot have moved.
- Every store transition was exercised against a stubbed `localStorage` and the live DummyJSON API:
  add, duplicate add, increment, decrement to zero, remove, clear, subtotal arithmetic, the
  persisted payload, the 1600 ms feedback reset, the list unwrapping `data.products`, the detail
  page *not* unwrapping, and the 404 error path. 42/42 checks passed. The script was scratch
  verification and is not part of the repo.
- `npm run lint` is clean and the app logs no runtime errors while browsing both routes.

## Rules followed

- Native `fetch` only — no axios.
- `response.ok` is checked on every request, and `setLoading(false)` sits in a `finally` block.
- Fetches are aborted on unmount via an `AbortController`, so navigating away mid-request does not
  set state on an unmounted component.
- List keys come from `product.id`, never the array index.
- All internal navigation uses `<Link>` / `useParams` — no `<a href>` for routing.
- Tailwind only, with no custom CSS beyond the `@theme` design tokens in `index.css`.
- The card and both pages live in their own files.
- Both pages render a loading state (skeleton placeholders) and an error state with a retry
  button.
- No `useState`, `useReducer`, `useRef`, `createContext` or `useContext` remain in `src`; all app
  state is in Zustand stores.

## Credits

Rewritten from [`chimaobinwaokoro27-arch/product-details-`](https://github.com/chimaobinwaokoro27-arch/product-details-),
which is kept as the `upstream` remote. `upstream/main` is the last commit before the migration;
the four commits on top of it are the Zustand rewrite.

## Notes

- The grid is one column on mobile, two at `sm`, three at `lg`.
- Product images are served on white backgrounds, so they sit in a square `bone` tile with
  `object-contain` padding — the whitespace is intentional.
- Google Fonts supplies *Instrument Serif* (display) and *Inter* (UI), with system fallbacks if
  the network is unavailable.
