import { Github, Linkedin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="text-primary-700 flex flex-col items-center justify-center gap-3.5 py-4 sm:py-8">
      <h1 className="text-xs">Felipe Oliveira (Lion) - 2023</h1>

      <div className="flex items-center justify-center gap-3">
        <a
          href="https://github.com/Felipstein"
          target="_blank"
          rel="noreferrer"
          className="text-primary-700 hover:text-primary-500 transition-colors"
        >
          <Github className="h-5 w-5" />
        </a>

        <a
          href="https://www.linkedin.com/in/feelipeoliveira/"
          target="_blank"
          rel="noreferrer"
          className="text-primary-700 hover:text-primary-500 transition-colors"
        >
          <Linkedin className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
