import React, { Component } from 'react';
import turtle from './images/007.png';
import mue from './images/213.png';
import mewth from './images/220px-Pokémon_Meowth_art.png';
import pikachu from './images/220px-Pokémon_Pikachu_art.png';
import bulbasaur from './images/1891758-001bulbasaur.png';
import charmeleon from './images/1891762-005charmeleon.png';
import onix from './images/1891842-095onix.png';
import eevee from './images/char-eevee.png';
import marill from './images/marill.png';
import vaporeon from './images/pokemon-go-vaporeon.png';
import sableye from './images/sableye-pokemon-go.png';
import Annive from './images/200px-20th_Anniversary_Mew.png';
class Option extends Component {
  constructor(props){
    super(props);
    this.state ={
      classToggle: true,
      active: 'option',
    }
  }
  toggleClass(){
    console.log(this.state.classToggle)
    this.setState({
      classToggle: this.state.classToggle ? false : true,
      active: this.state.classToggle ? 'option choosen' : 'option',
    });
  }
  onClickOption(){
    this.props.onClickOptionIndx(this.props.dataImg);
    this.toggleClass();
  }
  render(){
    return (
      <div className={this.state.active}
      onClick={()=>this.onClickOption()}>
      <img src={this.props.imgBg}  data-img={this.props.dataImg}/>{this.props.value}
      </div>
    )
  }
}

class Options extends Component {
  constructor(props){
    super(props);
    this.state ={ 
    }
  }
  createOptions(){
    let optionsList =[];
    const optionsRenderList = ()=>{
      for(let i = 0; i < 12; i++) {
        optionsList.push(<Option onClickOptionIndx={this.props.passOptionInd} imgBg={this.props.img[i]} dataImg={i} />);
      }
      return optionsList;
    }
    return optionsRenderList();
  }
  
  render(){ 
   return (
      <div className="options">
        {this.createOptions()}
      </div>
    )
  }
}

class Challange extends Component {
constructor(props){
  super(props);
  this.state= {
    arrImg: [],
    index:[0,0,0]
  };
}
onClick(){
  this.startChallange();
  this.displayChallange(this.state.arrImg);
  this.props.dataResults();
}

displayChallange(arr){

return (
  <div>
  <div className="imgChal"><img src={arr[0]} /></div>
  <div className="imgChal"><img src={arr[1]} /></div>
  <div className="imgChal"><img src={arr[2]} /></div>
  </div>
)
}


startChallange(){
  this.setState({
  arrImg: this.props.images,
  index:[0,0,0]
  });
  const indxArr = [];
  const chooseImg = this.props.images.map((el,i,arr)=>{
    let rand = Math.round(Math.random()*(this.props.images.length-1)); 
    indxArr.push(rand);
      return arr[rand];
  })
  this.setState({
arrImg: chooseImg.slice(0,3),
index: indxArr
  });
}


  render(){
  return (
     <div>
     <div className="challange-display">
     <div className="imgChal"><img src={this.state.arrImg[0]} data-img={this.state.index[0]} /></div>
     <div className="imgChal"><img src={this.state.arrImg[1]}  data-img={this.state.index[1]} /></div>
     <div className="imgChal"><img src={this.state.arrImg[2]}  data-img={this.state.index[2]} /></div>
     </div>
          <div className="hints-display">
          <button className="btn-start" onClick={()=>this.onClick()}>GO!</button>
            <div className="hint"></div>
          </div>
     </div>
  )
}
}

class Game extends Component {
  constructor(props)
  {
    super(props);
    this.state ={
      imgStore: [
        turtle,
        mue,
        mewth,
        pikachu,
        bulbasaur,
        charmeleon,
        onix,
        eevee,
        marill,
        vaporeon,
        sableye,
        Annive
    ],
    dataChallange: [],
    optionChoosed: []
    }    
  }
checkResults()
{
  console.log('oved');
  const arrChalange = document.querySelectorAll('.imgChal img');
  let arrNew = [];
  arrChalange.forEach((img)=>{
    arrNew.push(img.getAttribute('data-img'));
  });
  this.setState({
    dataChallange: arrNew
  })
  console.log(this.state.dataChallange);
}

getOptionClicked(imgIndx){
  this.setState({
    optionChoosed: this.state.optionChoosed.length < 3? [...this.state.optionChoosed,imgIndx]: this.state.optionChoosed,
  })
}

  imagesOptions(){
    return this.state.imgStore;
  }
  render() {
    //this.checkResults();
    return (
<div className="game-area">
<div className="bg-black"></div>
  <div className="content-console">
          <div className="image-title"><img src="https://pngimage.net/wp-content/uploads/2018/06/gotta-catch-em-all-png-6.png" /></div>
         <Challange images = {this.state.imgStore} dataResults={()=> this.checkResults()}/>
          <Options img = {this.imagesOptions()} passOptionInd = {this.getOptionClicked.bind(this)} />
          </div>
        </div>
    )
  } 
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Game />
      </div>
    );
  }
}

export default App;