import { DraftInlineStyleType, EditorState } from "draft-js";
import {
  BoldIcon,
  ItalicIcon,
  OlListIcon,
  UlListIcon,
  UnderlineIcon,
} from "../Icon";

interface ToolbarEditorProps {
  editorState: EditorState;
  onToggleInlineStyle: (style: DraftInlineStyleType) => void;
  onToggleBlockType: (blockType: string) => void;
}

export function ToolbarEditor({
  editorState,
  onToggleInlineStyle,
  onToggleBlockType,
}: ToolbarEditorProps) {
  const currentInlineStyle = editorState.getCurrentInlineStyle();
  const selection = editorState.getSelection();
  const contentState = editorState.getCurrentContent();
  const block = contentState.getBlockForKey(selection.getStartKey());
  const currentBlockType = block.getType();

  return (
    <div className="flex items-center gap-2.5">
      <button
        type="button"
        className={`font-normal p-1.5 rounded-sm cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-150 ease-in-out ${currentInlineStyle.has("BOLD") ? "bg-gray-300 font-semibold" : ""}`}
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleInlineStyle("BOLD");
        }}
      >
        <span className="cursor-pointer">
          <BoldIcon />
        </span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleInlineStyle("ITALIC");
        }}
        className={`font-normal p-1.5 rounded-sm cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-150 ease-in-out ${currentInlineStyle.has("BOLD") ? "bg-gray-300 font-semibold" : ""}`}
      >
        <span className="cursor-pointer">
          <ItalicIcon />
        </span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleInlineStyle("UNDERLINE");
        }}
        className={`font-normal p-1.5 rounded-sm cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-150 ease-in-out ${currentInlineStyle.has("BOLD") ? "bg-gray-300 font-semibold" : ""}`}
      >
        <span className="cursor-pointer">
          <UnderlineIcon />
        </span>
      </button>

      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleBlockType("unordered-list-item");
        }}
        className={`font-normal p-1.5 rounded-sm cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-150 ease-in-out ${currentInlineStyle.has("BOLD") ? "bg-gray-300 font-semibold" : ""}`}
      >
        <span className="cursor-pointer">
          <UlListIcon />
        </span>
      </button>
      <button
        type="button"
        onMouseDown={(e) => {
          e.preventDefault();
          onToggleBlockType("ordered-list-item");
        }}
        className={`font-normal p-1.5 rounded-sm cursor-pointer text-sm hover:bg-gray-200 transition-colors duration-150 ease-in-out ${currentInlineStyle.has("BOLD") ? "bg-gray-300 font-semibold" : ""}`}
      >
        <span className="cursor-pointer">
          <OlListIcon />
        </span>
      </button>
    </div>
  );
}
