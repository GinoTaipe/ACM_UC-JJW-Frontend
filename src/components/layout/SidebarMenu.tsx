import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

interface MenuItem {
  icon: string;
  label: string;
  path: string;
}

interface SidebarMenuProps {
  items: MenuItem[];
  isCollapsed: boolean;
}

const SidebarMenu: React.FC<SidebarMenuProps> = ({ items, isCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={() => navigate(item.path)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            width: '100%',
            padding: isCollapsed ? '12px' : '12px 20px',
            background: isActive(item.path) 
              ? 'linear-gradient(135deg, #2a4ea2, #3b82f6)' 
              : 'transparent',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            margin: '0 10px',
            color: isActive(item.path) ? 'white' : '#475569'
          }}
          onMouseEnter={(e) => {
            if (!isActive(item.path)) {
              e.currentTarget.style.backgroundColor = '#f1f5f9';
            }
          }}
          onMouseLeave={(e) => {
            if (!isActive(item.path)) {
              e.currentTarget.style.backgroundColor = 'transparent';
            }
          }}
        >
          <span style={{ fontSize: '18px' }}>{item.icon}</span>
          {!isCollapsed && (
            <span style={{
              fontSize: '14px',
              fontWeight: '500',
              whiteSpace: 'nowrap'
            }}>
              {item.label}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default SidebarMenu;