import React from 'react';
import './App.css';


/* Design and code by Sandeep Soni
Resolved two additional problems ....
After passing 16 of 16 there were still some issues with the calculator
1... perform a calculation and then enter a number... the new number appends to/rather than replacing old calculation
2... press AC than hit 'multiply followed by a number' it thows Unexpected token error
When testing locally pass 16 of 16 everytime. On codepen varied result everytime (seems the FCC test CDN is not replicating properly)*/


const buttonList = [
  {    
    keyId: 'clear',
    keyLabel: 'AC',
    keyVal: '',
    keyCode: 24,
    keyClass: 'op-btn threex'
    // Clear should not send any keyVal
  },

  {    
    keyId: 'multiply',
    keyLabel: 'X',
    keyVal: '*',
    keyCode: 42,
    keyClass: 'op-btn'
    
  },
  
  {
    keyId: 'seven',
    keyLabel: '7',
    keyVal: '7',
    keyCode: 55,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'eight',
    keyLabel: '8',
    keyVal: '8',
    keyCode: 56,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'nine',
    keyLabel: '9',
    keyVal: '9',
    keyCode: 57,
    keyClass: 'numpad button'
  },
  
  {    
    keyId: 'divide',
    keyLabel: '/',
    keyVal: '/',
    keyCode: 47,
    keyClass: 'op-btn'
    
  },
  
  {
    keyId: 'four',
    keyLabel: '4',
    keyVal: '4',
    keyCode: 52,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'five',
    keyLabel: '5',
    keyVal: '5',
    keyCode: 53,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'six',
    keyLabel: '6',
    keyVal: '6',
    keyCode: 54,
    keyClass: 'numpad button'
  },
  
  {    
    keyId: 'add',
    keyLabel: '+',
    keyVal: '+',
    keyCode: 43,
    keyClass: 'op-btn'
    
  },
  
  {
    keyId: 'one',
    keyLabel: '1',
    keyVal: '1',
    keyCode: 49,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'two',
    keyLabel: '2',
    keyVal: '2',
    keyCode: 50,
    keyClass: 'numpad button'
  },
  
  {
    keyId: 'three',
    keyLabel: '3',
    keyVal: '3',
    keyCode: 51,
    keyClass: 'numpad button'
  },

  {    
    keyId: 'subtract',
    keyLabel: '-',
    keyVal: '-',
    keyCode: 45,
    keyClass: 'op-btn'
    
  },
  
  {
    keyId: 'zero',
    keyLabel: '0',
    keyVal: '0',
    keyCode: 48,
    keyClass: 'numpad button'
  },

  {
    keyId: 'decimal',
    keyLabel: '.',
    keyVal: '.',
    keyCode: 46,
    keyClass: 'numpad button'
  },
 
  {    
    keyId: 'equals',
    keyLabel: '=',
    keyVal: '=',
    keyCode: 61,
    keyClass: 'op-btn twox'
    
  }

]; 
        
const operators = ['+', '-', '*', '/' ];

let flgReset = true;

class JavaScriptCalculator extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstVal: '',
      entryScreen: '0'
    }

    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyPress)
  }

  splitMultiArgs(str, args) {
      var delimiter = args[0]; 
      for(var i = 1; i < args.length; i++){
          str = str.split(args[i]).join(delimiter);
      }
      str = str.split(delimiter);
      return str;
  }

  verifyInput(num, keyVal) {

    switch (keyVal) {
      case '.':
        const splitMyInput = this.splitMultiArgs(num, operators);

        if (splitMyInput[splitMyInput.length-1].indexOf(keyVal) !== -1 ) {
          return false;
        }
        break;

      //check for consecutive operators 
      case '+':
      case '*':
      case '/':
        const lastInput = num.slice(-1);
        if(operators.includes(lastInput)){
          this.setState(state => ({
            //firstVal: '',
            entryScreen : num.charAt(num.length - 1) === '-' ? num.slice(0,-2) + keyVal : num.slice(0,-1) + keyVal
          }));
          return false;
        }
        else{
          return true;
        }
      default:
        return true;
      
    }
  
  }

  handleClick(key, keyVal) {
    
    if (this.verifyInput(this.state.firstVal, keyVal) === false) {
      //console.log(keyVal + " not allowed");
      return;
    }
    
    switch (key) {

      case 'clear':
        {
          flgReset = true;
          
          this.setState(state => ({
            firstVal: '',
            entryScreen: '0'
          }));

          document.getElementById('display').innerText = '0';
        
          break;
        } 

      case 'equals':
        {
          flgReset = true; 
          let result = eval(this.state.entryScreen);
                  
          this.setState(state => ({
            firstVal: '',
            entryScreen : result
          }));

          document.getElementById('display').innerText = result;

          break;
        }

      default:      
        { 
          
          let display = keyVal;
          let input = document.getElementById('display').innerText;
         
          console.log("#1  else keyVal: " + keyVal + '\nflgReset:' + flgReset + '\ninput:' + input + '\noperators.includes(keyVal):' + operators.includes(keyVal) + '\ndisplay: ' + display); 
          if (flgReset === true ) { 
            if ( operators.includes(keyVal)===false) {
              input = 0;
            }  else {
              input += keyVal;
              //dont allow to start with operator
              display=input;
            }     
            
            flgReset = false;
          }  
          else {
            let lastResult= this.state.entryScreen;
            display = (lastResult==='0'? (input==='0' ? (operators.includes(keyVal)? input+=keyVal: keyVal) : input+=keyVal ) : lastResult+=keyVal); 
          }

          this.setState(state => ({            
            firstVal: display,
            entryScreen: display
          }));
          break;
        }
    }

  }


render() {
  let keypad = buttonList.map((x) => {
    return (
      <div
        id={x.keyId}
        className={x.keyClass}
//        onKeyDown={this.handleKeyPress}  
        onClick={() => this.handleClick(x.keyId, x.keyVal)} 
             ><p>{x.keyLabel}</p>
       
      </div>
    );
  });

  return(
    <div className="App"> 
      <div className="calculator">

        <div className='displaybox' id= ''>
          <div className='displayvals' id='display'>{this.state.entryScreen}</div>
        </div>  
        <div className='keypad'>
        {keypad}
        </div> 
      </div>
    </div>


  )
    
  }
}

//const el = document.getElementById("root");
//ReactDOM.render(<JavaScriptCalculator />, el); 

export default JavaScriptCalculator;
