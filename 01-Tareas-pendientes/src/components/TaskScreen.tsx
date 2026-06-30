import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Trash2, Calendar, Sparkles, FolderOpen, Pencil, FileText } from 'lucide-react';
import { Task, TaskFilter, SidebarTab } from '../types';
import TaskModal from './TaskModal';
import ConfirmModal from './ConfirmModal';

interface TaskScreenProps {
  tasks: Task[];
  onAddTask: (
    title: string,
    dueDate: string,
    priority: 'high' | 'medium' | 'low',
    tags: string[],
    description: string
  ) => void;
  onEditTask: (
    id: string,
    title: string,
    dueDate: string,
    priority: 'high' | 'medium' | 'low',
    tags: string[],
    description: string
  ) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
  activeSidebarTab: SidebarTab;
}

export default function TaskScreen({
  tasks,
  onAddTask,
  onEditTask,
  onToggleTask,
  onDeleteTask,
  activeSidebarTab,
}: TaskScreenProps) {
  const [filter, setFilter] = useState<TaskFilter>('all');

  // TaskModal state
  const [taskModalOpen, setTaskModalOpen] = useState(false);
  const [taskModalMode, setTaskModalMode] = useState<'create' | 'edit'>('create');
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  // ConfirmModal state (for delete)
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<Task | null>(null);

  // ── Sidebar Tab filtering ─────────────────────────────────────────────
  const getSidebarFilteredTasks = () => {
    const todayStr = new Date().toISOString().split('T')[0];
    switch (activeSidebarTab) {
      case 'today':
        return tasks.filter((t) => t.dueDate === todayStr);
      case 'upcoming':
        return tasks.filter((t) => t.dueDate > todayStr);
      case 'labels':
        return tasks.filter((t) => t.priority === 'high' || t.tags.length > 0);
      case 'inbox':
      default:
        return tasks;
    }
  };

  const sidebarFilteredTasks = getSidebarFilteredTasks();

  const finalTasks = sidebarFilteredTasks.filter((task) => {
    if (filter === 'completed') return task.completed;
    if (filter === 'pending') return !task.completed;
    return true;
  });

  // ── Handlers ──────────────────────────────────────────────────────────
  const openCreateModal = () => {
    setTaskModalMode('create');
    setEditingTask(null);
    setTaskModalOpen(true);
  };

  const openEditModal = (task: Task) => {
    setTaskModalMode('edit');
    setEditingTask(task);
    setTaskModalOpen(true);
  };

  const handleModalSave = (
    title: string,
    dueDate: string,
    priority: 'high' | 'medium' | 'low',
    tags: string[],
    description: string
  ) => {
    if (taskModalMode === 'create') {
      onAddTask(title, dueDate, priority, tags, description);
    } else if (editingTask) {
      onEditTask(editingTask.id, title, dueDate, priority, tags, description);
    }
  };

  const handleDeleteClick = (task: Task) => {
    setTaskToDelete(task);
    setConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = () => {
    if (taskToDelete) {
      onDeleteTask(taskToDelete.id);
    }
    setConfirmDeleteOpen(false);
    setTaskToDelete(null);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteOpen(false);
    setTaskToDelete(null);
  };

  // ── Helpers ───────────────────────────────────────────────────────────
  const getPriorityBadgeColor = (p: 'high' | 'medium' | 'low') => {
    switch (p) {
      case 'high':   return 'bg-[#ffdad6] text-[#ba1a1a] border-[#ffb4ab]';
      case 'medium': return 'bg-[#ffdbc7] text-[#934700] border-[#ffb688]';
      case 'low':    return 'bg-[#d4e3ff] text-[#005da9] border-[#adc8f3]';
    }
  };

  const getPriorityLabel = (p: 'high' | 'medium' | 'low') => {
    switch (p) {
      case 'high': return 'Alta';
      case 'medium': return 'Media';
      case 'low': return 'Baja';
    }
  };

  const getSidebarTitle = () => {
    switch (activeSidebarTab) {
      case 'today':    return 'Tareas de Hoy';
      case 'upcoming': return 'Próximas Tareas';
      case 'labels':   return 'Tareas Destacadas & Etiquetas';
      case 'inbox':
      default:         return 'Mis Tareas';
    }
  };

  const getSidebarSubtitle = () => {
    switch (activeSidebarTab) {
      case 'today':    return 'Tareas programadas para el día de hoy.';
      case 'upcoming': return 'Tu planificación y objetivos futuros.';
      case 'labels':   return 'Tareas de alta prioridad y categorizadas.';
      case 'inbox':
      default:         return 'Mantén tu día organizado y enfocado.';
    }
  };

  // Stats
  const totalVisible = sidebarFilteredTasks.length;
  const completedVisible = sidebarFilteredTasks.filter((t) => t.completed).length;

  return (
    <div className="w-full">
      {/* Title Header Section */}
      <header className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-[var(--text)] tracking-tight mb-2 flex items-center gap-2">
            {getSidebarTitle()}
            {activeSidebarTab === 'today' && (
              <Sparkles className="text-[var(--brand)] animate-pulse" size={24} />
            )}
          </h1>
          <p className="text-base text-[var(--text-variant)]">{getSidebarSubtitle()}</p>
        </div>

        {/* Quick stats */}
        {totalVisible > 0 && (
          <div className="flex gap-3 shrink-0">
            <div className="text-center bg-[var(--surface)] border border-[var(--surface-mid)] rounded-xl px-4 py-2 shadow-sm">
              <div className="text-xl font-bold text-[var(--brand)]">{completedVisible}</div>
              <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">Hechas</div>
            </div>
            <div className="text-center bg-[var(--surface)] border border-[var(--surface-mid)] rounded-xl px-4 py-2 shadow-sm">
              <div className="text-xl font-bold text-[var(--text)]">{totalVisible - completedVisible}</div>
              <div className="text-[10px] text-[var(--text-muted)] font-semibold uppercase tracking-wider">Pendientes</div>
            </div>
          </div>
        )}
      </header>

      {/* Nueva Tarea button + filters row */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        {/* Filter chips */}
        <div className="flex gap-2 flex-wrap">
          {(['all', 'pending', 'completed'] as const).map((f) => (
            <button
              key={f}
              id={`filter-${f}`}
              onClick={() => setFilter(f)}
              className={`px-4 py-1.5 text-xs font-semibold rounded-full border transition-all active:scale-95 cursor-pointer ${
                filter === f
                  ? 'bg-[var(--brand)] text-white border-[var(--brand)] shadow-sm'
                  : 'bg-[var(--surface)] hover:bg-[var(--surface-low)] text-[var(--text-variant)] border-[var(--border)]'
              }`}
            >
              {f === 'all' && 'Todas'}
              {f === 'pending' && 'Pendientes'}
              {f === 'completed' && 'Completadas'}
            </button>
          ))}
        </div>

        {/* Primary CTA */}
        <button
          id="btn-new-task"
          onClick={openCreateModal}
          className="flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] active:scale-95 text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer shrink-0"
        >
          <Plus size={16} />
          <span>Nueva Tarea</span>
        </button>
      </div>

      {/* Tasks List */}
      <div className="space-y-3">
        <AnimatePresence mode="popLayout">
          {finalTasks.length > 0 ? (
            finalTasks.map((task) => (
              <motion.div
                key={task.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className={`group flex items-center justify-between p-4 rounded-xl shadow-[0_2px_10px_rgba(0,0,0,0.02)] border transition-all duration-200 hover:-translate-y-0.5 focus-within:ring-2 focus-within:ring-[var(--brand)]/20 ${
                  task.completed
                    ? 'border-[var(--surface-mid)] bg-[var(--surface-low)] opacity-75'
                    : 'border-[var(--border)] bg-[var(--surface)] hover:shadow-[0_8px_24px_rgba(6,120,215,0.08)] hover:border-[var(--brand)]'
                }`}
              >
                {/* Left: checkbox + details */}
                <div className="flex items-center gap-4 flex-1 min-w-0">
                  {/* Checkbox */}
                  <button
                    onClick={() => onToggleTask(task.id)}
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all shrink-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/40 ${
                      task.completed
                        ? 'bg-[var(--brand)] border-[var(--brand)] text-white'
                        : 'border-[var(--border)] hover:border-[var(--brand)] bg-[var(--surface)]'
                    }`}
                  >
                    {task.completed && (
                      <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-3" viewBox="0 0 24 24">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* Task details */}
                  <div className="flex-1 min-w-0">
                    <h3
                      className={`font-semibold text-base truncate transition-all ${
                        task.completed ? 'text-[var(--text-muted)] line-through' : 'text-[var(--text)]'
                      }`}
                    >
                      {task.title}
                    </h3>

                    {/* Description preview */}
                    {task.description && (
                      <p className="text-xs text-[var(--text-muted)] mt-0.5 truncate flex items-center gap-1">
                        <FileText size={10} className="shrink-0" />
                        {task.description}
                      </p>
                    )}

                    {/* Metadata strip */}
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-1">
                      {task.dueDate && (
                        <span className="flex items-center gap-1 text-xs text-[var(--text-muted)] font-mono">
                          <Calendar size={12} className="text-[var(--brand)]" />
                          {task.dueDate}
                        </span>
                      )}
                      {task.tags &&
                        task.tags.map((tag) => (
                          <span
                            key={tag}
                            className="bg-[var(--surface-low)] text-[var(--text-variant)] text-[10px] px-2 py-0.5 rounded font-mono font-medium border border-[var(--border)]/30"
                          >
                            #{tag}
                          </span>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Right: priority badge + edit + delete */}
                <div className="flex items-center gap-2 shrink-0 ml-4">
                  <span
                    className={`text-[10px] px-2.5 py-0.5 rounded-full font-mono font-bold border ${getPriorityBadgeColor(
                      task.priority
                    )}`}
                  >
                    {getPriorityLabel(task.priority)}
                  </span>

                  {/* Edit button */}
                  <button
                    id={`btn-edit-${task.id}`}
                    onClick={() => openEditModal(task)}
                    className="text-[var(--text-muted)] hover:text-[var(--brand)] p-1.5 rounded-md hover:bg-[var(--brand-bg)] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--brand)]/50"
                    title="Editar tarea"
                  >
                    <Pencil size={15} />
                  </button>

                  {/* Delete button */}
                  <button
                    id={`btn-delete-${task.id}`}
                    onClick={() => handleDeleteClick(task)}
                    className="text-[var(--text-muted)] hover:text-[#ba1a1a] p-1.5 rounded-md hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50"
                    title="Eliminar tarea"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </motion.div>
            ))
          ) : (
            // Empty state
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center justify-center py-16 px-4 text-center rounded-2xl border border-dashed border-[var(--border)] bg-[var(--surface)]/50"
            >
              <div className="w-16 h-16 rounded-full bg-[var(--surface-low)] flex items-center justify-center mb-4 text-[var(--text-muted)]">
                <FolderOpen size={28} />
              </div>
              <h3 className="text-xl font-bold text-[var(--text)] mb-1">Nada por aquí</h3>
              <p className="text-sm text-[var(--text-variant)] max-w-sm mb-6">
                Disfruta tu tiempo libre o crea una nueva tarea para mantener tu día organizado.
              </p>
              <button
                onClick={openCreateModal}
                className="flex items-center gap-2 bg-[var(--brand)] hover:bg-[var(--brand-hover)] text-white font-semibold text-sm px-5 py-2.5 rounded-xl shadow-md transition-all cursor-pointer active:scale-95"
              >
                <Plus size={16} />
                <span>Crear primera tarea</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ─── TaskModal (crear / editar) ─────────────────────────────────── */}
      <TaskModal
        isOpen={taskModalOpen}
        mode={taskModalMode}
        task={editingTask}
        defaultCategory={activeSidebarTab}
        onClose={() => setTaskModalOpen(false)}
        onSave={handleModalSave}
      />

      {/* ─── ConfirmModal (eliminar) ────────────────────────────────────── */}
      <ConfirmModal
        isOpen={confirmDeleteOpen}
        variant="danger"
        title="Eliminar tarea"
        message={
          taskToDelete
            ? `¿Estás seguro de que deseas eliminar la tarea "${taskToDelete.title}"? Esta acción no se puede deshacer.`
            : '¿Estás seguro de que deseas eliminar esta tarea?'
        }
        confirmLabel="Sí, eliminar"
        cancelLabel="Cancelar"
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
}
