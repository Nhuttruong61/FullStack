import React, { useEffect, useState } from 'react';
import { useSettings } from '../contexts/SettingsContext';
import { useTheme } from '../contexts/ThemeContext';

function TestTheme() {
  const { settings } = useSettings();
  const { theme } = useTheme();
  const [cssVars, setCssVars] = useState({});

  useEffect(() => {
    const root = document.documentElement;
    const vars = {
      '--header-bg': getComputedStyle(root).getPropertyValue('--header-bg'),
      '--header-text': getComputedStyle(root).getPropertyValue('--header-text'),
      '--primary-color': getComputedStyle(root).getPropertyValue('--primary-color'),
      '--background-color': getComputedStyle(root).getPropertyValue('--background-color'),
      '--text-color': getComputedStyle(root).getPropertyValue('--text-color'),
    };
    setCssVars(vars);
  }, [settings, theme]);

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace' }}>
      <h1>🔍 Theme Debug Page</h1>
      
      <div style={{ marginBottom: '30px' }}>
        <h2>Settings from Context:</h2>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
          {JSON.stringify(settings?.header, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Theme from Context:</h2>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px', overflow: 'auto' }}>
          {JSON.stringify(theme, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>CSS Variables in DOM:</h2>
        <pre style={{ background: '#f5f5f5', padding: '15px', borderRadius: '8px' }}>
          {JSON.stringify(cssVars, null, 2)}
        </pre>
      </div>

      <div style={{ marginBottom: '30px' }}>
        <h2>Visual Test:</h2>
        
        <div style={{
          backgroundColor: 'var(--header-bg)',
          color: 'var(--header-text)',
          padding: '20px',
          marginBottom: '10px',
          borderRadius: '8px'
        }}>
          Header Background Test (should use --header-bg)
        </div>

        <div style={{
          backgroundColor: 'var(--primary-color)',
          color: 'white',
          padding: '20px',
          marginBottom: '10px',
          borderRadius: '8px'
        }}>
          Primary Color Test (should use --primary-color)
        </div>

        <div style={{
          backgroundColor: 'var(--background-color)',
          color: 'var(--text-color)',
          border: '2px solid var(--border-color)',
          padding: '20px',
          borderRadius: '8px'
        }}>
          Background & Text Test
        </div>
      </div>
    </div>
  );
}

export default TestTheme;
