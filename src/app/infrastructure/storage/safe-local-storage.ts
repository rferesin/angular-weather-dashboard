import { Injectable } from '@angular/core';

/**
 * Pequeno wrapper do localStorage que nunca lança exceção
 * (modo privado, cota estourada ou storage bloqueado).
 */
@Injectable({ providedIn: 'root' })
export class SafeLocalStorage {
  read(key: string): string | null {
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  }

  write(key: string, value: string): void {
    try {
      localStorage.setItem(key, value);
    } catch {
      // Sem persistência disponível: a aplicação segue funcionando em memória.
    }
  }
}
