import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProductById } from '../../redux/productSlice/product';
import Loader from '../../utils/Loader/Loader';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import ProductDetailData from './productDetailData';
import ProductGallery from './productGallery';

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
                    product && (<Grid container spacing={2} className='productDetailPage'>
                        {
                            // console.log('PRODUCT - ', product)
                        }
                        <Grid item lg={5} md={6} sm={12} xs={12} >
                            <ProductGallery productImages={product.images} text={product.title} />
                        </Grid>
                        <Grid item lg={7} md={6} sm={12} xs={12} className='productContent'>
                            <ProductDetailData product={product} />                      
                        </Grid>
                    </Grid>)
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
