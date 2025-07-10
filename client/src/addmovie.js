import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';

class AddMovie extends React.Component
{
    constructor(props){    //To initiliaze variables and methods
        super(props);

this.state={
    id:'',
    mname:'',
    mtype:'',
    mdesc:'',
    movielist:[],
    isUpdate:false, //to check whether to update or insert
    message:'',
    isValidate:false //to check whether form is valid or not
}
this.getMovieName=this.getMovieName.bind(this);
this.getMovieType=this.getMovieType.bind(this);
this.getMovieDesc=this.getMovieDesc.bind(this);
this.saveMovie=this.saveMovie.bind(this);
this.updateMovie=this.updateMovie.bind(this);
 this.getAll=this.getAll.bind(this);
 this.editMovie=this.editMovie.bind(this);
 this.deleteMovie=this.deleteMovie.bind(this);
 this.resetForm=this.resetForm.bind(this);
 this.deleteConfirm=this.deleteConfirm.bind(this);
console.log('constructor');
    }
     getMovieName(e){   //e is nothing but instance e is calling before mname value
        this.setState({mname:e.target.value});
    }
    getMovieType(e){
        this.setState({mtype:e.target.value});
    }
    getMovieDesc(e){
        this.setState({mdesc:e.target.value});
    }
    getAll(){
        fetch('http://localhost:8000/movie/getAll')
        .then((response)=>{
            return response.json();
        }).then((result)=>{
            this.setState({movielist:result});
        }).catch((err)=>{
            console.log(err);
        });
    }
    saveMovie(){
        //to validate form
        if(this.state.mname==='' || this.state.mtype==='' || this.state.mdesc===''){
            this.setState({
                isValidate:false,
                message:'please fill all the fields'
            });
            return;
        }
    var movie={
    "name":this.state.mname, 
    "type":this.state.mtype,
    "desc":this.state.mdesc
}
// this.setState({movielist:this.state.movielist.concat(movie)})
// console.log(this.state.movielist)
//connect API call to save movie
fetch('http://localhost:8000/movie',{
    method:'POST',
    headers:{
        'Content-Type':'application/json'
    },
    body:JSON.stringify(movie)
}).then((response)=>{
    return response.json();
}).then((result)=>{
    if(result.message==='Inserted')
    {
        this.setState({
            isValidate:true,
            message:'Movie saved successfully'
        })
        this.resetForm();
        this.getAll(); //to refresh the movielist
}
    else 
    alert('Error occured while saving movie');
    
}).catch((err)=>{
    console.log(err);
});
    }
editMovie(id){
fetch('http://localhost:8000/movie/get/'+id)
.then((response)=>{
    return response.json();
}).then((result)=>{
    this.setState({
        id:result[0]._id,
        mname:result[0].name,
        mtype:result[0].type,
        mdesc:result[0].desc,
        isUpdate:true 
    });
}).catch((err)=>{
    console.log(err);
});
}
resetForm(){
    this.setState({
        mname:'',mtype:'',mdesc:'',isUpdate:false
    });
}
// deleteMovie(id) {
//   fetch('http://localhost:8000/movie/delete/' + id, {
//     method: 'DELETE'
//   })
//   .then(response => response.json())
  

//   .then(() => {
   
//     this.setState({
   
//     //   id: '',
//     //   mname: '',
//     //   mtype: '',
//     //   mdesc: '',
//       isUpdate: true
//     });
//     console.log('Movie deleted');
//   })
//   .catch(err => console.log('Error:', err));
// }
    deleteMovie() {
   //console('hi');
        fetch('http://localhost:8000/movie/delete/' + this.state.id, {
            method: 'DELETE',
        })
        .then((response) => response.json())
        .then((result) => {
            console.log(result);

            if (result.message === 'Deleted') {
this.setState({id:''})
                this.getAll(); 
                
            } 
        })
        .catch((err) => {
            console.log(err);
        });
    }

 updateMovie(id){
        var movie={
            "_id":this.state.id,
            "name":this.state.mname,
            "type":this.state.mtype,
            "desc":this.state.mdesc
        }
        fetch('http://localhost:8000/movie/update/'+this.state.id,{
            method:'PUT',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify(movie)
        }).then((response)=>{
                return response.json();
        }).then((result)=>{
            if(result.message==='Updated'){
                //this.setState({isUpdate:false});
                this.resetForm();//to reset form
                this.getAll();//to refresh the movie list
            }
            else {
            alert('Error occured while updating movie');
            }
        }).catch((err)=>{
            console.log(err)
        });
     }
     deleteConfirm(id){
this.setState({
    id:id
});
     }
    
 
// this.setState({movielist:this.state.movielist.concat(movie)})
// console.log(this.state.movielist)
//connect API call to save movie

    render(){
        // console.log('render');
        return(
            <div>
                <hr/>
                <div style={{float:"left", width:"50%"}}>
                <h1>Add Movie-{this.props.title}</h1>
                <hr/>
                <form>
                    Movie Name:<input type="text" value={this.state.mname} onChange={this.getMovieName} /><br/>
                    Movie Type:<input type="text" value={this.state.mtype} onChange={this.getMovieType}/><br/>
                    Movie Desc:<input type="text" value={this.state.mdesc} onChange={this.getMovieDesc}/><br/>
                   
                    {(this.state.isUpdate)?
                    <input type='button' value="Update" onClick={this.updateMovie} className='btn btn-primary'/>
                    :
                     <input type='button' value="Save" onClick={this.saveMovie} className='btn btn-primary'/>
                    }
                    <input type='button' value="Reset" onClick={this.resetForm} className='btn btn-secondary'/>
                </form>
                {(this.state.message!=='')?
                <div>
                    {(this.state.isValidate)?
                    <div className='alert alert-success'>{this.state.message}</div>
                    :
                     <div className='alert alert-danger'>{this.state.message}</div>
                        }
                </div>
                :''}
                </div>
                <hr/>
                <div style={{float:"right",width:"50%"}}>
                <table className='table table-bordered table-striped'>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Desc</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>

                    </thead>
                    <tbody>
                        {this.state.movielist.map((item)=>(
                            <tr>
                                <td>{item.name}</td>
                                <td>{item.type}</td>
                                <td>{item.desc}</td>
                                <td><button className="btn btn-primary" onClick={()=>this.editMovie(item._id)}>Edit</button></td>
                                 <td><button className="btn btn-danger" data-target="#confirmModal" data-toggle="modal" onClick={()=>this.deleteConfirm(item._id)}>Delete</button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                </div>
               
                {/* <h4>{this.state.mname}</h4>
                <h4>{this.state.mtype}</h4>
                <h4>{this.state.mdesc}</h4> */}
             
<div class="modal fade" id="confirmModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      {/* <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
      <div class="modal-body">
        Are you sure you want to delete this movie?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">No</button>
        <button data-dismiss="modal" type="button" class="btn btn-primary" onClick={this.deleteMovie}>Yes</button>
      </div>
    </div>
  </div>
</div>

            </div>
        );
    }
     
     componentDidMount(){
        this.getAll();
     }
    }
export default AddMovie;


//     componentDidMount(){           //To load default data after render
//         console.log('componentDidMount') //because set state when we change the data after it wil rerendering the data it shows latest update
// setTimeout(()=>{
//     this.setState({mname:'Movie ABC'})
// },5000)
//     }
//  }
// export default AddMovie;
// const updatedMovies = this.state.movies.filter(movie => movie.id !== id);

    
//       movies: updatedMovies
