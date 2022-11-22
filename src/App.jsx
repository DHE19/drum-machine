import './App.css';
import React, { useState,useEffect } from 'react';



const pads = [{
  id: 'heater-1',
  letter:'Q',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3',
  clipName:'Heater 1'
},{
  id: 'heater-2',
  letter:'W',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3',
  clipName:'Heater 2'
},{
  id: 'heater-3',
  letter:'E',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3',
  clipName:'Heater 3'
},{
  id: 'heater-4',
  letter:'A',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3',
  clipName:'Heater 4'
},{
  id: 'clap',
  letter:'S',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3',
  clipName:'Clap'
},{
  id: 'open-hh',
  letter:'D',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3',
  clipName:'Clap'
},{
  id: 'kick-n-hat',
  letter:'Z',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3',
  clipName:"Kick n' Hat"
},
{
  id: 'kick',
  letter:'X',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3',
  clipName:'Kick'
},
{
  id: 'closed-hh',
  letter:'C',
  sourceClip:'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3',
  clipName:'Closed HH'
}

]

function App() {
  //donde vamos a guardar los audios
  const [audios, setAudios] = useState(null);
  const [display, setDisplay] = useState('');
  // se llama cafa ves que es presionado los pats
  const handleAudioPlay = (letter) =>{
    const item = audios.find(i => i.letter === letter);
    item.element.play();
    setDisplay(item.name)
  }

  //crea los pads
  const padsbuttons = pads.map((i,index) => (
    <div onClick={() => handleAudioPlay(i.letter)} onKeyDown={() => console.log('presionado')} className='drum-pad' key={index} id={i.id}>
        <audio className="clip" id={i.letter} src={i.sourceClip}></audio>
        {i.letter}
    </div>))


    useEffect(() => {
      setAudios(pads.map(value => {
      const element =  document.getElementById(value.letter);
      return{
        letter: value.letter,
        element,
        name: value.clipName
      }
      }));
    }, [])
    useEffect( () =>{
      if(audios)
        window.addEventListener('keydown', (e) =>{
          const value = audios.find(i => `Key${i.letter}` === e.code);
          if(value !== undefined){
            value.element.play();
            setDisplay(value.name);
          }
        })
    },[audios])

  return (
    <div className="App">
      <div id="drum-machine">
          <div id="display">
              <p>{display}</p>
          </div>
          {padsbuttons}
      </div>
    </div>
  );
}

export default App;
