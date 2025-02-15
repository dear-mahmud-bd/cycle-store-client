import { toast, ToastOptions } from "react-toastify";
import Swal, { SweetAlertIcon } from "sweetalert2";

export const showToast = (
  type: "success" | "error" | "info" | "warning",
  message: string
) => {
  const options: ToastOptions = {
    position: "top-center",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
  };

  toast[type](message, options);
};

export const sweetToast = (
  s_title: string,
  s_message: string,
  s_icon: SweetAlertIcon
) => {
  Swal.fire({
    title: s_title,
    text: s_message,
    icon: s_icon,
    confirmButtonText: "Okay",
    customClass: {
      confirmButton: "btn btn-success text-white",
    },
  });
};
