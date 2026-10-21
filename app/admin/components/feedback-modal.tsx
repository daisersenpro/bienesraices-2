"use client";

export function FeedbackModal({
  title,
  message,
  tone = "success",
  onClose,
  onConfirm,
  confirmLabel = "Sí, continuar",
  closeLabel = "Cerrar",
}: {
  title: string;
  message: string;
  tone?: "success" | "error";
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;
  closeLabel?: string;
}) {
  const isSuccess = tone === "success";
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-nordic/40 px-4 backdrop-blur-sm" role="dialog" aria-modal="true" aria-labelledby="feedback-title">
      <div className="w-full max-w-md rounded-2xl bg-white p-7 text-center shadow-2xl">
        <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full text-2xl ${isSuccess ? "bg-hint text-mosque" : "bg-red-100 text-red-600"}`}>
          {isSuccess ? "✓" : "!"}
        </div>
        <h2 id="feedback-title" className="mt-4 text-xl font-bold text-nordic">{title}</h2>
        <p className="mt-2 text-sm text-nordic/60">{message}</p>
        <div className="mt-6 flex justify-center gap-3">
          <button type="button" onClick={onClose} className="rounded-lg border border-nordic/10 px-6 py-2.5 text-sm font-semibold text-nordic transition hover:bg-hint">
            {onConfirm ? "No, volver" : closeLabel}
          </button>
          {onConfirm && <button type="button" onClick={onConfirm} className={`rounded-lg px-6 py-2.5 text-sm font-semibold text-white transition ${isSuccess ? "bg-mosque hover:bg-nordic" : "bg-red-500 hover:bg-red-700"}`}>{confirmLabel}</button>}
        </div>
      </div>
    </div>
  );
}
