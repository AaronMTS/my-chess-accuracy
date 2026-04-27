"use client";

import { RefObject, useImperativeHandle, useRef } from "react";
import { createPortal } from "react-dom";

export default function Modal({
  ref,
  children,
}: {
  ref: RefObject<{ show: () => void } | null>;
  children: React.ReactNode;
}) {
  const portalRoot =
    typeof document !== "undefined"
      ? document.getElementById("modal_root")
      : null;
  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    show() {
      dialogRef.current!.showModal();
    },
  }));

  if (!portalRoot) return null;

  return createPortal(
    <dialog
      ref={dialogRef}
      className="overflow-visible w-fit backdrop:bg-black/90"
    >
      {/* <form method="dialog">
        <button>Close</button>
      </form> */}
      {children}
    </dialog>,
    portalRoot
  );
}
