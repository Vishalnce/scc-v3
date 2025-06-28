import {
  ParagraphNode,
  LexicalEditor,
  DOMExportOutput,
} from 'lexical';

export class ResponsiveParagraphNode extends ParagraphNode {
  static getType(): string {
    return 'responsive-paragraph';
  }

  static clone(node: ResponsiveParagraphNode): ResponsiveParagraphNode {
    return new ResponsiveParagraphNode(node.__key);
  }

  override exportDOM(editor: LexicalEditor): DOMExportOutput {
    const element = document.createElement('p');
    element.style.width = '100%';
    element.style.boxSizing = 'border-box';

    return {
      element,
     
    };
  }
}
