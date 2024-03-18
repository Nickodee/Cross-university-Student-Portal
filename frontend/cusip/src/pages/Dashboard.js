import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import DashHome from '../components/DashHome';

function Dashboard() {
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
            navigate('/pages/login');
        }
    }, [user, navigate]);

    return (
        <>
            <DashHome />
        </>
    );
}

export default Dashboard;
