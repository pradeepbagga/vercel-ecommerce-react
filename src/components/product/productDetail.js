import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductById } from '../../redux/productSlice/product';
import Loader from '../../utils/Loader/Loader';

class ProductDetail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: null,
            product: null,
            isLoading: false,
            error: null
        }
    }
    componentDidMount() {
        let query = window.location.pathname;
        query = query.split("/product/");
        query = query[1]
        this.setState({
            pageId: query[1]
        });
        // console.log('PROPS - ', this.props);
        this.props.getProductDetail(query)
    }
    static getDerivedStateFromProps(props, state) {
        // console.log('getDerivedStateFromProps - ', props);
        return {
            product: props.products.selectedProduct,
            isLoading: props.products.isLoading,
            error: props.products.error
        }
    }
    render() {
        const { product, isLoading, error } = this.state;
        return (
            <>
                {
                    isLoading && <Loader />
                }
                {
                    product && (<div>
                        {
                            console.log('PRODUCT - ', product)
                        }
                        <h2>{product.title}</h2>
                        <p>{product.description}</p>
                    </div>)
                }
            </>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProductDetail: (id) => dispatch(fetchProductById(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
