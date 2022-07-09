import Swal, { SweetAlertResult } from "sweetalert2";

const CustomSwal = Swal.mixin({
  customClass: {
    confirmButton: "Button mr-xs",
    cancelButton: "Button Button--primary ml-xs",
  },
  buttonsStyling: false,
});

const Toast = Swal.mixin({
  toast: true,
  position: "bottom",
  showConfirmButton: false,
  timer: 3000,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export function DeleteBookDialog(): Promise<SweetAlertResult<unknown>> {
  return CustomSwal.fire({
    title: "Kamu ingin menghapus buku ini?",
    text: "Kamu tidak dapat mengembalikan ini!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#27ae60",
    cancelButtonColor: "#fa4032",
    confirmButtonText: "Ya, hapus!",
    cancelButtonText: "Batal",
  });
}

export function SuccessToast(
  message: string,
): Promise<SweetAlertResult<unknown>> {
  return Toast.fire({
    icon: "success",
    title: message,
  });
}
