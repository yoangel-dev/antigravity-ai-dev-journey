import { motion, AnimatePresence } from 'motion/react';
import { AlertTriangle, CheckCircle2, X } from 'lucide-react';

export type ConfirmModalVariant = 'danger' | 'success' | 'info';

interface ConfirmModalProps {
  isOpen: boolean;
  variant?: ConfirmModalVariant;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  /** Si es true, solo muestra el botón de cerrar (modo informativo) */
  infoOnly?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const VARIANT_STYLES: Record<
  ConfirmModalVariant,
  { icon: typeof AlertTriangle; iconBg: string; iconColor: string; confirmBtn: string }
> = {
  danger: {
    icon: AlertTriangle,
    iconBg: 'bg-[#ffdad6]',
    iconColor: 'text-[#ba1a1a]',
    confirmBtn:
      'bg-[#ba1a1a] hover:bg-[#93000a] text-white shadow-md',
  },
  success: {
    icon: CheckCircle2,
    iconBg: 'bg-emerald-100',
    iconColor: 'text-emerald-600',
    confirmBtn:
      'bg-emerald-600 hover:bg-emerald-700 text-white shadow-md',
  },
  info: {
    icon: CheckCircle2,
    iconBg: 'bg-[#d4e3ff]',
    iconColor: 'text-[#005da9]',
    confirmBtn:
      'bg-[#005da9] hover:bg-[#004c8c] text-white shadow-md',
  },
};

export default function ConfirmModal({
  isOpen,
  variant = 'danger',
  title,
  message,
  confirmLabel = 'Confirmar',
  cancelLabel = 'Cancelar',
  infoOnly = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const styles = VARIANT_STYLES[variant];
  const Icon = styles.icon;

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="confirm-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[60] bg-black/45 backdrop-blur-sm"
            onClick={onCancel}
          />

          {/* Modal Panel */}
          <motion.div
            key="confirm-panel"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', stiffness: 420, damping: 32 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[var(--surface)] rounded-2xl shadow-2xl border border-[var(--surface-mid)] w-full max-w-sm pointer-events-auto overflow-hidden transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between px-6 pt-6 pb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${styles.iconBg}`}>
                    <Icon size={20} className={styles.iconColor} />
                  </div>
                  <h2 className="text-base font-bold text-[var(--text)] leading-tight">{title}</h2>
                </div>
                <button
                  type="button"
                  id="confirm-modal-close"
                  onClick={onCancel}
                  className="p-1.5 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-low)] transition-colors cursor-pointer shrink-0 ml-2"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Body */}
              <div className="px-6 pb-6">
                <p className="text-sm text-[var(--text-variant)] leading-relaxed mb-6">{message}</p>

                {/* Actions */}
                <div className={`flex gap-3 ${infoOnly ? 'justify-center' : 'justify-end'}`}>
                  {!infoOnly && (
                    <button
                      type="button"
                      id="confirm-modal-cancel"
                      onClick={onCancel}
                      className="px-4 py-2.5 text-sm font-semibold text-[var(--text-variant)] border border-[var(--border)] hover:bg-[var(--surface-low)] rounded-lg transition-colors cursor-pointer active:scale-95"
                    >
                      {cancelLabel}
                    </button>
                  )}
                  <button
                    type="button"
                    id="confirm-modal-confirm"
                    onClick={onConfirm}
                    className={`px-4 py-2.5 text-sm font-semibold rounded-lg transition-all cursor-pointer active:scale-95 ${styles.confirmBtn} ${infoOnly ? 'px-8' : ''}`}
                  >
                    {confirmLabel}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
