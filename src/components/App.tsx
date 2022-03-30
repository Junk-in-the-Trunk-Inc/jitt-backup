import ErrorBoundary from './ErrorBoundary';
import { Window } from './Window';
import { Wrappers } from './Wrappers';

export default function App() {
    return (
        <Wrappers>
            <ErrorBoundary>
                <Window />
            </ErrorBoundary>
        </Wrappers>
    );
}
