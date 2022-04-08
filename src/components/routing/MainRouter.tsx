import { Route, Routes } from 'react-router';
import { SelfStorageGrid } from '../orm/self-storage/SelfStorageGrid';
import { FacilityGrid } from "../orm/facility/FacilityGrid";
import { FacilityInsertForm } from "../orm/facility/FacilityInsertForm";
import { SelfStorageInsert } from "../orm/self-storage/SelfStorageInsert.1";
import { InsertForm } from "../data/InsertForm";
import { useAlerts } from '../../hooks/useAlerts';
import { NoMatch } from './NoMatch';
import { ignore } from '../../common/ignore';
import { useWhyDidYou } from './useWhyDidYou';

export function MainRouter() {
    useWhyDidYou('MainRouter', {});
    return (
        <Routes>
            <Route path='data'>
                <Route path='v1'>
                    <Route path='self-storage'>
                        <Route path='new'>
                            <Route index element={<SelfStorageInsert />} />
                        </Route>
                        <Route index element={<SelfStorageGrid />} />
                    </Route>
                    <Route path='facility'>
                        <Route path='new'>
                            <Route index element={<FacilityInsertForm />} />
                        </Route>
                        <Route index element={<FacilityGrid />} />
                    </Route>
                </Route>
            </Route>
            <Route index />
            <Route path='*' element={<NoMatch />} />
        </Routes>
    );
}

const te = (defBody: string) => (result?: any) => {
    return { body: defBody };
};

export const defaultSuccess = te('Form completed.');
const defaultFailure = te('Form completed.');


