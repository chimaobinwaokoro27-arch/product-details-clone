export default function CartIcon({ className = 'h-5 w-5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 4h1.8a1 1 0 0 1 .98.8L6.2 7.5m0 0 1.62 8.1a1.5 1.5 0 0 0 1.47 1.2h8.62a1.5 1.5 0 0 0 1.47-1.2L21 7.5H6.2Z" />
      <circle cx="9.25" cy="20" r="1.25" />
      <circle cx="17.25" cy="20" r="1.25" />
    </svg>
  )
}
