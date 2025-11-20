import { forwardRef } from "react";
import { Toast, type ToastProps } from "primereact/toast";

interface CustomToastProps extends ToastProps {}

const CustomToast = forwardRef<Toast, CustomToastProps>((props, ref) => {
  const { position = "top-right", ...rest } = props;

  return <Toast ref={ref} position={position} {...rest} />;
});

export default CustomToast;
