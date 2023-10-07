import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice/product';


class Product extends Component {

    componentDidMount() {
        console.log('componentDidMount - ', this.props);
        this.props.getProducts();
    }

    render() {
        return (
            <>
              URL: {process.env.REACT_APP_BACKEND_URL+process.env.REACT_APP_PRODUCTS}
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    products: state.products
});

const mapDispatchToProps = (dispatch) => {
    return {
        getProducts: () => dispatch(fetchProducts())
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Product);