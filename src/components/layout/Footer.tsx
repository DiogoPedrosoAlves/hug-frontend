import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-secondary-dark px-4 py-10 font-sans text-sm text-text-footer sm:px-8">
      <div className="mx-auto flex max-w-5xl flex-col gap-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-base font-semibold text-acento">Hug</p>
          <p className="mt-1 max-w-sm">
            Informação sobre saúde emocional. O Hug complementa, mas não substitui o acompanhamento profissional.
          </p>
        </div>

        <div className="rounded-xl border border-acento/40 p-4">
          <p className="font-medium text-text-light">Precisa de apoio agora?</p>
          <p className="mt-1">
            Ligue <a href="tel:188" className="font-semibold text-acento">188</a> (CVV, gratuito, 24 horas).
          </p>
        </div>

        <nav className="flex flex-wrap gap-4">
          <Link to="/sobre" className="hover:text-white">Sobre</Link>
          <Link to="/faq" className="hover:text-white">FAQ</Link>
          <Link to="/contato" className="hover:text-white">Contato</Link>
        </nav>
      </div>
      <p className="mt-8 text-center text-xs">Global Solution 2026/2 · CitizenTech · FIAP</p>
    </footer>
  );
}
