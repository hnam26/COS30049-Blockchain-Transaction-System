import React from 'react';
import Search from './components/Account/components/Search/Search';
import { Outlet, useOutlet } from 'react-router-dom';
const Home = () => {
    const outlet = useOutlet();
    return (
        <>
            <Search />
            {!outlet ? <div style={{ height: '60vh' }} /> : <></>}
            <Outlet />
        </>
    );
};
export default Home;