import React from 'react';
import MyFilteringComponent from '../filter.js';
import { Grid } from '@material-ui/core';
import Input from '@material-ui/core/Input';
import Button from '@material-ui/core/Button';
import firebase from '../firebase.js';


/* TODO
  There should be a prepage, asking the user to enter the secret code for map
  Change filter so a person searched pops up as a person emoji or something
*/

//Object for the logged in user
class CurrentUser {
  constructor() {
    //Get user info and Fill into the state
      this.name = null;
      this.friends = ['John','Blake'];
  }
}
class Container {
  constructor() {
    this.array = [];
  }
}
class Square {
  constructor() {
    this.type = 'O';
    this.suit = null;
    this.users = [];
  }
}

class ViewMap extends React.Component {
    constructor(props) {
        super(props);
        //Needs to store users and 
        this.state = {grid: new Container(), curr:'O', currentUser: new CurrentUser(), peopleSeated: [], code:"", selectedCol:0, selectedRow:0,totalMembers:[]};
        this.displayFriendsOnSelect = this.displayFriendsOnSelect.bind(this);     
        this.getMapFromCode = this.getMapFromCode.bind(this);        
        this.getGridData = this.getGridData.bind(this);
        this.addUserToSeat = this.addUserToSeat.bind(this);  
        this.removeUserFromSeat = this.removeUserFromSeat.bind(this);        
      
        

        

        const initializeGrid = () => {
          this.state.grid = new Container();
  
          for (let i = 0; i < 10; i++) {
            let container = new Container();
            this.state.grid.array.push(container);
            for (let j = 0; j < 10; j++){
              var square = new Square();
              this.state.grid.array[i].array.push(square);
            }
          }
        };
          
        initializeGrid();

      }
      removeUserFromSeat(event){
        var user = firebase.auth().currentUser;
        if(!user){
          alert("Please login to remove yourself");
          return 
        }
        let userName = ""
        //Data to grab username from firebase
          const userID = firebase.firestore().collection('users').doc(user.uid);
        let getDoc = userID.get()
          .then(doc => {
          if (!doc.exists) {
              alert("Error: Doesn't Exist");
              console.log('No such document!');
          } 
          else {
              console.log('Document data:', doc.data());
              userName = doc.data().name
              this.setState({
                  userData: doc.data(),
                });
              let temp = this.state.grid.array[this.state.selectedRow].array[this.state.selectedCol].users
              var index = temp.indexOf(userName);
              if (index !== -1) temp.splice(index, 1);
              this.setState({peopleSeated: temp});
              //Update Firebase grid
              let setDoc = firebase.firestore().collection('data').doc(this.state.code).update(JSON.parse( JSON.stringify(this.state.grid)));
          }
          })
          .catch(err => {
          console.log('Error getting document', err);
          });

      }
      addUserToSeat(event){
        var user = firebase.auth().currentUser;
        console.log(user);
        if(!user){
          alert("Please login to add yourself");
          return 
        }
        let userName = ""
        //Data to grab username from firebase
        const userID = firebase.firestore().collection('users').doc(user.uid);
        let getDoc = userID.get()
          .then(doc => {
          if (!doc.exists) {
              alert("Error: Doesn't Exist");
              console.log('No such document!');
          } 
          else {
              console.log('Document data:', doc.data());
              userName = doc.data().name
              this.setState({
                  userData: doc.data(),
                });
              let temp = this.state.grid.array[this.state.selectedRow].array[this.state.selectedCol].users
              temp.push(userName);
              this.setState({peopleSeated: temp});
              //Update Firebase grid
              let setDoc = firebase.firestore().collection('data').doc(this.state.code).update(JSON.parse( JSON.stringify(this.state.grid)));
          }
          })
          .catch(err => {
          console.log('Error getting document', err);
          });

      }
      //Code here to send current grid layout to firebase under user credentials
      getMapFromCode(event) {
        if(this.state.code == ""){
          alert("Please enter a code");
          return;
        }
        let map = firebase.firestore().collection('data').doc(this.state.code);

        let getDoc = map.get()
        .then(doc => {
          if (!doc.exists) {
            alert("Error: Doesn't Exist");
            console.log('No such document!');
          } 
          else {
            console.log('Document data:', doc.data());
            this.setState({
              grid: doc.data()
            });
          }
        })
        .catch(err => {
          console.log('Error getting document', err);
        });

      }
      
      updateCode = (event) => {
        var newCode = event.target.value;
        this.setState({code: newCode});
      }
      
      //updates point based on the location the user clicks on the grid
      displayFriendsOnSelect(event) {
        this.getMapMembers();
        var col = event.target.getAttribute("id");
        var row = event.target.getAttribute("class");
        this.setState({
            grid: this.state.grid, 
            curr: this.state.curr, 
            currentUser: new CurrentUser(), 
            peopleSeated: this.state.grid.array[row].array[col].users,
            selectedCol: col,
            selectedRow:row
          });

        this.state.peopleSeated = this.state.grid.array[row].array[col].users;
        this.setState(this.state.peopleSeated);

      }
      //Sends data from parent to child
      //Iterates through graph, finding friends who are sitting there
      getGridData(i,j,val){
        //console.log(val);
        this.state.grid.array[parseInt(i)].array[parseInt(j)].type = val;
        this.setState(this.state.grid);

      }
      getMapMembers(){
        var members = new Set(); 
        for (let i = 0; i < this.state.grid.array.length; i++) {
          for (let j = 0; j < this.state.grid.array.length; j++){
            for(let k = 0; k < this.state.grid.array[i].array[j].users.length; k++){
              if(!members.has(this.state.grid.array[i].array[j].users[k])){
                members.add(this.state.grid.array[i].array[j].users[k]);
              }
            }
          }
        }
        this.state.totalMembers = [...members];
        this.setState({totalMembers: [...members]});



      }
      render() {  

        let myComponent;
        if(this.state.totalMembers.length != 0) {
            myComponent = <MyFilteringComponent sendGridData={this.getGridData}  grid={this.state.grid} content={this.state.totalMembers} hasFriends={false}/>
        } else {
            myComponent = <p>Nobody is seated in this map yet!</p>
        }

        return (

          <div>
                <h1>View Map</h1>
                <label>
                  Enter Code to View Map:
                </label>
                <Input placeholder="Enter map password to join one" onChange={this.updateCode} inputProps={{ 'aria-label': 'description' }} />
                <Button variant="contained" color="secondary" onClick={this.getMapFromCode}>
                        Submit
                </Button>
                <Grid 
                container
                direction="row"
                justify="center"
                alignItems="center">

                  <Grid item>

                  <Button variant="contained" color="primary" onClick={this.addUserToSeat}>
                        Add me
                  </Button>
                  
                  <Button variant="contained" color="primary" onClick={this.removeUserFromSeat}>
                        Remove me
                  </Button>
                  <h4>People Sitting Here:</h4>
                  
                  <table>
                    {
                      this.state.peopleSeated.length!=0 ?

                      this.state.peopleSeated.map((person, index) => (
                        
                        <tbody key={index} id="row">
                          {person}
                        </tbody>

                      ))
                      : <p>This spot is empty!</p>
                    }
                  </table>

                      </Grid>
                      <Grid item>

                        <table class="flex-row">
                          <div class="flex-row">
                              {
                                this.state.grid.array.map((row, index) => (
                                  <div key={index} id="row">
                                    {row.array.map( (cellContent,colIndex) => 
                                      <div key={colIndex} onClick={this.displayFriendsOnSelect} id={colIndex} className={index} img={cellContent.type} ></div>)}
                                  </div>
                                ))
                              }

                          </div>
 
                        </table>
                    </Grid>
                    <Grid item>
                        <h4>People Sitting Here:</h4>
                        <table>
                            {
                              this.state.peopleSeated.length!=0 ?

                              this.state.peopleSeated.map((person, index) => (
                                    <tbody key={index} id="row">
                                    {person}
                                    </tbody>
                                ))
                                : <p>This spot is empty!</p>
                                }
                        </table>
                  </Grid>
                </Grid>

                    <br>
                    </br>


            <h2>Users in this map:</h2>
            {myComponent}
 
          </div>   
          );
        }
        
      }
      
export default ViewMap;
// this.state.currentUser.friends