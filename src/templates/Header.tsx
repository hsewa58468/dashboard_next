import React from 'react';

interface HeaderProps {
    title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Dashboard' }) => (
    <header
        style={{
            background: '#222',
            color: '#fff',
            padding: '1rem 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
        }}
    >
        <h1 style={{ margin: 0, fontSize: '1.5rem' }}>{title}</h1>
        {/* Add navigation or user info here if needed */}
    </header>
);

export default Header;