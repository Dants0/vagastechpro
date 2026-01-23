export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 bg-white py-8 text-center dark:bg-slate-950 dark:border-slate-800 transition-colors">
      <div className="mx-auto max-w-5xl px-4">
        <p className="text-slate-500 mb-2 dark:text-slate-400">
          © {new Date().getFullYear()} Vagas Tech Bot. Open Source.
        </p>
        <p className="text-sm font-medium text-slate-900 dark:text-slate-200">
          Powered by <a href="https://codivatech.com" target="_blank" className="text-blue-600 hover:underline dark:text-blue-400">CodivaTech</a> 🚀
        </p>
      </div>
    </footer>
  )
}