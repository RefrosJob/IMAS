import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IMAS } from '../../components/IMAS/IMAS';

export function IMASPage(): JSX.Element {
    const navigate = useNavigate();
    const isAuthenticated = true;
    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/Welcome');
        }
    }, []);

    return <IMAS />;
}
