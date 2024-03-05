export interface IColorElementProps {
  color: string;
  name: string;
  index: number;
  removeColor: (index: number) => void;
  editColor: (index: number, newColor: string, newName: string) => void;
}
