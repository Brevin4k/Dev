import React, { createContext, useContext, useState, useEffect } from 'react';
import { PortfolioHouse, SiteConfig, InstagramConfig, InstagramPost } from '../types';
import { DEFAULT_PORTFOLIO_HOUSES, DEFAULT_VIDEO_CONFIG } from '../data/defaultPortfolio';
import { DEFAULT_INSTAGRAM_CONFIG } from '../data/defaultInstagram';

interface PortfolioContextType {
  houses: PortfolioHouse[];
  videoConfig: SiteConfig;
  instagramConfig: InstagramConfig;
  isAdminLoggedIn: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
  addHouse: (house: Omit<PortfolioHouse, 'id'>) => void;
  deleteHouse: (id: string) => void;
  updateVideoConfig: (config: Partial<SiteConfig>) => void;
  changeAdminPassword: (oldPass: string, newPass: string) => boolean;
  updateInstagramConfig: (config: Partial<InstagramConfig>) => void;
  addInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;
  deleteInstagramPost: (id: string) => void;
  setFullInstagramConfig: (config: InstagramConfig) => void;
}

const STORAGE_KEY_HOUSES = 'jk_vidros_portfolio_houses_v1';
const STORAGE_KEY_VIDEO = 'jk_vidros_video_config_v1';
const STORAGE_KEY_IG = 'jk_vidros_instagram_config_v1';
const STORAGE_KEY_PASS = 'jk_vidros_admin_pass_v1';
const DEFAULT_PASS = 'jk2026';

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [houses, setHouses] = useState<PortfolioHouse[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_HOUSES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // fallback
    }
    return DEFAULT_PORTFOLIO_HOUSES;
  });

  const [videoConfig, setVideoConfig] = useState<SiteConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_VIDEO);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_VIDEO_CONFIG;
  });

  const [instagramConfig, setInstagramConfig] = useState<InstagramConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_IG);
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return DEFAULT_INSTAGRAM_CONFIG;
  });

  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_HOUSES, JSON.stringify(houses));
    } catch {
      // quota or private mode
    }
  }, [houses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_VIDEO, JSON.stringify(videoConfig));
    } catch {
      // quota
    }
  }, [videoConfig]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_IG, JSON.stringify(instagramConfig));
    } catch {
      // quota
    }
  }, [instagramConfig]);

  const loginAdmin = (password: string): boolean => {
    const currentPass = localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASS;
    if (password === currentPass) {
      setIsAdminLoggedIn(true);
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdminLoggedIn(false);
  };

  const changeAdminPassword = (oldPass: string, newPass: string): boolean => {
    const currentPass = localStorage.getItem(STORAGE_KEY_PASS) || DEFAULT_PASS;
    if (oldPass !== currentPass) return false;
    if (!newPass || newPass.trim().length < 4) return false;
    localStorage.setItem(STORAGE_KEY_PASS, newPass.trim());
    return true;
  };

  const addHouse = (houseData: Omit<PortfolioHouse, 'id'>) => {
    const newHouse: PortfolioHouse = {
      ...houseData,
      id: `house-${Date.now()}`
    };
    setHouses((prev) => [newHouse, ...prev]);
  };

  const deleteHouse = (id: string) => {
    setHouses((prev) => prev.filter((h) => h.id !== id));
  };

  const updateVideoConfig = (configUpdate: Partial<SiteConfig>) => {
    setVideoConfig((prev) => ({ ...prev, ...configUpdate }));
  };

  const updateInstagramConfig = (configUpdate: Partial<InstagramConfig>) => {
    setInstagramConfig((prev) => ({ ...prev, ...configUpdate }));
  };

  const addInstagramPost = (postData: Omit<InstagramPost, 'id'>) => {
    const newPost: InstagramPost = {
      ...postData,
      id: `ig-${Date.now()}`
    };
    setInstagramConfig((prev) => ({
      ...prev,
      posts: [newPost, ...prev.posts]
    }));
  };

  const deleteInstagramPost = (id: string) => {
    setInstagramConfig((prev) => ({
      ...prev,
      posts: prev.posts.filter((p) => p.id !== id)
    }));
  };

  const setFullInstagramConfig = (config: InstagramConfig) => {
    setInstagramConfig(config);
  };

  return (
    <PortfolioContext.Provider
      value={{
        houses,
        videoConfig,
        instagramConfig,
        isAdminLoggedIn,
        loginAdmin,
        logoutAdmin,
        addHouse,
        deleteHouse,
        updateVideoConfig,
        changeAdminPassword,
        updateInstagramConfig,
        addInstagramPost,
        deleteInstagramPost,
        setFullInstagramConfig
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
