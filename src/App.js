
import React, {Component} from 'react';
import './App.css';
// import Navigation from './components/navigation/Navigation';
// import Register from './components/register/Register';
import FaceRec from './components/facerec/FaceRec';
// import SignIn from './components/signin/SignIn';
import Logo from './components/logo/Logo';
import ImageLinkForm from './components/imagelink/ImageLinkForm';
import Rank from './components/rank/Rank';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
  apiKey: '46e16c19e20b49d1b7cda48e67e57506'
 });

const particleOptions = {
  
  particles: {
        number: {
          value: 90,
          density: {
            enable: true,
            value_area: 800
          }
      }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      box: {},
      route: 'signin',
      isSignedIn: false,
      user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: ''
      }
    }
  }

  // loadUser = (data) => {
  //   this.setState({user: {
  //     id: data.id,
  //     name: data.name,
  //     email: data.email,
  //     password: data.password,
  //     entries: data.entries,
  //     joined: data.joined
  //   }})
  // }

// componentDidMount() {
//   fetch('http://localhost:10533')
//     .then(response => response.json())
//     .then(console.log)
// }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    console.log(box);
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models.predict(Clarifai.FACE_DETECT_MODEL,
      this.state.input)
      // stara metoda
    //   .then(function(response) {
    //     console.log(response.outputs[0].data.regions[0].region_info.bounding_box)    
    //   },   
    //   function(error)  {
    //   }
    // );  
      // zamienione na:
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(err => console.log(err));
       
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState({isSignedIn: false})
    } else if (route === 'home') {
      this.setState({isSignedIn: true})
    }   
      this.setState({route: route});
  }

  render() {
    return (
          <div className="App">
            <Particles className='particles'
              params={{particleOptions}}
            />
          {/* <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
          { this.state.route === 'home'
          ?  */}
          <div>
            <Logo />
            <Rank />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
            <FaceRec box={this.state.box} imageUrl={this.state.imageUrl}/>
            </div>
            : (
              {/* this.state.route === 'signin'
              ? <SignIn onRouteChange={this.onRouteChange}/>  
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>  
            ) */}
            
           
        </div>
      );
    }
}

export default App;
