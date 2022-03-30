import ReactDOM from 'react-dom';
import { useProvideContentComponent } from './useProvideContentComponent';

export function useProvideOverlay(Fc: React.FunctionComponent<{ content: JSX.Element[]; overlayVisible: boolean; overlayHead: () => JSX.Element; overlayShouldShow: () => boolean }>) {
    const { appendContent: overlayAppendContent, head: overlayHead, shouldShow: overlayShouldShow, content, visible: overlayVisible, popContent: overlayPopContent } = useProvideContentComponent();
    // const Overlay = Fc({ content, overlayVisible, overlayShouldShow, overlayHead });
    const el =  document.getElementById('modal-root')!;
    const portal = ReactDOM.createPortal(<Fc content={content} overlayHead={overlayHead} overlayShouldShow={overlayShouldShow} overlayVisible={overlayVisible} />, el);
    return {
        overlayAppendContent,
        overlayHead,
        overlayShouldShow,
        overlayVisible,
        overlayPopContent,
        el,
        portal
    };
}
