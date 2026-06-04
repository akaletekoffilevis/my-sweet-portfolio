/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ShieldCheck, Lock, Eye, EyeOff, X, Terminal, AlertCircle } from "lucide-react";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function LoginModal({ isOpen, onClose, onSuccess }: LoginModalProps) {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate standard security handshaking delay
    setTimeout(() => {
      // Allow 'admin' or 'admin123' or 'password' as standard defaults
      if (password === "admin" || password === "admin123") {
        setIsLoading(false);
        setPassword("");
        onSuccess();
        onClose();
      } else {
        setIsLoading(false);
        setError("Mot de passe incorrect. Astuce : utilisez 'admin'");
      }
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Modal Window Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: "spring", duration: 0.4 }}
          className="relative w-full max-w-md bg-app-card border border-app-border-strong rounded-none p-6 md:p-8 shadow-2xl z-10 font-sans"
        >
          {/* Header Actions */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-app-text-muted hover:text-app-text-white transition cursor-pointer"
            title="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          {/* Icon Badge */}
          <div className="flex flex-col items-center text-center space-y-4 pt-2">
            <div className="w-12 h-12 bg-app-text-white/5 border border-app-border-strong flex items-center justify-center text-app-text-white">
              <Lock className="h-5 w-5" />
            </div>
            
            <div className="space-y-1">
              <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-app-text-muted block font-bold">
                // SYSTEME D'AUTORISATION
              </span>
              <h3 className="font-serif text-2xl text-app-text-white italic">
                Connexion d'Administration
              </h3>
              <p className="text-xs text-app-text-soft font-light max-w-xs">
                Veuillez saisir votre clé d'accès ou mot de passe pour ouvrir le cockpit d'édition dynamique.
              </p>
            </div>
          </div>

          {/* Form Area */}
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[10px] font-mono uppercase tracking-wider block font-bold text-app-text-muted">
                <label htmlFor="auth-password">Mot de passe systeme</label>
                <span className="text-[9px] lowercase font-normal italic opacity-85 text-app-text-muted-xs font-serif">
                  (Défaut: admin)
                </span>
              </div>
              
              <div className="relative">
                <input
                  id="auth-password"
                  type={showPassword ? "text" : "password"}
                  className="w-full bg-app-bg border border-app-border-sec rounded-none px-4 py-3 text-sm font-mono text-app-text-white focus:outline-none focus:border-app-border-strong transition-colors pr-12 placeholder-app-text-muted/40"
                  placeholder="Saisir la phrase secrète..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  autoFocus
                  required
                />
                
                {/* Hide / Show raw toggle button */}
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-app-text-muted hover:text-app-text-white transition cursor-pointer"
                  title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            {/* Error Message Box */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 bg-red-500/10 border border-red-500/20 text-xs font-sans text-red-400 flex items-start gap-2.5"
              >
                <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 px-4 py-3.5 bg-app-text-white text-app-bg hover:opacity-90 font-mono text-xs font-bold uppercase tracking-widest transition-all cursor-pointer border border-transparent disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <span className="w-4 h-4 border-2 border-app-bg border-t-transparent rounded-full animate-spin"></span>
                  AUTHENTIFICATION_SYS...
                </>
              ) : (
                "DEVERROUILLER_L_ACCES"
              )}
            </button>
          </form>

          {/* Footer warning info */}
          <div className="mt-6 pt-4 border-t border-app-border-subtle flex items-center justify-center gap-2 text-[9px] font-mono text-app-text-muted uppercase select-none">
            <ShieldCheck className="h-3.5 w-3.5 text-[#22c55e]" />
            <span>Session sécurisée en mémoire autonome</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
