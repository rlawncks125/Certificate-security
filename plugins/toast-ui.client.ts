import Editor from "@toast-ui/editor";

import "@toast-ui/editor/dist/toastui-editor.css";
// 언어
import "@toast-ui/editor/dist/i18n/ko-kr";
// 색상
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import "tui-color-picker/dist/tui-color-picker.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";

const options = (el: HTMLElement, hieght?: string) => {
  return new Editor({
    el,
    height: hieght || "200px",
    initialEditType: "wysiwyg",
    // hideModeSwitch: true,
    previewStyle: "vertical",
    toolbarItems: [
      ["heading", "bold", "italic", "strike", "table"],
      ["hr", "quote"],
      ["ul", "ol", "task", "indent", "outdent"],
      // ["table", "image", "link"],
      // ["table", "link"],
      // ["code", "codeblock"],
      // ["scrollSync"],
    ],
    language: "ko-KR",
    plugins: [colorSyntax],
    autofocus: false,
  });
};

export default defineNuxtPlugin((nuxtApp) => {
  return {
    provide: {
      setToastEditor: (el: HTMLElement, hieght?: string) => {
        const editorControl = options(el, hieght);

        editorControl.getMarkdown();
        return editorControl;
      },
      setToastEditorSetHTML: (
        el: HTMLElement,
        html: string,
        hieght?: string
      ) => {
        const editorControl = options(el, hieght);

        editorControl.getMarkdown();
        editorControl.setHTML(html);
        return editorControl;
      },
    },
  };
});

declare module "@vue/runtime-core" {
  interface ComponentCustomProperties {
    $setToastEditor(el: HTMLElement, hieght?: string): Editor;
    $setToastEditorSetHTML(
      el: HTMLElement,
      html: string,
      hieght?: string
    ): Editor;
  }
}
