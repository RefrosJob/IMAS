import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

export function WelcomePage(): JSX.Element {
    const navigate = useNavigate();
    return (
        <>
            <Button
                onClick={() => {
                    navigate('/Registration');
                }}
            >
                TEST
            </Button>
            <Button
                onClick={() => {
                    navigate('/IMAS');
                }}
            >
                IMAS
            </Button>
        </>
    );
}
