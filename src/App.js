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
import xicon from './images/x-icon.png';

let x=-1;
const count = ()=>{
x++  
  return x;
}
class Option extends Component {
  constructor(props){
    super(props);
    this.state ={
      active: 'option',
    }
  }
  toggleClass(){
    this.setState({
      active: 'option choosen',
    });
  }
  onClickOption(){
   this.props.onClickOptionIndx(this.props.dataImg);
    this.toggleClass();
  }
  
  async ckicked()
  {
    let x = count();
    await this.onClickOption();
    await this.props.winOrLose(x);
}
  render(){
    return (
      <div className={this.state.active}
      onClick={()=>this.ckicked()}>
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
        optionsList.push(<Option onClickOptionIndx={this.props.passOptionInd} imgBg={this.props.img[i]} dataImg={i} winOrLose = {()=>this.props.win(x)} />);
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
    index: [],
    disableBtn: 'btn-start',
  };
}
disableBtn() {
  this.setState({
    disableBtn: 'disableBtn btn-start'   
  })
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
  
  const indxArr = [];
  const chooseImg = this.props.images.map((el,i,arr)=>{
    let rand = Math.round(Math.random()*(this.props.images.length-1)); 
    indxArr.push(rand);
      return arr[rand];
  })

  this.setState({
    arrImg: chooseImg.slice(0,3),
    index: indxArr,
  });
  
}
async onClick(){
  this.disableBtn();
  await this.startChallange();
  await this.displayChallange(this.state.arrImg);
  this.props.dataResults();
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
          <button className={this.state.disableBtn} onClick={()=>this.onClick()}>GO!</button>
            <div className="hint">
              
            </div>
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
        Annive,
    ],
    dataChallange: [],
    optionChoosed: [],
    caught: [],
    catchs: 0,
    }    
  }
  checkOptionsChooded(a)
{
  if (this.state.dataChallange.length == 0 || this.state.optionChoosed.length == 0 )
  {
    return null
  }
  else if(this.state.dataChallange[a] == this.state.optionChoosed[a]){
            alert('Nice Catch!!')
            this.state.caught.push(this.state.dataChallange[a]);
            this.setState({
              caught: this.state.caught,
              catchs: this.state.catchs+1,
            });
  }
  else {alert('You Missed..')}
}
checkResults()
{
  const arrChalange = document.querySelectorAll('.imgChal img');
  let arrNew = [];
  arrChalange.forEach((img)=>{
    arrNew.push(img.getAttribute('data-img'));
  });
  this.setState({
    dataChallange: arrNew,
    optionChoosed: []
  })

}

 getOptionClicked(imgIndx){
   this.setState({
    optionChoosed: this.state.optionChoosed.length < 3 ? [...this.state.optionChoosed,imgIndx]: this.state.optionChoosed,
  }) 
}

renderPopResults(){
  if (this.state.optionChoosed.length >=3) {
    
    let endGame = document.createElement('div');
    endGame.setAttribute('class','endPop');
    endGame.innerHTML = `
    <div class="end-wrapper">
    <h1>GAME OVER</h1>
    <p>You have got ${this.state.catchs} pokemons </p>
    <div class="pokemons">
<img src="${this.state.caught[0] ? this.state.imgStore[this.state.caught[0]] : xicon}" />
<img src="${this.state.caught[1] ? this.state.imgStore[this.state.caught[1]] : xicon}" />
<img src="${this.state.caught[2] ? this.state.imgStore[this.state.caught[2]] : xicon}" />
    </div>
    <a href="http://localhost:3000/" class="play-again">PLAY AGAIN</a>
    </div>
    `;
    document.querySelector('#root').appendChild(endGame);
  }
}

  imagesOptions(){
    return this.state.imgStore;
  }
  render() {
    this.renderPopResults();
    return (
<div className="game-area">
<div className="bg-black"></div>
  <div className="content-console">
          <div className="image-title"><img src="https://pngimage.net/wp-content/uploads/2018/06/gotta-catch-em-all-png-6.png" /></div>
         <Challange images = {this.state.imgStore} dataResults={()=> this.checkResults()}/>
          <Options img = {this.imagesOptions()} passOptionInd = {this.getOptionClicked.bind(this)} win= {()=>this.checkOptionsChooded(x)} />
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