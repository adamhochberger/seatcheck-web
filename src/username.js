import React from 'react';
import './App.css';

function User() {
    return (
      <div className="username">
        <header className="App-header">
        <form>
            <label>
                Please enter username
                <input type="text" name="name" />
            </label>
            <input type="submit" value="Submit" />
        </form>
        </header>
      </div>
    );
  }
  
  export default User;