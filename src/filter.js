import React from 'react';

export default class MyFilteringComponent extends React.Component {
    state = {
        initialItems: [],
        items: []
    }
    constructor(props) {
      super(props);
      this.showFriendLocation = this.showFriendLocation.bind(this);     
  }
    //showFriendLocation = this.showFriendLocation.bind(this);     
    // componentDidUpdate(oldProps, oldstate){
    //   console.log("old");
    //   console.log(oldProps);
    //   const newProps = this.props;
    //   if (this.state.grid !== oldstate.grid) {
    //     this.setState({ grid: newProps.grid });
    //   }

    //   console.log("New");
    //   console.log(newProps);

    // }
    
    filterList = (event) => {
      let items = this.state.initialItems;
      items = items.filter((item) => {
        return item.toLowerCase().search(event.target.value.toLowerCase()) !== -1;
      });
      this.setState({items: items});
    }

    componentWillMount = () => {
      this.setState({          
          initialItems: this.props.content,
          items: this.props.content
      })
    }

    demoMethod(i,j){
      this.props.sendGridData(i,j,"X");
    }

    showFriendLocation(event){
      var name = event.target.getAttribute("class");
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++){
          
          if(this.props.grid[i][j].users.includes(name)){
              this.demoMethod(i,j);
          }
          
        }
      }


    }

    render() {
      var self = this
      return (
        <div>
          <form>
                <input type="text" placeholder="Search" onChange={this.filterList}/>
          </form>
          <div>
            {
                this.state.items.map(function(item) {
                    return <div key={item} class={item} onClick={self.showFriendLocation}>{item}</div>
                })
            }
            </div>
        </div>
      );
    }
};