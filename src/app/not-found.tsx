import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F7F7F5] dark:bg-[#090a0c] text-[#111111] dark:text-white px-6 text-center">
      <div className="bg-[#FCFCFB] dark:bg-[#171a23] rounded-3xl p-8 sm:p-12 border border-[#E7E7E4] dark:border-[#242936] max-w-md w-full shadow-lg">
        <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20 block mb-4">
          404 // ROUTE NOT FOUND
        </span>
        <h1 className="text-4xl font-extrabold tracking-tight mb-2">Page Not Found</h1>
        <p className="text-sm text-secondary-auralis leading-relaxed mb-6">
          The requested system node or route does not exist on this server.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-[#111111] dark:bg-white text-white dark:text-black px-6 py-3 rounded-full text-xs font-mono font-bold hover:opacity-90 transition-opacity"
        >
          <span>RETURN HOME</span>
          <span className="material-symbols-outlined text-sm">arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
