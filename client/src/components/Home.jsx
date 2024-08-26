import React from 'react';
import Header from './Header';
import AddEntry from './AddEntry';
import Listing from './Listing';

function Home(props) {
    return (
        <div>
            <Header />
            <AddEntry />
            <Listing />
            
        </div>
    );
}

export default Home;