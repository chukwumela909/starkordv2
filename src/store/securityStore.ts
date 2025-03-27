import { create } from 'zustand';


interface SecurityState {
  twoFactorEnabled: boolean;
  whitelistedAddresses: string[];
  whitelistedIPs: string[];
  loading: boolean;
  error: string | null;
  enableTwoFactor: () => Promise<string>;
  verifyTwoFactor: (code: string) => Promise<boolean>;
  disableTwoFactor: () => Promise<void>;
  addWhitelistedAddress: (address: string) => Promise<void>;
  removeWhitelistedAddress: (address: string) => Promise<void>;
  addWhitelistedIP: (ip: string) => Promise<void>;
  removeWhitelistedIP: (ip: string) => Promise<void>;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  twoFactorEnabled: false,
  whitelistedAddresses: [],
  whitelistedIPs: [],
  loading: false,
  error: null,

  enableTwoFactor: async () => {
    set({ loading: true, error: null });
    try {
      // Generate secret and QR code
      const secret = 'DEMO_2FA_SECRET'; // Replace with actual 2FA implementation
      return secret;
    } catch (error) {
      set({ error: 'Failed to enable 2FA' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  verifyTwoFactor: async (code: string) => {
    set({ loading: true, error: null });
    try {
      // Verify 2FA code
      const isValid = code === '123456'; // Replace with actual verification
      if (isValid) {
        set({ twoFactorEnabled: true });
      }
      return isValid;
    } catch (error) {
      set({ error: 'Failed to verify 2FA code' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  disableTwoFactor: async () => {
    set({ loading: true, error: null });
    try {
      set({ twoFactorEnabled: false });
    } catch (error) {
      set({ error: 'Failed to disable 2FA' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addWhitelistedAddress: async (address: string) => {
    set({ loading: true, error: null });
    try {
      const addresses = [...get().whitelistedAddresses, address];
      set({ whitelistedAddresses: addresses });
    } catch (error) {
      set({ error: 'Failed to add address' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeWhitelistedAddress: async (address: string) => {
    set({ loading: true, error: null });
    try {
      const addresses = get().whitelistedAddresses.filter(a => a !== address);
      set({ whitelistedAddresses: addresses });
    } catch (error) {
      set({ error: 'Failed to remove address' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  addWhitelistedIP: async (ip: string) => {
    set({ loading: true, error: null });
    try {
      const ips = [...get().whitelistedIPs, ip];
      set({ whitelistedIPs: ips });
    } catch (error) {
      set({ error: 'Failed to add IP' });
      throw error;
    } finally {
      set({ loading: false });
    }
  },

  removeWhitelistedIP: async (ip: string) => {
    set({ loading: true, error: null });
    try {
      const ips = get().whitelistedIPs.filter(i => i !== ip);
      set({ whitelistedIPs: ips });
    } catch (error) {
      set({ error: 'Failed to remove IP' });
      throw error;
    } finally {
      set({ loading: false });
    }
  }
}));