import {
  Editor,
  EditorState,
  RichUtils,
  DraftEditorCommand,
  DraftInlineStyleType,
  ContentBlock,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { useCallback, useId, useRef, useState } from "react";
import { ToolbarEditor } from "./ToolbarEditor";

const styleMap = {
  BOLD: { fontWeight: "bold" },
  ITALIC: { fontStyle: "italic" },
  UNDERLINE: { textDecoration: "underline" },
  HIGHLIGHT: { backgroundColor: "yellow" },
};

interface TextEditorProps {
  placeholder?: string;
}
export function TextEditor({ placeholder }: TextEditorProps) {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const editorHintId = useId();
  const editorRef = useRef<Editor>(null);

  const handleFocus = () => {
    editorRef.current?.focus();
  };

  const onChange = useCallback((state: EditorState) => {
    setEditorState(state);
  }, []);

  // Comandos de teclado
  const handleKeyCommand = useCallback(
    (command: DraftEditorCommand, editorState: EditorState) => {
      const newState = RichUtils.handleKeyCommand(editorState, command);

      if (newState) {
        setEditorState(newState);
        return "handled";
      }
      return "not-handled";
    },
    []
  );

  // === Toolbar - Inline styles ===
  const toggleInlineStyle = (style: DraftInlineStyleType) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  // === Toolbar - Block types ===
  const toggleBlockType = (blockType: string) => {
    setEditorState(RichUtils.toggleBlockType(editorState, blockType));
  };

  // === Estilos de bloques ===
  const blockStyleFn = (block: ContentBlock) => {
    const type = block.getType();
    switch (type) {
      case "blockquote":
        return "my-blockquote";
      case "header-one":
        return "my-h1";
      case "header-two":
        return "my-h2";
      case "unordered-list-item":
        return "my-ul";
      case "ordered-list-item":
        return "my-ol";
      default:
        return "";
    }
  };

  return (
    <div className="bg-gray-100 rounded-sm p-3 flex flex-col gap-3">
      <ToolbarEditor
        editorState={editorState}
        onToggleInlineStyle={toggleInlineStyle}
        onToggleBlockType={toggleBlockType}
      />
      <div
        className="flex-1 max-h-24 overflow-y-auto cursor-text"
        onClick={handleFocus}
        id={editorHintId}
      >
        <Editor
          ref={editorRef}
          placeholder={placeholder}
          editorState={editorState}
          onChange={onChange}
          handleKeyCommand={handleKeyCommand}
          customStyleMap={styleMap}
          blockStyleFn={blockStyleFn}
        />
      </div>
    </div>
  );
}
