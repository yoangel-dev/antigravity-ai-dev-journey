import { useState, useEffect, FormEvent, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Plus, Calendar, AlertCircle, Tag, Pencil } from 'lucide-react';
import { Task } from '../types';

interface TaskModalProps {
  isOpen: boolean;
  mode: 'create' | 'edit';
  task?: Task | null;
  defaultCategory?: Task['category'];
  onClose: () => void;
  onSave: (
    title: string,
    dueDate: string,
    priority: 'high' | 'medium' | 'low',
    tags: string[],
    description: string
  ) => void;
}

export default function TaskModal({
  isOpen,
  mode,
  task,
  defaultCategory,
  onClose,
  onSave,
}: TaskModalProps) {
  const today = new Date().toISOString().split('T')[0];

  const [title, setTitle] = useState('');
  const [dueDate, setDueDate] = useState(today);
  const [priority, setPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [tagInput, setTagInput] = useState('');
  const [description, setDescription] = useState('');
  const titleRef = useRef<HTMLInputElement>(null);

  // Populate fields when editing
  useEffect(() => {
    if (isOpen) {
      if (mode === 'edit' && task) {
        setTitle(task.title);
        setDueDate(task.dueDate || today);
        setPriority(task.priority);
        setTagInput(task.tags?.join(', ') || '');
        setDescription(task.description || '');
      } else {
        setTitle('');
        setDueDate(today);
        setPriority('medium');
        setTagInput('');
        setDescription('');
      }
      // Auto-focus title field
      setTimeout(() => titleRef.current?.focus(), 100);
    }
  }, [isOpen, mode, task]);

  // Close on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [isOpen, onClose]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    const tags = tagInput
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    onSave(title.trim(), dueDate, priority, tags, description.trim());
    onClose();
  };

  const getPriorityLabel = (p: 'high' | 'medium' | 'low') => {
    switch (p) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Panel */}
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.93, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 24 }}
            transition={{ type: 'spring', stiffness: 380, damping: 30 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="bg-[var(--surface)] rounded-2xl shadow-2xl border border-[var(--surface-mid)] w-full max-w-lg pointer-events-auto overflow-hidden transition-colors duration-300"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-[var(--surface-mid)]">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[var(--brand)]/10 flex items-center justify-center">
                    {mode === 'create' ? (
                      <Plus size={18} className="text-[var(--brand)]" />
                    ) : (
                      <Pencil size={18} className="text-[var(--brand)]" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text)] leading-tight">
                      {mode === 'create' ? 'Nueva Tarea' : 'Editar Tarea'}
                    </h2>
                    <p className="text-xs text-[var(--text-muted)]">
                      {mode === 'create'
                        ? 'Añade los detalles de tu nueva tarea'
                        : 'Modifica los datos de la tarea'}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  id="modal-close-btn"
                  className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text)] hover:bg-[var(--surface-low)] transition-colors cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Modal Body */}
              <form onSubmit={handleSubmit} className="px-6 py-5 space-y-5">
                {/* Title */}
                <div>
                  <label
                    htmlFor="modal-task-title"
                    className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-1.5"
                  >
                    ¿Qué hay que hacer? <span className="text-[#ba1a1a]">*</span>
                  </label>
                  <input
                    ref={titleRef}
                    id="modal-task-title"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Escribe el título de la tarea..."
                    required
                    className="w-full py-2 bg-transparent text-base text-[var(--text)] placeholder-[var(--text-muted)] border-b-2 border-[var(--border)] focus:outline-none focus:border-b-[var(--brand)] transition-all"
                  />
                </div>

                {/* Description */}
                <div>
                  <label
                    htmlFor="modal-task-desc"
                    className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-1.5"
                  >
                    Descripción <span className="text-[var(--text-muted)] normal-case font-normal">(opcional)</span>
                  </label>
                  <textarea
                    id="modal-task-desc"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Añade más detalles sobre la tarea..."
                    rows={2}
                    className="w-full px-3 py-2 bg-[var(--surface-low)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors resize-none"
                  />
                </div>

                {/* Date & Priority row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Due date */}
                  <div>
                    <label
                      htmlFor="modal-due-date"
                      className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                    >
                      <Calendar size={12} className="text-[var(--brand)]" />
                      Fecha de vencimiento
                    </label>
                    <input
                      id="modal-due-date"
                      type="date"
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      className="w-full px-3 py-1.5 bg-[var(--surface-low)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                    />
                  </div>

                  {/* Priority */}
                  <div>
                    <span className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <AlertCircle size={12} className="text-[var(--brand)]" />
                      Prioridad
                    </span>
                    <div className="grid grid-cols-3 gap-1 bg-[var(--surface-low)] p-1 rounded-lg border border-[var(--border)]">
                      {(['low', 'medium', 'high'] as const).map((p) => (
                        <button
                          key={p}
                          type="button"
                          onClick={() => setPriority(p)}
                          className={`py-1 text-xs font-semibold rounded-md transition-all cursor-pointer ${
                            priority === p
                              ? p === 'high'
                                ? 'bg-[#ba1a1a] text-white shadow-sm'
                                : p === 'medium'
                                ? 'bg-[#934700] text-white shadow-sm'
                                : 'bg-[var(--brand)] text-white shadow-sm'
                              : 'text-[var(--text-variant)] hover:bg-[var(--surface-mid)]'
                          }`}
                        >
                          {getPriorityLabel(p)}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label
                    htmlFor="modal-tags"
                    className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-1.5 flex items-center gap-1.5"
                  >
                    <Tag size={12} className="text-[var(--brand)]" />
                    Etiquetas
                    <span className="text-[var(--text-muted)] normal-case font-normal">(separadas por coma)</span>
                  </label>
                  <input
                    id="modal-tags"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    placeholder="Ej. Trabajo, Hogar, Personal"
                    className="w-full px-3 py-1.5 bg-[var(--surface-low)] border border-[var(--border)] rounded-lg text-sm text-[var(--text)] placeholder-[var(--text-muted)] focus:outline-none focus:border-[var(--brand)] transition-colors"
                  />
                </div>

                {/* Footer actions */}
                <div className="flex justify-end gap-3 pt-2 border-t border-[var(--surface-mid)]">
                  <button
                    type="button"
                    onClick={onClose}
                    id="modal-cancel-btn"
                    className="px-5 py-2.5 text-sm font-semibold text-[var(--text-variant)] border border-[var(--border)] hover:bg-[var(--surface-low)] rounded-lg transition-colors cursor-pointer active:scale-95"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    id="modal-save-btn"
                    className="px-5 py-2.5 text-sm font-semibold text-white bg-[var(--brand)] hover:bg-[var(--brand-hover)] rounded-lg transition-colors shadow-md cursor-pointer active:scale-95 flex items-center gap-2"
                  >
                    {mode === 'create' ? (
                      <>
                        <Plus size={16} />
                        <span>Crear Tarea</span>
                      </>
                    ) : (
                      <>
                        <Pencil size={16} />
                        <span>Guardar Cambios</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
