import { create } from "zustand";
import axios from "axios";

const API_URL = import.meta.env.MODE === "development" ? "http://localhost:5000/api/auth" :"/" ;


axios.defaults.withCredentials = true;

export const userAuthStore = create((set) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  


//   Sign UP
  signup: async (email, password, name) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axios.post(`${API_URL}/signup`, {
        email,
        password,
        name,
      });
      set({
        user: response.data.user,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      });
    } catch (error) {
      // console.warn(error)
      set({
        error: error?.response?.data?.message || "Error while signing up",
        isLoading: false,
      });
      throw error;
    }
  },


//   Verify Email
  verifyEmail: async (token) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axios.post(`${API_URL}/verify-email`, { token });
      set({
        user: response.data.user,
        isLoading: false,
        error:null

      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error While verifying email",
        isLoading: false,
      });
      throw error;
    }
  },


//   Check Auth
  checkAuth: async () => {
    set({
      isCheckingAuth: true,
      error: null,
    });
    try {
      const response = await axios.get(`${API_URL}/check-auth`);
      set({
        user: response.data.user,
        isAuthenticated: true,
        isCheckingAuth: false,
      });
      // const response = await axios.get()
    } catch (error) {
      set({
        error: null,
        isAuthenticated: false,
        isCheckingAuth: false,
      });
    }
  },



  //  Login
  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
        const response = await axios.post(`${API_URL}/login`, { email, password });
        set({
            isAuthenticated: true,
            user: response.data.user,
            error: null,
            isLoading: false,
        });
    } catch (error) {
        set({ error: error?.response?.data?.message || "Error logging in", isLoading: false });
        throw error;
    }
},

//   Log Out
  logout: async () => {
    set({
      isLoading: true,
      error: null,
    });
    try {
      await axios.post(`${API_URL}/logout`);
      set({
        isLoading: false,
        isAuthenticated: false,
        error: null,
      });
    } catch (error) {
      set({
        error: error.response.data.message || "Error Logging out",
        isLoading: false,
      });

      throw error;
    }
  },

  forgotPassword:async(email)=>{
    set({
      error:null,
      isLoading:true
    })

    try{
      const response = await axios.post(`${API_URL}/forgot-password`,{email})
      set({
        error:null,
        isLoading:false,

      })



    }catch(error){
      set({
        error:error?.response?.message?.data || "Error reseting Password",
        isLoading:false
      })
      throw error
    }
  },

  resetPassword: async (token, password) => {
		set({ isLoading: true, error: null });
		try {
			const response = await axios.post(`${API_URL}/reset-password/${token}`, { password });
			set({ message: response.data.message, isLoading: false });
		} catch (error) {
			set({
				isLoading: false,
				error: error.response.data.message || "Error resetting password",
			});
			throw error;
		}
	},


  
}));
