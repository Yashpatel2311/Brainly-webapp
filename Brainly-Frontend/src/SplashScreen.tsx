import { BrainIcon } from "./Icons/BrainIcon";

export function SplashScreen({ show }: { show: boolean }) {
  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-purple-600 transition-all duration-700 ease-in-out
        ${
          show
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-full pointer-events-none"
        }`}
    >
      <BrainIcon className="w-24 h-24 mb-4 animate-bounce" />
      <h1 className="text-5xl font-extrabold text-white tracking-wider drop-shadow-lg">
        Brainly
      </h1>
    </div>
  );
}
