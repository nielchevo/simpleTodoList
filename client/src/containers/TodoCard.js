import React from 'react';

class TodoCard extends React.Component {
   constructor(props){
      super(props);
      console.log(props);
      this.state = {
         todo: [],
         title:''
      }
   }
   
   componentDidMount() {
      this.setState({todo: this.props.listCard, title: "mboh su"});
   }

   render(){
      console.log(this.state);
      return(
         <h1>todoCard</h1>
      )
   }
}

export default TodoCard