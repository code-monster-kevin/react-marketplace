import React, { Component } from 'react';
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
    this.loadProducts(searchText);
    this.setState({ loading: false });
  };

  render() {
    const { loading, products } = this.state;

    return (
      <GridList style={{ maxWidth: '768px', margin: '10px' }}>
        <GridListTile
          key="Subheader"
          cols={2}
          style={{ backgroundColor: '#ffffcc', height: 'auto' }}
        >
          <ListSubheader component="div">
            <Typography type="title" color="inherit">
              Product List
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
          {loading && <LinearProgress />}
        </GridListTile>
        {products &&
          products.map(item => (
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
          ))}
      </GridList>
    );
  }
}

export default GridListProduct;
