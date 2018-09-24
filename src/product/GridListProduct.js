import React, { Component } from 'react';
import { injectIntl, defineMessages } from 'react-intl';
import Typography from '@material-ui/core/Typography';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import ListSubheader from '@material-ui/core/ListSubheader';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import SearchIcon from '@material-ui/icons/Search';
import ProductData from './ProductData';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const messages = defineMessages({
  productListTitle: {
    id: 'productlist.title',
    defaultMessage: 'Product List'
  }
});

const GET_PRODUCTS = gql`
{
  products {
    img,
    title,
    author
  }
}
`;

const ProductList = ({ searchText }) => (
  <Query query={GET_PRODUCTS}>
    {({ loading, error, data }) => {
      if (loading) return <LinearProgress />;
      if (error) return `Error! ${error.message}`;

      return (
          data.products.map(item => (
            <GridListTile key={item.img}>
              <img src={item.img} alt={item.title} />
              <GridListTileBar
                title={item.title}
                subtitle={<span>by: {item.author}</span>}
                actionIcon={
                  <IconButton>
                    <InfoIcon />
                  </IconButton>
                }
              />
            </GridListTile>
          ))
      );
    }}
  </Query>
);

class GridListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      products: null
    };
  }

  componentDidMount() {
    this.loadProducts(null);
  }

  loadProducts(searchtext) {
    //TODO: replace to load data from api
    var filteredProducts = [];

    if (searchtext === null) {
      filteredProducts = ProductData;
    } else {
      filteredProducts = ProductData.filter(item => {
        return item.title.toLowerCase().includes(searchtext.toLowerCase());
      });
    }
    this.setState({ products: filteredProducts });
  }

  handleProductSearch = () => {
    const searchText = document.getElementById('productlist-search').value;
    if (searchText === '') {
      this.loadProducts(null);
      return;
    }
    this.setState({ loading: true });
    
    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000); // simulate loading data

    // this.loadProducts(searchText);
    // this.setState({ loading: false });
  };

  render() {
    const {
      intl: { formatMessage }
    } = this.props;
    const { loading } = this.state;

    return (
      <GridList style={{ maxWidth: '768px', margin: '10px' }}>
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ backgroundColor: '#ffffcc', height: 'auto' }}
        >
          <ListSubheader component="div">
            <Typography type="title" color="inherit">
              {formatMessage(messages.productListTitle)}
            </Typography>
            <TextField
              id="productlist-search"
              disabled={loading}
              onKeyPress={e => {
                if (e.key === 'Enter') {
                  this.handleProductSearch();
                  e.preventDefault();
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon onClick={this.handleProductSearch} />
                  </InputAdornment>
                )
              }}
            />
          </ListSubheader>
        </GridListTile>
        <ProductList />
      </GridList>
    );
  }
}

export default injectIntl(GridListProduct);
