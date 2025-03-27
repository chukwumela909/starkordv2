import { create } from 'zustand';
import axios from 'axios';




interface User {
  id: string;
  name: string;
  country: string;
  earnings: string;
  phone: string;
  referral_code: string;
  referral_rewards: number;
  total_referrals: string;
  active_referrals: string;
  daily_returns: {
    amount: number;
    daily_apr: number;
  };
  monthly_projection: {
    amount: number;
    monthly_apr: number;
  };
  annual_projection: {
    amount: number;
    apy: number;
  };
  total_staked: number;
  total_rewards: number;
  active_stake_count: number;
  daily_rewards: number;
}

interface AuthState {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string, country: string,referred_by: string, phone: string) => Promise<void>;
  forgotPassword: (email: string,) => Promise<void>;
  resetPassword: (reset_token: string, new_password: string) => Promise<void>;
  updateProfile: ( name: string, country: string, phone: string) => Promise<void>;
  changePassword: ( password: string,) => Promise<void>;
  fetchUserData: () => Promise<void>;
  signOut: () => Promise<void>;
  clearSession: () => void;
}



export const useAuthStore = create<AuthState>((set) => ({
  
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  setLoading: (loading) => set({ loading }),

  signIn: async (email, password) => {
    try {
      const response = await axios.post("https://app.starkord.com/api/auth/login.php", {
        email,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');
      const data = response.data;
      console.log(data.user);
      localStorage.setItem('auth-token', data.token);

      set({ user: data.user });
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  signUp: async (email, password, name, country, referred_by, phone) => {

    try {

      const payload: any = {
        email,
        password,
        name,
        country,
        phone
      };

      if (referred_by) {
        payload.referred_by = referred_by;
      }

      const response = await axios.post("https://app.starkord.com/api/auth/register.php", payload, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');

      const data = response.data;
      console.log(data);
      // set({ user: data.user });
      if (response.status == 200) {
        const alertMessage = document.createElement('div');
        alertMessage.textContent = "User created successfully";
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.backgroundColor = 'green';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        document.body.appendChild(alertMessage);

        setTimeout(() => {
          document.body.removeChild(alertMessage);
        }, 3000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  forgotPassword: async (email) => {
    try {
      const response = await axios.post("https://app.starkord.com/api/auth/forgot-password.php", {
        email
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');
      const data = response.data;
      console.log(data);
      // set({ user: data.user });
      if (response.status == 200) {
        const alertMessage = document.createElement('div');
        alertMessage.textContent = "Password reset link has been sent to your email";
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.backgroundColor = 'green';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        document.body.appendChild(alertMessage);

        setTimeout(() => {
          document.body.removeChild(alertMessage);
        }, 3000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  resetPassword: async (reset_token, new_password) => {
    try {
      const response = await axios.post("https://app.starkord.com/api/auth/reset-password.php", {
        reset_token: reset_token,
        new_password : new_password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');
      const data = response.data;
      console.log(data);
      // set({ user: data.user });
      if (response.status == 200) {
        const alertMessage = document.createElement('div');
        alertMessage.textContent = "Password reset successfully";
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.backgroundColor = 'green';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        document.body.appendChild(alertMessage);

        setTimeout(() => {
          document.body.removeChild(alertMessage);
        }, 3000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  updateProfile: async ( name, country, phone) => {
 
    try {
      const token = localStorage.getItem('auth-token');
      console.log(token);
      if (!token){
        console.log("No auth token found")
        throw new Error('No auth token found');
      } 
      const response = await axios.post("https://app.starkord.com/api/auth/update-profile.php", {
        token,
        name,
        country,
        phone
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');

      const data = response.data;
      console.log(data);
      // set({ user: data.user });
      if (response.status == 200) {
        const alertMessage = document.createElement('div');
        alertMessage.textContent = "User updated successfully";
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.backgroundColor = 'green';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        document.body.appendChild(alertMessage);

        setTimeout(() => {
          document.body.removeChild(alertMessage);
        }, 3000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  changePassword: async ( password) => {
 
    try {
      const token = localStorage.getItem('auth-token');
      console.log(token);
      if (!token){
        console.log("No auth token found")
        throw new Error('No auth token found');
      } 
      const response = await axios.post("https://app.starkord.com/api/auth/update-profile.php", {
        token,
        password
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });


      if (response.status !== 200) throw new Error('Sign in failed');

      const data = response.data;
      console.log(data);
      // set({ user: data.user });
      if (response.status == 200) {
        const alertMessage = document.createElement('div');
        alertMessage.textContent = "User updated successfully";
        alertMessage.style.position = 'fixed';
        alertMessage.style.top = '50%';
        alertMessage.style.left = '50%';
        alertMessage.style.transform = 'translate(-50%, -50%)';
        alertMessage.style.backgroundColor = 'green';
        alertMessage.style.color = 'white';
        alertMessage.style.padding = '10px';
        alertMessage.style.borderRadius = '5px';
        document.body.appendChild(alertMessage);

        setTimeout(() => {
          document.body.removeChild(alertMessage);
        }, 3000);
      }
    } catch (error) {
      console.error('Sign in error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  clearSession: () => {
    localStorage.removeItem('auth-token');
    set({ user: null, loading: false });
  },

  fetchUserData: async () => {
  

    try {
      const token = localStorage.getItem('auth-token');
      console.log(token);
      if (!token){
        console.log("No auth token found")
        throw new Error('No auth token found');
      } 

      const response = await axios.post("https://app.starkord.com/api/auth/user-data.php", {
        token: token
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          "Authorization": "Bearer a7bX9c2dE5fg1h8i"
        },
      });

      console.log(response);

      if (response.status !== 200) throw new Error('Failed to fetch user data');
      const data = response.data;
      console.log(data);
      set({ user: data.user });
   
      
    } catch (error) {
      console.error('Fetch user data error:', error);
      if (axios.isAxiosError(error) && error.response) {
        throw error.response.data;
      } else {
        throw error;
      }
    }
  },

  signOut: async () => {
    try {
      const response = await fetch('/api/signout', {
        method: 'POST',
      });

      if (!response.ok) {
        throw new Error('Sign out failed');
      }

      // Clear all storage
      localStorage.clear();
      sessionStorage.clear();

      // Reset the store state
      // set({ user: null, loading: false });
    } catch (error) {
      console.error('Sign out error:', error);
      // Even if there's an error, clear the local state
      localStorage.clear();
      sessionStorage.clear();
      // set({ user: null, loading: false });
      throw error;
    }
  },
}));