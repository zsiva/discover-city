import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Button, Container, Grid, Icon } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import Header from '../../Header';
import Lightbox from '../../Lightbox';
import { loadNextCity } from '../../../actions/cities';
import { loadGameData } from '../../../actions/game';


class City extends Component {
  handleOpen = () => this.refs.lightbox.open();

  constructor(props) {
  super(props);
  }
  componentDidMount() {
    this.props.dispatch(loadGameData());
  }

   handleClick(event) {
    const { currentCity } = this.props;
    console.log(this.props);
	}


  render() {
    const { currentCity,selectedCities  } = this.props;
	console.log(this.props);
	 // const nextCity = selectedCities[currentCityID + 1]
	   console.log(selectedCities[2]);

    return (
      <Fragment>
        <Header />
        <section className="ui container" />
		<Container>
		<Grid columns={3}>
            <Grid.Column>
 
		<Container textAlign='left'>
				<Button animated color="blue" size="huge">
				<Button.Content visible size="huge" content="POLIZEI"></Button.Content>
				<Button.Content hidden onClick={this.handleOpen}>
				    <Icon name='taxi' />
				</Button.Content>
			</Button>	
			
		</Container>
		    </Grid.Column>
			<Grid.Column>
		<Container textAlign='center'>
			<Link to="/get-money">
				<Button animated color="green" size="huge">
				<Button.Content visible>Airport</Button.Content>				
				<Button.Content hidden>
				    <Icon name='plane' />
				</Button.Content>				
			</Button>
			</Link>
		</Container>
		   </Grid.Column>
           <Grid.Column>
 
		<Container textAlign='right'>

           
				<Button animated color="green" size="huge">
				<Button.Content visible size="huge" content="Earn money"></Button.Content>
				<Button.Content hidden>
				    
				    <Icon name='money' />
				</Button.Content>
			</Button>	
           
		</Container>
		   </Grid.Column>
		</Grid>
		</Container>
		
		
		 <Lightbox ref="lightbox" header="POLIZEI">
          <p>
            <strong>Welcome to the police department of {currentCity.name} </strong><br />
            <br />I heard you are looking for the thief who stole O'Greeny's money
          </p>
          <p>
              This is the information we have so far.<br /><br />
			 {selectedCities[1].hints[0].label}<br />
			 {selectedCities[1].hints[1].label}<br />
			 {selectedCities[1].hints[2].label}<br />	 
          </p>
          <p>
            <br /> Good luck <br />	 
          </p>

        </Lightbox>
 
      </Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps = {}) => {
  return {
    currentCity: state.gameState.currentCity,
	selectedCities: state.gameState.selectedCities,
	currentCityID: state.gameState.currentCityID,
  };
};

export default connect(mapStateToProps)(City);
