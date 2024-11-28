import { create } from 'zustand';

const useAuthStore = create((set) => ({
  showPassword: false,
  showConfirmPassword: false,
  togglePasswordVisibility: () =>
    set((state) => ({ showPassword: !state.showPassword })),
  toggleConfirmPasswordVisibility: () => 
    set((state) => ({ showConfirmPassword: !state.showConfirmPassword })),
}));

export default useAuthStore;
