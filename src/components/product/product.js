import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProducts } from '../../redux/productSlice/product';
import Loader from '../../utils/Loader/Loader';
import './product.scss';
import Pagination from '@mui/material/Pagination';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
class Product extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            error: null,
            products: null,
            anchorEl: null,
            open: false,
            totalProducts: null,
            totalPages: null,
            page: 1,
            limit: 10
        }
    }

    componentDidMount() {
        const data = {
            page: this.state.page,
            limit: this.state.limit
        }
        this.props.getProducts(data);
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('products - ', props.products);
        const { isLoading, error, totalProducts, products } = props.products;
        if (totalProducts !== null) {
            let pages = Math.ceil(totalProducts / 10);
            // console.log('pages - ', pages)
            return {
                isLoading: isLoading,
                error: error,
                products: products,
                totalProducts: totalProducts,
                totalPages: pages
            }
        }
        else {
            return null;
        }
    }

    /* handlePageChange(event, page) {
        // console.log('handlePageChange event - ', event);
        // console.log('handlePageChange page - ', page);
        this.setState({
            page: page
        }, () => {
            const data = {
                page: this.state.page,
                limit: this.state.limit
            }
            this.props.getProducts(data);
        })
    } */
    handleClick = (event) => {
        this.setState({
            anchorEl: event.currentTarget,
            open: true
        })
    };
    handleClose = () => {
        this.setState({
            anchorEl: null,
            open: false
        })
    };

    render() {
        const { isLoading, error, products, totalProducts, totalPages, open, anchorEl } = this.state;
        // console.log('totalCount - ', Math.ceil(totalCount / 10))
        return (
            <>
                {
                    isLoading && <Loader />
                }

                <div className='sort-container'>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        onClick={(event) => this.handleClick(event)}
                    >
                        Sort
                    </Button>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={() => this.handleClose()}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={() => this.handleClose()}>Best Rating</MenuItem>
                        <MenuItem onClick={() => { this.props.sort("asc", "price"); this.handleClose(); }}>Price Low to High</MenuItem>
                        <MenuItem onClick={() => { this.props.sort("desc", "price"); this.handleClose(); }}>Price High to Low</MenuItem>
                    </Menu>
                </div>



                {
                    products && products.length > 0 ? (<div className='home-products-wrapper'>
                        {
                            products.map((product) => {
                                return (<div key={product.id} className='home-product-row'>
                                    <div>
                                        <img src={product.thumbnail} />
                                    </div>
                                    <h4>
                                        <Link to={`/product/${product.id}`}>{product.title}</Link>
                                    </h4>
                                    <h6>{product.price}</h6>
                                </div>)
                            })
                        }
                    </div>) : null
                }

                {
                    totalProducts !== null && (<div className='pagination-outer'><div><Pagination
                        count={totalPages}
                        shape="rounded"
                        variant="outlined"
                        page={this.props.setPage}
                        onChange={(event, page) => this.props.handlePageChange(event, page)}
                    /></div></div>)
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
        getProducts: (data) => dispatch(fetchProducts(data))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);