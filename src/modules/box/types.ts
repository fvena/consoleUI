import type { Color } from "../style/types";

export type BorderStyle = "double" | "rounded" | "single";

export type TextAlign = "center" | "left" | "right";

export interface BoxOptions {
  align?: TextAlign;
  borderColor?: Color;
  borderStyle?: BorderStyle;
  horizontalPadding?: number;
  verticalPadding?: number;
  width?: number;
}

export interface BoxStyle {
  bottomLeft: string;
  bottomRight: string;
  horizontal: string;
  topLeft: string;
  topRight: string;
  vertical: string;
}
