require('./bootstrap');

import { createRoot } from 'react-dom/client';
// import PostsIndex from "./Pages/Posts";
import App from "./Layouts/App";
const root = createRoot(document.getElementById('app'));
// root.render(<PostsIndex />)
root.render(<App />)