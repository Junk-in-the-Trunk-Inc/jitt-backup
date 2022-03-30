import { useContent } from './useContent';
import { useToggler } from './useToggler';

export function useProvideContentComponent() {
    const [visible, _show, _hide, toggleElement] = useToggler();
    const { head, content, appendContent, popContent, hasContent: shouldShow } = useContent();
    return { appendContent, head, toggleElement, popContent, shouldShow, visible, content };
}
