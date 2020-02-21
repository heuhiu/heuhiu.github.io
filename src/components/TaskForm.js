import React, { Component } from 'react';

class TaskForm extends Component {
  
    constructor(props){
        super(props); 
        this.state = {
            id : '',
            name : '',
            status : false
        }
    }


    UNSAFE_componentWillMount(){
        console.log("UNSAFE_componentWillMount");
        if(this.props.task){
            this.setState({
                id : this.props.task.id,
                name : this.props.task.name,
                status : this.props.task.status,
            });
        }
    }

    UNSAFE_componentWillReceiveProps(nextProps){
        if(nextProps && nextProps.task){
            this.setState({
                id : nextProps.task.id,
                name : nextProps.task.name,
                status : nextProps.task.status,
            });
        } else if (!nextProps.task){
           this.setState({
            id : '',
            name : '',
            status : false
           });
        }
    }


    onCloseFormOfTaskForm = () =>{
        this.props.onCloseFormToTaskForm();
    }

    onChange = (event) => {
        var target = event.target;
        var name = target.name;
        var value =  target.value;
        if(name === 'status') {
            value= target.value === 'true' ?true:false
        }
        this.setState({
            [name] : value  
        })
    }

    onSubmit = (event) =>{
        event.preventDefault();     
        this.props.onSubmitToTaskForm(this.state);
        this.onClear();
        this.onCloseFormOfTaskForm();
    }

    onClear = ()=> {
        this.setState({
            name : '',
            status: false
        })
        this.onCloseFormOfTaskForm();
    }

    render() { 
        var { id } = this.state;
    return (
    <div>
        <div className="panel panel-warning">
            <div className="panel-heading">
                <h3 className="panel-title">
                { id !== '' ? "Update": 'Thêm Công Việc'}
                <span 
                className="fa fa-times-circle"
                onClick={this.onCloseFormOfTaskForm}
                ></span>
                </h3>
            </div>
            <div className="panel-body">
                <form onSubmit = {this.onSubmit}>
                    <div className="form-group">
                        <label>Tên :</label>
                        <input 
                            type="text" 
                            className="form-control" 
                            name="name"
                            value={this.state.name}
                            onChange={this.onChange}
                        />
                    </div>
                    <label>Trạng Thái :</label>
                    <select 
                        className="form-control" 
                        required="required"
                        name="status"
                        value={this.state.status}
                        onChange={this.onChange}
                    >
                        <option value={true}>Kích Hoạt</option>
                        <option value={false}>Ẩn</option>
                    </select>
                    <br/>
                    <div className="text-center">
                        <button type="submit" className="btn btn-warning">Thêm</button>&nbsp;
                        <button 
                            type="button" 
                            className="btn btn-danger"
                            onClick ={this.onClear}
                        >Hủy Bỏ</button>
                    </div>
                </form>
            </div>
        </div>
                
        <script src="//code.jquery.com/jquery.js"></script>
        <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.6/js/bootstrap.min.js" integrity="sha384-0mSbJDEHialfmuBBQP6A4Qrprq5OVfW37PRR3j5ELqxss1yVqOtnepnHVP9aJ7xS" crossOrigin="anonymous"></script>
    </div>
    
    );
  }
}

export default TaskForm;
