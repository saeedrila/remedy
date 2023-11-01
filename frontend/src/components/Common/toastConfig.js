import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

toast.configure({
  position: 'top-right',
  autoClose: 3000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  theme: 'light',
});
