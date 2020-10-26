import React from 'react'
import { connect } from 'react-redux';
import { setDataToGlobalReducer } from '../../redux/actions/actions';

const Home = () =>  {
    return (
        <div className='home'>
            
        </div>
    )
}


const mapStateToProps = (state: any) => ({
    data: state.data,
 });
 const mapDispatchToProps = {
    setDataToGlobalReducer
 };

export default connect(
    mapStateToProps,
    mapDispatchToProps
 )(Home);