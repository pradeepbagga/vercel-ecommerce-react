import React, { Component } from 'react';
import { connect } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import RemoveIcon from '@mui/icons-material/Remove';
import { fetchProductsByFilter, fetchCategories, fetchBrands } from '../../redux/productSlice/product';
import './category.scss';

const CustomExpandIcon = () => {
    return (
        <Box
            sx={{
                ".Mui-expanded & > .collapsIconWrapper": {
                    display: "none"
                },
                ".expandIconWrapper": {
                    display: "none"
                },
                ".Mui-expanded & > .expandIconWrapper": {
                    display: "block"
                }
            }}
        >
            <div className="expandIconWrapper"><RemoveIcon /></div>
            <div className="collapsIconWrapper"><AddIcon /></div>
        </Box>
    );
};

class CategoryBrand extends Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: null,
            brands: null
        }
    }

    componentDidMount(){
        this.props.getCategories();
        this.props.getBrands();
    }

    static getDerivedStateFromProps(props, state) {
        // console.log('get Derived State From Props - ', props)
        return {
            categories: props.category,
            brands: props.brand
        };
    }

    render() {
        // console.log('STATE - ', this.state.filter)
        const { categories, brands } = this.state;
        // console.log('categories - ', categories);
        // console.log('brands - ', brands);
        return (
            <>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<CustomExpandIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Category
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            categories !== null && (<div className='categoryList'>
                                {
                                    categories.map((item) => {
                                        return <div key={item.id}>
                                            <input
                                                type="checkbox"
                                                name="category"
                                                value={item.value}
                                                id={item.value}
                                                onChange={(e) => this.props.onChange(e)}
                                            />
                                            <label htmlFor={item.value}>{item.label}</label>
                                        </div>
                                    })
                                }
                            </div>)
                        }
                    </AccordionDetails>
                </Accordion>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<CustomExpandIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        Brands
                    </AccordionSummary>
                    <AccordionDetails>
                        {
                            brands !== null && (<div className='categoryList'>
                                {
                                    brands.map((item) => {
                                        return <div key={item.id}>
                                            <input
                                                type="checkbox"
                                                name="brand"
                                                value={item.value}
                                                id={item.value}
                                                onChange={(e) => this.props.onChange(e)}
                                            />
                                            <label htmlFor={item.value}>{item.label}</label>
                                        </div>
                                    })
                                }
                            </div>)
                        }
                    </AccordionDetails>
                </Accordion>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        category: state.products.category,
        brand: state.products.brand
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getProductsByFilter: (filter) => dispatch(fetchProductsByFilter(filter)),
        getCategories: () => dispatch(fetchCategories()),
        getBrands: () => dispatch(fetchBrands())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryBrand);
