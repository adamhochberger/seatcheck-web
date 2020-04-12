import React from 'react';
import firebase from '../firebase.js';

import Button from '@material-ui/core/Button';
import { Grid } from '@material-ui/core';
import Input from '@material-ui/core/Input';
/*
TO DO
    Need Map ID instead of Map name, or a duplicate check
*/

//Object for the logged in user
class CurrentUser {
  constructor() {
    //Get user info and Fill into the state
      this.name = null;
      this.friends = ['John','Blake'];
  }
}


class listMapsView extends React.Component {
    constructor(props) {
        super(props);
        //Needs to store users and 
        this.state = {currentUser:firebase.auth().currentUser, map_:null,first:true};
        this.removeFromList = this.removeFromList.bind(this);        

      }


      removeFromList(event){

        var user = firebase.auth().currentUser;
        var index = event.target.getAttribute("class");
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

      
      render() {  
          var temp = firebase.auth().currentUser;
          console.log("From ListMap", temp)
          const userID = null
          let maps = null
          let flag = true;
          console.log(this.state.first, temp)
          if(temp && this.state.first){
              console.log("Enters")
              const userID = firebase.firestore().collection('users').doc(temp.uid);
              let getDoc = userID.get()
                .then(doc => {
                if (!doc.exists) {
                    alert("Error: Doesn't Exist");
                    console.log('No such document!');
                } 
                else {
                    console.log('Document data:', doc.data());
                    maps = doc.data()
                    flag = false;
                    
                    this.setState({
                        map_: doc.data(),
                        first: false
                      });
                }
                })
                .catch(err => {
                console.log('Error getting document', err);
                });
          }

          //const userID = firebase.firestore().collection('users').doc(userID);

        return (
          <div>
              <h1>
                    Maps you've created
              </h1>
            {this.state.map_
                    ?          
                    <table>
                    {
                        this.state.map_.createdMaps.map((map, index) => (
                        <h1 justify="center" key={index} id="row">
                            {map}
                            <Button onClick={this.removeFromList} class={index} variant="contained" color="secondary">
                            Delete
                            </Button>
                        </h1>
                        ))
                    }

                    </table>

                    : <p>Please Login</p>
            }


          </div>   
          );
        }
        
      }
      
export default listMapsView;
