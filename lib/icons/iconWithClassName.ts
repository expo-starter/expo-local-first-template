import type { LucideIcon } from "lucide-react-native";
import { cssInterop } from "nativewind";
import type { IconProps } from "phosphor-react-native/src/lib";

export function iconWithClassName(icon: LucideIcon) {
  cssInterop(icon, {
    className: {
      target: "style",
      nativeStyleToProp: {
        color: true,
        opacity: true,
        width: true,
        height: true,
      },
    },
  });
}
