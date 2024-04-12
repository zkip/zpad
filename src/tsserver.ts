import { Extension } from "@codemirror/state";
import { EditorView, hoverTooltip } from "@codemirror/view";
import { Completion, autocompletion, completeFromList } from '@codemirror/autocomplete';
import { Diagnostic, linter } from '@codemirror/lint';
import { createDefaultMapFromCDN, createSystem, createVirtualTypeScriptEnvironment } from '@typescript/vfs'
import ts from "typescript"
import { record } from "./anlysis";


// const options = {}
// const indexTs = '/index.ts'

// record("start");
// const fsMap = await createDefaultMapFromCDN(options, ts.version, false, ts)
// record("create fs map from cdn");
// fsMap.set(indexTs, `let a = 1`)

// const system = createSystem(fsMap)
// record("create fs system");
// const env = createVirtualTypeScriptEnvironment(system, [indexTs], ts, options)
// record("create environment");

// const sortTextToBoost = (sortText: string): number =>
//     sortText.startsWith('z') ? -99 : parseInt(sortText)

export const tsserver: Extension = [
    // EditorView.updateListener.of((update) => {
    //     if (update.docChanged) {
    //         env.updateFile(indexTs, update.state.doc.toString())
    //     }
    // }),
    // autocompletion({
    //     override: [
    //         async (ctx) => {
    //             const completionInfo = env.languageService.getCompletionsAtPosition(indexTs, ctx.pos, undefined)
    //             const completions: Completion[] | undefined = completionInfo?.entries.map((c, i) => ({
    //                 type: c.kind.replace('var', 'variable'),
    //                 label: c.name,
    //                 boost: sortTextToBoost(c.sortText)
    //             }))
    //             if (!completions) return null;
    //             return completeFromList(completions)(ctx);
    //         }
    //     ]
    // }),
    // linter(async () => {
    //     const syntactic = env.languageService.getSyntacticDiagnostics(indexTs)
    //     const semantic = env.languageService.getSemanticDiagnostics(indexTs)
    //     const suggestion = env.languageService.getSuggestionDiagnostics(indexTs)
    //     const diagnosticsInfo = [...syntactic, ...semantic, ...suggestion].filter(d => d.start != null)
    //     const diagnostics: Diagnostic[] = diagnosticsInfo.map((d, i) => ({
    //         from: d.start!,
    //         to: d.length != null ? d.start! + d.length : d.start! + 1,
    //         message: d.messageText + '',
    //         source: d.source,
    //         severity: ["warning", "error", "info", "info"][d.category] as Diagnostic["severity"]
    //     }))
    //     if (!diagnostics) return [];
    //     return diagnostics;
    // }),
    // hoverTooltip(async (_, pos) => {
    //     const info = env.languageService.getQuickInfoAtPosition(indexTs, pos)
    //     let text = '';
    //     if (info) {
    //         text = ts.displayPartsToString(info.displayParts) + (info.documentation?.length ? '\n' + ts.displayPartsToString(info.documentation) : '');
    //     }
    //     return {
    //         pos,
    //         create() {
    //             const dom = document.createElement('div');
    //             dom.classList.add('cm-quickinfo-tooltip');
    //             dom.textContent = text;
    //             return { dom };
    //         }
    //     };
    // }),
];
