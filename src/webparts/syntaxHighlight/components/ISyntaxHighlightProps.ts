export interface ISyntaxHighlightProps {
  isEditMode:boolean;
  titleCode: string;
  editCodeContent: string;
  liveCodeContent: string;
  language: string;
  theme: string;
  fontSize: number;
  showGutter: boolean;
  fullWidth: boolean;
  align: string;
  /**
   * Event occurs when content content changes
   */
  onChange: (code: string) => void;
}
