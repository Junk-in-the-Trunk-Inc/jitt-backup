export type IOverlayContext = {
    overlayHead: () => JSX.Element;
    overlayVisible: boolean;
    overlayShouldShow: () => boolean;
    overlayAppendContent: (item: JSX.Element) => void;
    overlayPopContent: () => void;
};

export const OverlayContext = React.createContext<undefined | IOverlayContext>(undefined);
