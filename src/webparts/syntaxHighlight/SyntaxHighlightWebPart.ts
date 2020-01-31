import * as React from 'react';
import * as ReactDom from 'react-dom';
import { Version, DisplayMode } from '@microsoft/sp-core-library';
import { BaseClientSideWebPart } from '@microsoft/sp-webpart-base';
import {
  IPropertyPaneConfiguration,
  PropertyPaneDropdown,
  PropertyPaneToggle,
  PropertyPaneCheckbox,
  PropertyPaneTextField,
} from '@microsoft/sp-property-pane';

import * as strings from 'SyntaxHighlightWebPartStrings';
import SyntaxHighlight from './components/SyntaxHighlight';
import { ISyntaxHighlightWebPartProps } from './ISyntaxHighlightWebPartProps';
import { ISyntaxHighlightProps } from './components/ISyntaxHighlightProps';

export default class SyntaxHighlightWebPart extends BaseClientSideWebPart<ISyntaxHighlightWebPartProps> {

    /**
   * @var
   * Unique ID of this Web Part instance
   */
  private guid: string;

  public render(): void {
    const props = this.properties;

    const element: React.ReactElement<ISyntaxHighlightProps > = React.createElement(
      SyntaxHighlight,
      {
        isEditMode: this.displayMode === DisplayMode.Edit,
        titleCode: this.properties.titleCode,
        editCodeContent: this.properties.editCodeContent,
        language: this.properties.language,
        theme: this.properties.theme,
        fontSize: this.properties.fontSize,
        showGutter: this.properties.showGutter,
        fullWidth: this.properties.fullWidth,
        align: this.properties.align,
        onChange: this.handleContentChange,
      }
    );

    ReactDom.render(element, this.domElement);
  }

     /**
   * Saves the updated content to the web part properties
   */
  private handleContentChange = (code: string) => {
    this.properties.editCodeContent = code;
  }

  protected onDispose(): void {
    ReactDom.unmountComponentAtNode(this.domElement);
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }


  /**
   * @function
   * Generates a GUID
   */
  private getGuid(): string {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
      this.s4() + '-' + this.s4() + this.s4() + this.s4();
  }

  /**
   * @function
   * Generates a GUID part
   */
  private s4(): string {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          groups: [
            {
              groupFields: [
                PropertyPaneTextField('titleCode', {
                  label: 'Title',
                  multiline: true
                }),
                PropertyPaneDropdown('language', {
                  label: 'Code Language',
                  options: [
                    {key: 'text', text: 'Plain Text'},
                    {key: 'javascript', text: 'Javascript'},
                    {key: 'sh', text: 'Bash/shell'},
                    {key: 'php', text: 'PHP'},
                    {key: 'python', text: 'Python'},
                    {key: 'css', text: 'CSS'},
                    {key: 'scss', text: 'SCSS'},
                    {key: 'xml', text: 'XML'},
                    {key: 'ruby', text: 'Ruby'},
                    {key: 'yaml', text: 'Yaml'},
                    {key: 'twig', text: 'Twig'},
                    {key: 'markdown', text: 'Markdown'},
                    {key: 'mysql', text: 'Mysql'},
                    {key: 'json', text: 'JSON'},
                    {key: 'html', text: 'HTML'},
                    {key: 'typescript', text: 'Typescript'},
                    {key: 'sql', text: 'SQL'},
                  ]
                }),
                PropertyPaneDropdown('theme', {
                  label: 'Theme',
                  options: [
                    {key: "monokai", text: "Monokai"},
                    {key: "github", text: "Github"},
                    {key: "tomorrow", text: "Tomorrow"},
                    {key: "kuroir", text: "Kuroir"},
                    {key: "twilight", text: "Twilight"},
                    {key: "xcode", text: "Xcode"},
                    {key: "textmate", text: "Textmate"},
                    {key: "solarized_dark", text: "Solarized Dark"},
                    {key: "solarized_light", text: "Solarized Light"},
                    {key: "terminal", text: "Terminal"}
                  ]
                }),
                PropertyPaneDropdown('fontSize', {
                  label: 'Font Size',
                  options: [
                    {key: 14, text: "14"},
                    {key: 16, text: "16"},
                    {key: 18, text: "18"},
                    {key: 20, text: "20"},
                    {key: 24, text: "24"},
                    {key: 28, text: "28"},
                    {key: 32, text: "32"},
                    {key: 40, text: "40"}
                  ]
                }),
                PropertyPaneToggle('showGutter', {
                  label: 'Show Gutter & Line Numbers',
                  onText: 'On',
                  offText: 'Off'
                }),
                PropertyPaneCheckbox('fullWidth', {
                  text: 'Set Full Width'
                }),
                PropertyPaneDropdown('align', {
                  label: 'Alignment',
                  options: [
                    {key: "left", text: "Left"},
                    {key: "center", text: "Center"},
                    {key: "right", text: "Right"}
                  ]
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
