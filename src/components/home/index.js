import React, { Component } from 'react';
import Product from '../product/product';
import CategoryBrand from '../product/category';
import Grid from '@mui/material/Grid';
import { connect } from 'react-redux';
import { fetchProductsByFilter } from '../../redux/productSlice/product';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filter: {
        category: [],
        brand: [],
      },
      sort: {},
      page: 1,
      limit: 10,
      setPage:1
    }
  }

  handlePageChange(event, page) {
    console.log('handlePageChange event - ', event);
    console.log('handlePageChange page - ', page);
    this.setState({
      page: page,
      setPage:page
    }, () => {
      const data = {
        page: this.state.page,
        limit: this.state.limit,
        filter: this.state.filter,
        sort: this.state.sort
      }
      this.props.getProductsByFilter(data);
    })
  }

  handleClick(e) {
    // console.log('************************************');
    const { name, value, checked } = e.target;
    // console.log('name - ', name);
    // console.log('checked - ', checked);
    // console.log('value - ', value);
    // console.log('state - ', this.state);
    if (checked) {
      // console.log('first - ', this.state.filter[name]);
      this.setState({
        filter: {
          ...this.state.filter,
          [name]: [...this.state.filter[name], value]
        },
        page: 1,
        limit: 10,
        setPage:1
      }, () => {
        // console.log('STATE UPDATED - ', this.state);
        const data = {
          filter: this.state.filter,
          sort: this.state.sort,
          page: this.state.page,
          limit: this.state.limit,
        }
        this.props.getProductsByFilter(data);
      });
      // this.props.getProductsByFilter(data);
    }
    else {
      let newData = this.state.filter[name];
      newData = newData.filter((i) => i !== value);
      this.setState({
        filter: {
          ...this.state.filter,
          [name]: newData
        },
        page: 1,
        limit: 10,
        setPage:1
      }, () => {
        // console.log('STATE UPDATED - ', this.state);
        const data = {
          filter: this.state.filter,
          sort: this.state.sort,
          page: this.state.page,
          limit: this.state.limit,
        };
        this.props.getProductsByFilter(data);
      });

      // this.props.getProductsByFilter(data);
    }

  }

  handleSort = (order, sort) => {
    // console.log('SORT STATE - ', this.state.filter)
    const newFilter = { _sort: sort, _order: order };
    this.setState({
      sort: newFilter,
      page: 1,
      limit: 10,
      setPage:1
    }, () => {
      const data = {
        filter: this.state.filter,
        sort: newFilter,
        page: this.state.page,
        limit: this.state.limit,
      }
      this.props.getProductsByFilter(data);
    });
  }

  render() {
    // console.log('RENDER - ', this.state.filter);
    return (
      <Grid container spacing={3}>
        <Grid item xs={12} sm={4} md={3}>
          <CategoryBrand onChange={(e) => this.handleClick(e)} />
        </Grid>
        <Grid item xs={12} sm={8} md={9}>
          <Product
            sort={(order, sort) => this.handleSort(order, sort)}
            handlePageChange={(event, page) => this.handlePageChange(event, page)}
            setPage={this.state.setPage}
          />
        </Grid>
      </Grid>
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
    getProductsByFilter: (filter) => dispatch(fetchProductsByFilter(filter))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);