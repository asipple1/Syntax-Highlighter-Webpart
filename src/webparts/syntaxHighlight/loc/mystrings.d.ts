declare interface ISyntaxHighlightWebPartStrings {
  PropertyPaneDescription: string;
  titleCode: string;
  language: string;
  theme: string;
  fontSize: number;
  showGutter: boolean;
}

declare module 'SyntaxHighlightWebPartStrings' {
  const strings: ISyntaxHighlightWebPartStrings;
  export = strings;
}
