import * as React from 'react';
import styles from './SyntaxHighlight.module.scss';
import { ISyntaxHighlightProps } from './ISyntaxHighlightProps';
import { PrimaryButton, IIconProps } from 'office-ui-fabric-react';


// Copy to clipboar.
import {CopyToClipboard} from 'react-copy-to-clipboard';

// Ace Editor.
import AceEditor from 'react-ace';

// Themes TODO: Look into a better way to handle language and theme arrays.
const copyIcon: IIconProps = { iconName: 'Copy' };

// Supported Languages.
const languages = [
  "javascript",
  "php",
  "python",
  "apache_conf",
  "sh",
  "css",
  "sass",
  "scss",
  "xml",
  "ruby",
  "yaml",
  "twig",
  "markdown",
  "mysql",
  "json",
  "html",
  "typescript"
];

const themes = [
  "monokai",
  "github",
  "tomorrow",
  "kuroir",
  "twilight",
  "xcode",
  "textmate",
  "solarized_dark",
  "solarized_light",
  "terminal"
];

languages.forEach(lang => {
  require(`ace-builds/src-noconflict/mode-${lang}`);
  require(`ace-builds/src-noconflict/snippets/${lang}`);
});
themes.forEach(theme => require(`ace-builds/src-noconflict/theme-${theme}`));

export default class SyntaxHighlight extends React.Component<ISyntaxHighlightProps, {}> {

  constructor(props) {
    super(props);

    this._onClick = this._onClick.bind(this);
  }

  public handleChange = (data) => {
    this.props.onChange(data);
  }

  private _onClick() {

  }

  public render(): React.ReactElement<ISyntaxHighlightProps> {
    const content = this.props.editCodeContent ? this.props.editCodeContent : '';
    const alignment = this.props.align ? `container__${this.props.align}` : 'container__left';
    const fullWidth = this.props.fullWidth ? `container__full_width` : '';
    return (
      <div className={styles.syntaxHighlight}>

        <div className={`${styles.container} ${styles[alignment]} ${styles[fullWidth]}`}>
          { this.props.titleCode &&
            <h3 className={styles.syntaxHighlight__headline}>
              {this.props.titleCode}
            </h3>
          }
          { !this.props.isEditMode &&
            <CopyToClipboard text={content}>
                <PrimaryButton
                className={styles.clipboardTab}
                text="Copy"
                iconProps={copyIcon}
                onClick={this._onClick}
              />
            </CopyToClipboard>
          }
          { this.props.isEditMode &&
            <AceEditor 
              theme={this.props.theme ? this.props.theme : 'monokai'}
              mode={this.props.language ? this.props.language : 'javascript'}
              showGutter={this.props.showGutter}
              fontSize={this.props.fontSize ? this.props.fontSize : 14}
              value={content}
              width="100%"
              onChange={this.handleChange}
              enableSnippets={true}
              wrapEnabled={true}
              maxLines={Infinity}
              setOptions={{
                showLineNumbers: true,
                displayIndentGuides: true,
                enableBasicAutocompletion: true,
                enableLiveAutocompletion: true,
                tabSize: 2
              }}
            />
          }
          { !this.props.isEditMode &&
            <AceEditor 
            theme={this.props.theme ? this.props.theme : 'monokai'}
            mode={this.props.language ? this.props.language : 'javascript'}
            readOnly={true}
            showGutter={this.props.showGutter}
            fontSize={this.props.fontSize ? this.props.fontSize : 14}
            value={content}
            width="100%"
            maxLines={Infinity}
            wrapEnabled={true}
            setOptions={{
              showLineNumbers: true,
              displayIndentGuides: true,
              tabSize: 2
            }}
          />
          }
        </div>
      </div>
    );
  }
}
