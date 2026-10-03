import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { DemoFlowProvider } from './state/DemoFlowContext';
import App from './App';
import './styles/global.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <DemoFlowProvider>
      <App />
    </DemoFlowProvider>
  </StrictMode>,
);
