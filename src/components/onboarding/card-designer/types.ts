
export interface CardDesignerProps {
  card: any;
  selectedBackground: string;
  setSelectedBackground: (bg: string) => void;
  textColor: string;
  setTextColor: (color: string) => void;
  status: string;
  setStatus: (status: string) => void;
  links: Array<{type: string, url: string}>;
  handleLinkChange: (index: number, field: 'type' | 'url', value: string) => void;
  onComplete: () => void;
  backgroundOptions: string[];
}

export interface ColorOption {
  value: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface GradientOption {
  value: string;
  isSelected: boolean;
  onSelect: () => void;
}

export interface CustomColorProps {
  customHexColor: string;
  setCustomHexColor: (color: string) => void;
  applyCustomColor: () => void;
  opacity: number;
  handleOpacityChange: (value: number[]) => void;
}

export interface ImageUploadProps {
  handleImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  customImage: string | null;
}
