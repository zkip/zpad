// type Listener = EventListenerOrEventListenerObject;

// interface EventReceipt {
// 	clean(target: Window): void;
// 	clean(target: HTMLElement): void;
// 	attach(target: HTMLElement, options?: boolean | AddEventListenerOptions): EventReceipt;
// 	attach(target?: Window, options?: boolean | AddEventListenerOptions): EventReceipt;
// }

// export function listen<K extends keyof HTMLElementEventMap>(
// 	type: K,
// 	istener: Listener
// ): EventReceipt;
// export function listen<K extends keyof WindowEventMap>(type: K, listener: Listener): EventReceipt;
// export function listen<K extends keyof HTMLElementEventMap | keyof WindowEventMap>(
// 	type: K,
// 	listener: Listener
// ) {
// 	let targets = new Array<Window | HTMLElement>();
// 	function clean(target: Window | HTMLElement) {
// 		const targetSet = new Set(targets);
// 		if (!targetSet.has(target)) return;

// 		targetSet.delete(target);
// 		targets = Array.from(targetSet.values());
// 	}
// 	function attach(
// 		target: HTMLElement | Window = window,
// 		options?: boolean | AddEventListenerOptions
// 	) {
// 		targets.push(target);
// 		target.addEventListener(type, listener, options);
// 		return { attach, clean };
// 	}
// 	return { attach, clean };
// }

type DOMElementEventMapMap = [
	[AbortSignal, AbortSignalEventMap],
	[AbstractWorker, AbstractWorkerEventMap],
	[Animation, AnimationEventMap],
	[AudioBufferSourceNode, AudioScheduledSourceNodeEventMap],
	[AudioContext, BaseAudioContextEventMap],
	[AudioScheduledSourceNode, AudioScheduledSourceNodeEventMap],
	[AudioWorkletNode, AudioWorkletNodeEventMap],
	[BaseAudioContext, BaseAudioContextEventMap],
	[BroadcastChannel, BroadcastChannelEventMap],
	[CSSAnimation, AnimationEventMap],
	[CSSTransition, AnimationEventMap],
	[CanvasCaptureMediaStreamTrack, MediaStreamTrackEventMap],
	[ConstantSourceNode, AudioScheduledSourceNodeEventMap],
	[Document, DocumentEventMap],
	[Element, ElementEventMap],
	[EventSource, EventSourceEventMap],
	[FileReader, FileReaderEventMap],
	[FontFaceSet, FontFaceSetEventMap],
	[GlobalEventHandlers, GlobalEventHandlersEventMap],
	[HTMLAnchorElement, HTMLElementEventMap],
	[HTMLAreaElement, HTMLElementEventMap],
	[HTMLAudioElement, HTMLMediaElementEventMap],
	[HTMLBRElement, HTMLElementEventMap],
	[HTMLBaseElement, HTMLElementEventMap],
	[HTMLBodyElement, HTMLBodyElementEventMap],
	[HTMLButtonElement, HTMLElementEventMap],
	[HTMLCanvasElement, HTMLElementEventMap],
	[HTMLDListElement, HTMLElementEventMap],
	[HTMLDataElement, HTMLElementEventMap],
	[HTMLDataListElement, HTMLElementEventMap],
	[HTMLDetailsElement, HTMLElementEventMap],
	[HTMLDialogElement, HTMLElementEventMap],
	[HTMLDirectoryElement, HTMLElementEventMap],
	[HTMLDivElement, HTMLElementEventMap],
	[HTMLDocument, DocumentEventMap],
	[HTMLElement, HTMLElementEventMap],
	[HTMLEmbedElement, HTMLElementEventMap],
	[HTMLFieldSetElement, HTMLElementEventMap],
	[HTMLFontElement, HTMLElementEventMap],
	[HTMLFormElement, HTMLElementEventMap],
	[HTMLFrameElement, HTMLElementEventMap],
	[HTMLFrameSetElement, HTMLFrameSetElementEventMap],
	[HTMLHRElement, HTMLElementEventMap],
	[HTMLHeadElement, HTMLElementEventMap],
	[HTMLHeadingElement, HTMLElementEventMap],
	[HTMLHtmlElement, HTMLElementEventMap],
	[HTMLIFrameElement, HTMLElementEventMap],
	[HTMLImageElement, HTMLElementEventMap],
	[HTMLInputElement, HTMLElementEventMap],
	[HTMLLIElement, HTMLElementEventMap],
	[HTMLLabelElement, HTMLElementEventMap],
	[HTMLLegendElement, HTMLElementEventMap],
	[HTMLLinkElement, HTMLElementEventMap],
	[HTMLMapElement, HTMLElementEventMap],
	[HTMLMarqueeElement, HTMLElementEventMap],
	[HTMLMediaElement, HTMLMediaElementEventMap],
	[HTMLMenuElement, HTMLElementEventMap],
	[HTMLMetaElement, HTMLElementEventMap],
	[HTMLMeterElement, HTMLElementEventMap],
	[HTMLModElement, HTMLElementEventMap],
	[HTMLOListElement, HTMLElementEventMap],
	[HTMLObjectElement, HTMLElementEventMap],
	[HTMLOptGroupElement, HTMLElementEventMap],
	[HTMLOptionElement, HTMLElementEventMap],
	[HTMLOutputElement, HTMLElementEventMap],
	[HTMLParagraphElement, HTMLElementEventMap],
	[HTMLParamElement, HTMLElementEventMap],
	[HTMLPictureElement, HTMLElementEventMap],
	[HTMLPreElement, HTMLElementEventMap],
	[HTMLProgressElement, HTMLElementEventMap],
	[HTMLQuoteElement, HTMLElementEventMap],
	[HTMLScriptElement, HTMLElementEventMap],
	[HTMLSelectElement, HTMLElementEventMap],
	[HTMLSlotElement, HTMLElementEventMap],
	[HTMLSourceElement, HTMLElementEventMap],
	[HTMLSpanElement, HTMLElementEventMap],
	[HTMLStyleElement, HTMLElementEventMap],
	[HTMLTableCaptionElement, HTMLElementEventMap],
	[HTMLTableCellElement, HTMLElementEventMap],
	[HTMLTableColElement, HTMLElementEventMap],
	[HTMLTableDataCellElement, HTMLElementEventMap],
	[HTMLTableElement, HTMLElementEventMap],
	[HTMLTableHeaderCellElement, HTMLElementEventMap],
	[HTMLTableRowElement, HTMLElementEventMap],
	[HTMLTableSectionElement, HTMLElementEventMap],
	[HTMLTemplateElement, HTMLElementEventMap],
	[HTMLTextAreaElement, HTMLElementEventMap],
	[HTMLTimeElement, HTMLElementEventMap],
	[HTMLTitleElement, HTMLElementEventMap],
	[HTMLTrackElement, HTMLElementEventMap],
	[HTMLUListElement, HTMLElementEventMap],
	[HTMLUnknownElement, HTMLElementEventMap],
	[HTMLVideoElement, HTMLVideoElementEventMap],
	[IDBDatabase, IDBDatabaseEventMap],
	[IDBOpenDBRequest, IDBOpenDBRequestEventMap],
	[IDBRequest, IDBRequestEventMap],
	[IDBTransaction, IDBTransactionEventMap],
	[MIDIAccess, MIDIAccessEventMap],
	[MIDIInput, MIDIInputEventMap],
	[MIDIOutput, MIDIPortEventMap],
	[MIDIPort, MIDIPortEventMap],
	[MathMLElement, MathMLElementEventMap],
	[MediaDevices, MediaDevicesEventMap],
	[MediaKeySession, MediaKeySessionEventMap],
	[MediaQueryList, MediaQueryListEventMap],
	[MediaRecorder, MediaRecorderEventMap],
	[MediaSource, MediaSourceEventMap],
	[MediaStream, MediaStreamEventMap],
	[MediaStreamTrack, MediaStreamTrackEventMap],
	[MessagePort, MessagePortEventMap],
	[Notification, NotificationEventMap],
	[OfflineAudioContext, OfflineAudioContextEventMap],
	[OffscreenCanvas, OffscreenCanvasEventMap],
	[OscillatorNode, AudioScheduledSourceNodeEventMap],
	[PaymentRequest, PaymentRequestEventMap],
	[Performance, PerformanceEventMap],
	[PermissionStatus, PermissionStatusEventMap],
	[PictureInPictureWindow, PictureInPictureWindowEventMap],
	[RTCDTMFSender, RTCDTMFSenderEventMap],
	[RTCDataChannel, RTCDataChannelEventMap],
	[RTCDtlsTransport, RTCDtlsTransportEventMap],
	[RTCIceTransport, RTCIceTransportEventMap],
	[RTCPeerConnection, RTCPeerConnectionEventMap],
	[RTCSctpTransport, RTCSctpTransportEventMap],
	[RemotePlayback, RemotePlaybackEventMap],
	[SVGAElement, SVGElementEventMap],
	[SVGAnimateElement, SVGElementEventMap],
	[SVGAnimateMotionElement, SVGElementEventMap],
	[SVGAnimateTransformElement, SVGElementEventMap],
	[SVGAnimationElement, SVGElementEventMap],
	[SVGCircleElement, SVGElementEventMap],
	[SVGClipPathElement, SVGElementEventMap],
	[SVGComponentTransferFunctionElement, SVGElementEventMap],
	[SVGDefsElement, SVGElementEventMap],
	[SVGDescElement, SVGElementEventMap],
	[SVGElement, SVGElementEventMap],
	[SVGEllipseElement, SVGElementEventMap],
	[SVGFEBlendElement, SVGElementEventMap],
	[SVGFEColorMatrixElement, SVGElementEventMap],
	[SVGFEComponentTransferElement, SVGElementEventMap],
	[SVGFECompositeElement, SVGElementEventMap],
	[SVGFEConvolveMatrixElement, SVGElementEventMap],
	[SVGFEDiffuseLightingElement, SVGElementEventMap],
	[SVGFEDisplacementMapElement, SVGElementEventMap],
	[SVGFEDistantLightElement, SVGElementEventMap],
	[SVGFEDropShadowElement, SVGElementEventMap],
	[SVGFEFloodElement, SVGElementEventMap],
	[SVGFEFuncAElement, SVGElementEventMap],
	[SVGFEFuncBElement, SVGElementEventMap],
	[SVGFEFuncGElement, SVGElementEventMap],
	[SVGFEFuncRElement, SVGElementEventMap],
	[SVGFEGaussianBlurElement, SVGElementEventMap],
	[SVGFEImageElement, SVGElementEventMap],
	[SVGFEMergeElement, SVGElementEventMap],
	[SVGFEMergeNodeElement, SVGElementEventMap],
	[SVGFEMorphologyElement, SVGElementEventMap],
	[SVGFEOffsetElement, SVGElementEventMap],
	[SVGFEPointLightElement, SVGElementEventMap],
	[SVGFESpecularLightingElement, SVGElementEventMap],
	[SVGFESpotLightElement, SVGElementEventMap],
	[SVGFETileElement, SVGElementEventMap],
	[SVGFETurbulenceElement, SVGElementEventMap],
	[SVGFilterElement, SVGElementEventMap],
	[SVGForeignObjectElement, SVGElementEventMap],
	[SVGGElement, SVGElementEventMap],
	[SVGGeometryElement, SVGElementEventMap],
	[SVGGradientElement, SVGElementEventMap],
	[SVGGraphicsElement, SVGElementEventMap],
	[SVGImageElement, SVGElementEventMap],
	[SVGLineElement, SVGElementEventMap],
	[SVGLinearGradientElement, SVGElementEventMap],
	[SVGMPathElement, SVGElementEventMap],
	[SVGMarkerElement, SVGElementEventMap],
	[SVGMaskElement, SVGElementEventMap],
	[SVGMetadataElement, SVGElementEventMap],
	[SVGPathElement, SVGElementEventMap],
	[SVGPatternElement, SVGElementEventMap],
	[SVGPolygonElement, SVGElementEventMap],
	[SVGPolylineElement, SVGElementEventMap],
	[SVGRadialGradientElement, SVGElementEventMap],
	[SVGRectElement, SVGElementEventMap],
	[SVGSVGElement, SVGSVGElementEventMap],
	[SVGScriptElement, SVGElementEventMap],
	[SVGSetElement, SVGElementEventMap],
	[SVGStopElement, SVGElementEventMap],
	[SVGStyleElement, SVGElementEventMap],
	[SVGSwitchElement, SVGElementEventMap],
	[SVGSymbolElement, SVGElementEventMap],
	[SVGTSpanElement, SVGElementEventMap],
	[SVGTextContentElement, SVGElementEventMap],
	[SVGTextElement, SVGElementEventMap],
	[SVGTextPathElement, SVGElementEventMap],
	[SVGTextPositioningElement, SVGElementEventMap],
	[SVGTitleElement, SVGElementEventMap],
	[SVGUseElement, SVGElementEventMap],
	[SVGViewElement, SVGElementEventMap],
	[ScreenOrientation, ScreenOrientationEventMap],
	[ScriptProcessorNode, ScriptProcessorNodeEventMap],
	[ServiceWorker, ServiceWorkerEventMap],
	[ServiceWorkerContainer, ServiceWorkerContainerEventMap],
	[ServiceWorkerRegistration, ServiceWorkerRegistrationEventMap],
	[ShadowRoot, ShadowRootEventMap],
	[SharedWorker, AbstractWorkerEventMap],
	[SourceBuffer, SourceBufferEventMap],
	[SourceBufferList, SourceBufferListEventMap],
	[SpeechSynthesis, SpeechSynthesisEventMap],
	[SpeechSynthesisUtterance, SpeechSynthesisUtteranceEventMap],
	[TextTrack, TextTrackEventMap],
	[TextTrackCue, TextTrackCueEventMap],
	[TextTrackList, TextTrackListEventMap],
	[VTTCue, TextTrackCueEventMap],
	[VideoDecoder, VideoDecoderEventMap],
	[VideoEncoder, VideoEncoderEventMap],
	[VisualViewport, VisualViewportEventMap],
	[WakeLockSentinel, WakeLockSentinelEventMap],
	[WebSocket, WebSocketEventMap],
	[Window, WindowEventMap],
	[WindowEventHandlers, WindowEventHandlersEventMap],
	[Worker, WorkerEventMap],
	[XMLDocument, DocumentEventMap],
	[XMLHttpRequest, XMLHttpRequestEventMap],
	[XMLHttpRequestEventTarget, XMLHttpRequestEventTargetEventMap],
	[XMLHttpRequestUpload, XMLHttpRequestEventTargetEventMap],
	[Window, WindowEventMap]
];

// https://github.com/microsoft/TypeScript/issues/40689
type MapDefinitionToEventMap<T, D extends { [K: number]: unknown[] } = DOMElementEventMapMap> = {
	[K in keyof D]: D[K] extends unknown[]
		? D[K][0] extends T
			? T extends D[K][0]
				? D[K][1]
				: never
			: never
		: never;
}[number];

type Targets = DOMElementEventMapMap[number][0];
type GetEventMapByTarget<Target extends Targets> = MapDefinitionToEventMap<Target>;

// export function listen<T extends Targets, K extends keyof GetEventMapByTarget<T>>(target: T): void;
export function event<T extends Targets, EventMap = GetEventMapByTarget<T>>(
	target: T = window as unknown as T,
	option: boolean | AddEventListenerOptions
) {
	return function listen<K extends keyof EventMap>(
		type: K,
		listener: (event: EventMap) => unknown
	) {
		target.addEventListener(type as string, listener as EventListener, option);

		return function clean() {
			target.removeEventListener(type as string, listener as EventListener, option);
		};
	};
}
