import { useState, useEffect, FormEvent } from 'react';
import { Camera, ArrowLeft } from 'lucide-react';
import { Profile, Screen } from '../types';
import ConfirmModal from './ConfirmModal';

interface ProfileScreenProps {
  profile: Profile;
  onSaveProfile: (profile: Profile) => void;
  onNavigate: (screen: Screen, transitionType?: 'push' | 'push_back') => void;
}

export default function ProfileScreen({
  profile,
  onSaveProfile,
  onNavigate,
}: ProfileScreenProps) {
  const [avatarUrl, setAvatarUrl] = useState(profile.avatarUrl);
  const [nombre, setNombre] = useState(profile.nombre);
  const [apellidos, setApellidos] = useState(profile.apellidos);
  const [previewUrl, setPreviewUrl] = useState(profile.avatarUrl);

  // ConfirmModal state
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  // Sync state when initial profile changes
  useEffect(() => {
    setAvatarUrl(profile.avatarUrl);
    setNombre(profile.nombre);
    setApellidos(profile.apellidos);
    setPreviewUrl(profile.avatarUrl);
  }, [profile]);

  const handleUrlBlur = () => {
    if (avatarUrl.trim()) {
      setPreviewUrl(avatarUrl.trim());
    } else {
      setPreviewUrl('');
    }
  };

  const handleSave = (e: FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      avatarUrl: avatarUrl.trim(),
      nombre: nombre.trim(),
      apellidos: apellidos.trim(),
    });
    // Show success modal instead of changing button text
    setSuccessModalOpen(true);
  };

  const handleSuccessConfirm = () => {
    setSuccessModalOpen(false);
    onNavigate('tasks', 'push_back');
  };

  const handleCancel = () => {
    onNavigate('tasks', 'push_back');
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* Back link */}
      <button
        onClick={handleCancel}
        className="flex items-center gap-2 text-sm font-semibold text-[var(--brand)] hover:text-[var(--brand-hover)] mb-6 cursor-pointer group active:scale-95"
      >
        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
        <span>Volver a Tareas</span>
      </button>

      {/* Screen Header */}
      <header className="mb-8">
        <h1 className="text-3xl font-extrabold text-[var(--text)] tracking-tight mb-2">
          Configuración de Perfil
        </h1>
        <p className="text-base text-[var(--text-variant)]">
          Gestiona tu información personal y preferencias de la aplicación.
        </p>
      </header>

      {/* Profile Card */}
      <div className="bg-[var(--surface)] rounded-2xl p-6 md:p-8 shadow-[0_4px_20px_rgba(6,120,215,0.05)] border border-[var(--surface-mid)] transition-colors duration-300">
        <form onSubmit={handleSave} className="space-y-8" id="profile-form">
          {/* Avatar */}
          <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
            <div className="relative group shrink-0">
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[var(--surface-low)] shadow-md flex items-center justify-center bg-gray-100 dark:bg-gray-800">
                <img
                  key={previewUrl}
                  id="form-avatar-preview"
                  alt="Vista previa de avatar"
                  className="w-full h-full object-cover"
                  src={previewUrl || 'https://ui-avatars.com/api/?name=User&background=005da9&color=fff&size=200'}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src =
                      'https://ui-avatars.com/api/?name=User&background=005da9&color=fff&size=200';
                  }}
                />
              </div>
              <div className="absolute inset-0 bg-[#2d3137]/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera size={24} className="text-white" />
              </div>
            </div>

            <div className="flex-1 w-full">
              <label
                htmlFor="avatarUrl"
                className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-2"
              >
                URL de imagen de avatar
              </label>
              <input
                id="avatarUrl"
                name="avatarUrl"
                type="url"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                onBlur={handleUrlBlur}
                placeholder="https://ejemplo.com/imagen.jpg"
                className="w-full py-2 bg-transparent text-[var(--text)] border-b-2 border-[var(--border)] focus:outline-none focus:border-[var(--brand)] transition-all text-sm font-medium"
              />
              <p className="text-xs text-[var(--text-muted)] mt-2">
                Pega la dirección de una imagen online para actualizar tu foto en tiempo real.
              </p>
            </div>
          </div>

          {/* Nombre / Apellidos */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="nombre"
                className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-2"
              >
                Nombre
              </label>
              <input
                id="nombre"
                name="nombre"
                type="text"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                placeholder="Tu nombre"
                required
                className="w-full py-2 bg-transparent text-[var(--text)] border-b-2 border-[var(--border)] focus:outline-none focus:border-[var(--brand)] transition-all text-sm font-medium"
              />
            </div>

            <div>
              <label
                htmlFor="apellidos"
                className="block text-xs font-bold text-[var(--text-variant)] uppercase tracking-wider mb-2"
              >
                Apellidos
              </label>
              <input
                id="apellidos"
                name="apellidos"
                type="text"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
                placeholder="Tus apellidos"
                required
                className="w-full py-2 bg-transparent text-[var(--text)] border-b-2 border-[var(--border)] focus:outline-none focus:border-[var(--brand)] transition-all text-sm font-medium"
              />
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-[var(--surface-mid)] flex justify-end gap-3">
            <button
              type="button"
              onClick={handleCancel}
              className="px-6 py-2.5 text-sm font-semibold text-[var(--text-variant)] border border-[var(--border)] hover:bg-[var(--surface-low)] rounded-lg transition-colors cursor-pointer active:scale-95"
            >
              Cancelar
            </button>

            <button
              id="save-btn"
              type="submit"
              className="px-6 py-2.5 text-sm font-semibold text-white rounded-lg transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer bg-[var(--brand)] hover:bg-[var(--brand-hover)]"
            >
              <span>Guardar Cambios</span>
            </button>
          </div>
        </form>
      </div>

      {/* ─── ConfirmModal de éxito al guardar ───────────────────────────── */}
      <ConfirmModal
        isOpen={successModalOpen}
        variant="success"
        title="¡Perfil guardado!"
        message="Tus cambios han sido guardados correctamente. Tu perfil ha sido actualizado y los datos están sincronizados."
        confirmLabel="Aceptar"
        infoOnly={true}
        onConfirm={handleSuccessConfirm}
        onCancel={handleSuccessConfirm}
      />
    </div>
  );
}
