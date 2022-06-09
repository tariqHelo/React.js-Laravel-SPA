import './bootstrap';

// import { render } from 'react-dom';
import { createRoot } from 'react-dom/client';
import PostIndex from './Pages/Posts';
const root = createRoot(document.getElementById('app'));
root.render(<PostIndex />);