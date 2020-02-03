export interface ISyntaxHighlightWebPartProps {
  isEditMode:boolean;
  editCodeContent: string;
  liveCodeContent: string;
  language: string;
  theme: string;
  fontSize: number;
  showGutter: boolean;
  fullWidth: boolean;
  align: string;
}