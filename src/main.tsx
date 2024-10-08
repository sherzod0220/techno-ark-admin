import { createRoot } from 'react-dom/client'
import 'react-toastify/dist/ReactToastify.css';
import './index.css'
import Root from './router/index'
createRoot(document.getElementById('root')!).render(
    <Root />
)
