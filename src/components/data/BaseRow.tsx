import { faKey } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useCallback } from 'react';
import { cn } from '../../util/cn';
import { KEYS } from './KEYS';
import { SelfStorageDTO } from "../orm/self-storage/SelfStorageDTO";

export function BaseRow(p2: { additional: React.FunctionComponent<{ x: any }> }) {
    
    // eslint-disable-next-line react/function-component-definition
    return (props: { x: SelfStorageDTO; onClick: (ev: React.MouseEvent<HTMLElement, MouseEvent>) => void; isSelected: (s: string) => boolean }) => {
        const { x, onClick, isSelected } = props;
        const className = cn(
            {
                selected: isSelected(x._id)
            },
            ''
        );

        return (
            <tr key={x._id} onClick={onClick} className={className}>
                <td className='items-center justify-center'>
                    <FontAwesomeIcon icon={faKey} className='inline-flex text-orange-dark' title={x._id} />
                </td>
                {p2.additional({ x: x })}
            </tr>
        );
    };
}
