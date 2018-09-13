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

const tileData = [
  {
    img: 'https://material-ui.com/static/images/grid-list/breakfast.jpg',
    title: 'Breakfast',
    author: 'jill111'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/burgers.jpg',
    title: 'Burgers',
    author: 'director90'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/camera.jpg',
    title: 'Camera',
    author: 'Danson67'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/morning.jpg',
    title: 'Morning',
    author: 'fancycrave1'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/hats.jpg',
    title: 'Hats',
    author: 'Hans'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/honey.jpg',
    title: 'Honey',
    author: 'fancycravel'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/vegetables.jpg',
    title: 'Vegetables',
    author: 'jill111'
  },
  {
    img: 'https://material-ui.com/static/images/grid-list/plant.jpg',
    title: 'Water Plant',
    author: 'Bkrtmad'
  }
];

class GridListProduct extends Component {
  state = {
    loading: false
  };

  handleProductSearch = () => {
    const searchText = document.getElementById('productlist-search').value;
    if (searchText === '') {
      return;
    }

    this.setState({ loading: true });
    console.log('search text', searchText); //TODO: Add code to load filtered product list

    setTimeout(() => {
      this.setState({ loading: false });
    }, 3000); // simulate loading data
    // this.setState({ loading: false });
  };

  render() {
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
        {tileData.map(tile => (
          <GridListTile key={tile.img}>
            <img src={tile.img} alt={tile.title} />
            <GridListTileBar
              title={tile.title}
              subtitle={<span>by: {tile.author}</span>}
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
