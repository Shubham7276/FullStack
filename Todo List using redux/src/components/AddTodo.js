import React from 'react'
import { connect } from 'react-redux'
import { addTodo } from '../redux/actions/actions'

class AddTodo extends React.Component{
    constructor(props){
        super(props);
        this.state = {input:""};
    }

    updateInput = input =>{
        this.setState({input});
    }

    handleAppTodo = () =>{
        this.props.addTodo(this.state.input);
        this.setState({input: ""});
    }

    render(){
        return(
            <div>
                <input onChange={e=> this.updateInput(e.target.value)} value={this.state.input}/>

                <button onClick={this.handleAppTodo}>Add Todo</button>
            </div>
        )
    }
}

export default connect(null,{addTodo})(AddTodo)