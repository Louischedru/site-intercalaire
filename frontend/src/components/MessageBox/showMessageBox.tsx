import MessageBox from './MessageBox';
import { createRoot } from 'react-dom/client';

export default function showMessageBox(status: boolean, message?: string) {
  const container = document.createElement('div');
  const root = createRoot(container);

  root.render(<MessageBox status={status} message={message} />);

  setTimeout(() => {
    container.remove();
  }, 2000);
}
