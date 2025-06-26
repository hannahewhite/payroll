import React from 'react';

interface DropdownItem {
  label: string;
  onClick: () => void;
}

interface DropdownButtonProps {
  title: string;
  items: DropdownItem[];
  variant?: 'outline' | 'primary';
  className?: string;
}

export const DropdownButton: React.FC<DropdownButtonProps> = ({ title, items, variant = 'outline', className }) => {
  return (
    <div className={`dropdown ${className}`}>
      <button className={`btn btn-${variant}`} type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {title}
      </button>
      <ul className="dropdown-menu">
        {items.map((item, index) => (
          <li key={index}>
            <button className="dropdown-item" onClick={item.onClick}>
              {item.label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}; 