export const ToastStatus = {
  Success: "success",
  Info: "info",
  Warn: "warn",
  Error: "error",
  Secondary: "secondary",
  Contrast: "contrast",
} as const;

export type ToastStatus = (typeof ToastStatus)[keyof typeof ToastStatus];

export const ToastPosition = {
  TopLeft: "top-left",
  TopCenter: "top-center",
  TopRight: "top-right",
  Center: "center",
  BottomLeft: "bottom-left",
  BottomCenter: "bottom-center",
  BottomRight: "bottom-right",
} as const;
