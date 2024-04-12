import { EditorView, keymap } from "@codemirror/view"
import { defaultKeymap, indentWithTab } from "@codemirror/commands"
import { tsserver } from "./tsserver"
import { javascript } from "@codemirror/lang-javascript"
import { minimalSetup } from "codemirror"

const text = `
function hello(){
  const a = 0;
}
`

let view = new EditorView({
  doc: text,
  extensions: [minimalSetup, keymap.of([...defaultKeymap, indentWithTab]),
    javascript({ typescript: true }), tsserver],
  parent: document.body
})