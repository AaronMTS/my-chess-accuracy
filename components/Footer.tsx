import { spaceGrotesk } from "@/app/fonts";

export default function Footer({ paddingClasses }: { paddingClasses: string }) {
  return (
    <footer
      className={`space-y-1 ${paddingClasses} ${spaceGrotesk.className} text-[10px] text-onSurfaceLow/70 text-center tracking-wider border-t border-surfaceHigh`}
    >
      <p>MyChessAccuracy &copy; 2026</p>
      <p>
        Developed by{" "}
        <a href="https://github.com/AaronMTS" target="_blank">
          AaronMTS
        </a>
      </p>
    </footer>
  );
}
