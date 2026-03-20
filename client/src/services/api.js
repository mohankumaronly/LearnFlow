import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // ✅ CRITICAL - sends HTTP-only cookies automatically
  timeout: 30000,
});

// 🔥 REMOVED Authorization header - cookies handle authentication now
api.interceptors.request.use(
  (config) => {
    console.log(`%c🌐 REQUEST: ${config.method.toUpperCase()} ${config.url}`, 'color: blue; font-weight: bold');
    console.log('📤 Request Details:', {
      url: config.url,
      method: config.method,
      baseURL: config.baseURL,
      withCredentials: config.withCredentials,
      headers: config.headers,
      data: config.data || config.params || 'No data',
      timestamp: new Date().toISOString()
    });

    // Check cookies being sent
    console.log('🍪 Cookies present:', document.cookie ? '✅ Yes' : '❌ No');
    if (document.cookie) {
      console.log('Cookie string:', document.cookie);
    }

    // Check localStorage
    console.log('💾 localStorage:', {
      refreshToken: localStorage.getItem('refreshToken') ? '✅ Present' : '❌ Missing',
      user: localStorage.getItem('user') ? '✅ Present' : '❌ Missing',
      accessToken: localStorage.getItem('accessToken') ? '⚠️ Present (should be in cookie!)' : '✅ Not in localStorage (good)'
    });

    // ❌ REMOVED: No longer adding Authorization header
    // Token is now in HTTP-only cookie and sent automatically

    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

// 🐛 DEBUG: Log all response details
api.interceptors.response.use(
  (response) => {
    console.log(`%c📥 RESPONSE: ${response.config.method.toUpperCase()} ${response.config.url} - ${response.status}`, 'color: green; font-weight: bold');
    console.log('Response Details:', {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      timestamp: new Date().toISOString()
    });

    // Check for set-cookie headers (if any)
    const setCookie = response.headers['set-cookie'];
    if (setCookie) {
      console.log('🍪 SET-COOKIE header received:', setCookie);
    }

    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    
    console.log(`%c❌ ERROR RESPONSE: ${originalRequest?.method?.toUpperCase()} ${originalRequest?.url} - ${error.response?.status}`, 'color: red; font-weight: bold');
    console.log('Error Details:', {
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      headers: error.response?.headers,
      url: originalRequest?.url,
      method: originalRequest?.method,
      timestamp: new Date().toISOString()
    });

    // Handle 401 Unauthorized - token expired
    if (
      error.response?.status === 401 &&
      originalRequest &&
      !originalRequest._retry &&
      !originalRequest.url.includes('/auth/refresh')
    ) {
      originalRequest._retry = true;

      console.log('%c🔄 TOKEN REFRESH ATTEMPT', 'color: purple; font-weight: bold');

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        console.log('Refresh token available:', refreshToken ? '✅' : '❌');
        
        if (!refreshToken) {
          console.log('❌ No refresh token available');
          throw new Error('No refresh token');
        }

        console.log('Calling refresh endpoint...');
        // Access token cookie is sent automatically with withCredentials: true
        const response = await api.post('/auth/refresh', {
          refreshToken,
        });

        console.log('✅ Refresh successful:', response.data);

        // Update refresh token if backend sends new one
        if (response.data.refreshToken) {
          localStorage.setItem('refreshToken', response.data.refreshToken);
          console.log('✅ New refresh token stored');
        }

        console.log('Retrying original request...');
        return api(originalRequest);
        
      } catch (refreshError) {
        console.error('❌ Refresh failed:', refreshError);
        
        console.log('Clearing localStorage...');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        
        console.log('Redirecting to login...');
        window.location.href = '/signin';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 🐛 Helper function to test endpoints manually
export const testEndpoint = async (endpoint, method = 'GET', data = null) => {
  try {
    console.log(`🧪 Testing ${method} ${endpoint}`);
    const response = await api({
      method,
      url: endpoint,
      data
    });
    console.log('✅ Test success:', response.data);
    return response.data;
  } catch (error) {
    console.error('❌ Test failed:', error.response?.status, error.response?.data);
    return null;
  }
};

// 🐛 Helper to check auth status
export const checkAuthStatus = () => {
  console.log('%c🔐 AUTH STATUS CHECK', 'color: blue; font-size: 14px');
  console.log('localStorage:', {
    refreshToken: localStorage.getItem('refreshToken') ? '✅' : '❌',
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : '❌'
  });
  console.log('Cookies:', document.cookie || '❌ No cookies');
  console.log('Current URL:', window.location.href);
  console.log('Path:', window.location.pathname);
  
  // Check if user is from stored data
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    console.log('👤 User from storage:', {
      name: user.fullName,
      email: user.email,
      role: user.role,
      hasProfileImage: !!user.profileImage
    });
  }
  
  return {
    hasRefreshToken: !!localStorage.getItem('refreshToken'),
    hasUser: !!localStorage.getItem('user'),
    cookies: document.cookie,
    path: window.location.pathname
  };
};

// 🐛 Helper to test profile endpoint
export const testProfileEndpoint = async () => {
  console.log('🧪 Testing profile endpoint...');
  
  // Try different possible endpoints
  const endpoints = [
    '/users/profile',
    '/user/profile',
    '/profile',
    '/api/users/profile',
    '/api/user/profile'
  ];
  
  for (const endpoint of endpoints) {
    try {
      console.log(`Testing ${endpoint}...`);
      const response = await api.get(endpoint);
      console.log(`✅ ${endpoint} works!`, response.data);
      return { success: true, endpoint, data: response.data };
    } catch (error) {
      console.log(`❌ ${endpoint} failed: ${error.response?.status}`);
    }
  }
  
  console.log('❌ No profile endpoint works');
  return { success: false, error: 'No working endpoint found' };
};

// Make debug helpers available globally in development
if (import.meta.env.DEV) {
  window.__auth = {
    check: checkAuthStatus,
    testProfile: testProfileEndpoint,
    test: testEndpoint,
    storage: {
      get: (key) => localStorage.getItem(key),
      set: (key, value) => localStorage.setItem(key, value),
      clear: () => {
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        console.log('🧹 Cleared auth data');
      }
    }
  };
  console.log('🐛 Auth debug tools available. Try: window.__auth.check()');
}

export default api;