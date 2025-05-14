export function BrainIcon({ className = "w-16 h-16" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <ellipse cx="32" cy="32" rx="28" ry="20" fill="#a78bfa" />
      <path
        d="M20 32c0-6.627 5.373-12 12-12s12 5.373 12 12-5.373 12-12 12"
        stroke="#7c3aed"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <path
        d="M32 20v24"
        stroke="#7c3aed"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
