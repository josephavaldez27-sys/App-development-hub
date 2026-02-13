
import React from 'react';

interface ResortLogoProps {
  resortId: string;
  className?: string;
}

const ResortLogo: React.FC<ResortLogoProps> = ({ resortId, className = "w-12 h-12" }) => {
  // Traditional colors for branding accents
  const colors: Record<string, string> = {
    'niseko-united': '#e67e22', // Deep Orange
    'rusutsu-resort': '#27ae60', // Evergreen
    'kiroro-resort': '#8e44ad', // Purple
    'sapporo-teine': '#2980b9', // Sky Blue
    'furano-ski-resort': '#9b59b6', // Lavender
    'hoshino-resorts-tomamu': '#2c3e50', // Deep Indigo
    'sahoro-resort': '#f39c12', // Golden Sun
    'asahidake': '#7f8c8d', // Granite Gray
    'kamui-ski-links': '#c0392b' // Vermilion
  };

  const accentColor = colors[resortId] || '#1a2a3a';

  const renderLogo = () => {
    switch (resortId) {
      case 'niseko-united':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="20" y="20" width="25" height="25" fill={accentColor} rx="2" />
            <rect x="55" y="20" width="25" height="25" fill={accentColor} opacity="0.8" rx="2" />
            <rect x="20" y="55" width="25" height="25" fill={accentColor} opacity="0.6" rx="2" />
            <rect x="55" y="55" width="25" height="25" fill={accentColor} opacity="0.4" rx="2" />
          </svg>
        );
      case 'rusutsu-resort':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill="none" stroke={accentColor} strokeWidth="4" />
            <path d="M30 70 L50 30 L70 70" fill="none" stroke={accentColor} strokeWidth="6" strokeLinecap="round" />
            <circle cx="50" cy="20" r="5" fill={accentColor} />
          </svg>
        );
      case 'kiroro-resort':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M20 20 L20 80 M20 50 L70 20 M20 50 L70 80" fill="none" stroke={accentColor} strokeWidth="10" strokeLinecap="round" />
            <path d="M75 40 L85 50 L75 60" fill="none" stroke={accentColor} strokeWidth="4" />
          </svg>
        );
      case 'sapporo-teine':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M50 10 L60 40 L90 40 L65 60 L75 90 L50 70 L25 90 L35 60 L10 40 L40 40 Z" fill={accentColor} />
          </svg>
        );
      case 'furano-ski-resort':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10 80 Q 50 20 90 80" fill="none" stroke={accentColor} strokeWidth="8" />
            <rect x="20" y="85" width="60" height="4" fill={accentColor} opacity="0.5" />
          </svg>
        );
      case 'hoshino-resorts-tomamu':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <rect x="25" y="10" width="20" height="80" fill={accentColor} />
            <rect x="55" y="10" width="20" height="80" fill={accentColor} opacity="0.7" />
            <rect x="25" y="20" width="20" height="5" fill="white" opacity="0.3" />
            <rect x="55" y="30" width="20" height="5" fill="white" opacity="0.3" />
          </svg>
        );
      case 'sahoro-resort':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="35" fill={accentColor} />
            <path d="M20 50 H80" stroke="white" strokeWidth="4" />
          </svg>
        );
      case 'asahidake':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path d="M10 90 L50 10 L90 90 Z" fill="none" stroke={accentColor} strokeWidth="8" />
            <path d="M35 40 L50 10 L65 40" fill={accentColor} />
          </svg>
        );
      case 'kamui-ski-links':
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="none" stroke={accentColor} strokeWidth="2" />
            <circle cx="50" cy="50" r="35" fill="none" stroke={accentColor} strokeWidth="8" strokeDasharray="10 5" />
          </svg>
        );
      default:
        return (
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="40" fill={accentColor} />
          </svg>
        );
    }
  };

  return (
    <div className={`${className} flex items-center justify-center`}>
      {renderLogo()}
    </div>
  );
};

export default ResortLogo;
