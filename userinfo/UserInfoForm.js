import React from 'react';
import { Link, hashHistory } from 'react-router';
import request from 'superagent';

const CLOUDINARY_UPLOAD_PRESET = 'gbdreain';
const CLOUDINARY_UPLOAD_URL = 'https://api.cloudinary.com/v1_1/dwomu2yfq/image/upload';

export class UserInfoForm extends React.Component{
	constructor(props) {
		super(props);
		
		this.state = {
			files:'',
			imagePreviewUrl:'blank-user.gif',
			uploadedFiles:'',
			downloadedFiles:'',
			username : '',
			password : '',
			c_password : '',
			email : '',
			gender : '',
			address : '',
			mobile : '',
			
		}
		this._handleImageChange = this._handleImageChange.bind(this);
		this._handleDelete = this._handleDelete.bind(this);
		this.handleInputChange = this.handleInputChange.bind(this);
	}

	 handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({[name]: value});
  }


	componentWillMount() {
  	
  	if(this.props.userToProps.status!='authenticated')
		{
			hashHistory.push('/');
		}

  	if(this.props.activeUserInfoToProps.userinfo)
  		{
  			this.setState({
  			name : this.props.activeUserInfoToProps.userinfo.name,
			email : this.props.activeUserInfoToProps.userinfo.email,
			address :this.props.activeUserInfoToProps.userinfo.address,
			gender : this.props.activeUserInfoToProps.userinfo.gender,
			mobile : this.props.activeUserInfoToProps.userinfo.mobile,
			imagePreviewUrl: this.props.activeUserInfoToProps.userinfo.fileurl,
  			downloadedFiles : this.props.activeUserInfoToProps.userinfo.fileurl
  			})
  		}


  	}

  	componentWillReceiveProps(nextProps)
  	{
  		 if(nextProps.activeUserInfoToProps.userinfo)
  		{
  			this.setState({
  			name : nextProps.activeUserInfoToProps.userinfo.name,
			email : nextProps.activeUserInfoToProps.userinfo.email,
			address :nextProps.activeUserInfoToProps.userinfo.address,
			gender : nextProps.activeUserInfoToProps.userinfo.gender,
			mobile : nextProps.activeUserInfoToProps.userinfo.mobile,
			imagePreviewUrl: nextProps.activeUserInfoToProps.userinfo.fileurl,
  			downloadedFiles : nextProps.activeUserInfoToProps.userinfo.fileurl
  			})
  		}
  	}

  	handleSaveEvent(event)
	{
	if(this.state.files.length!=0)
		if(this.state.uploadedFiles==0)
			{ window.alert('Upload your images first!')
			  return;	
			}


	if((this.state.password !='')&&(this.state.password!=this.state.c_password))
		{window.alert('The Re-type password mismatch'); return;}
	
	if(this.props.userinfoidToProps)
		{
	
		const editeduserinfo = {
		"userid" : this.props.userinfoidToProps,
		"name" : this.state.name,
		"password" : this.state.password,
		"mobile" : this.state.mobile,
		"gender" : this.state.gender,
		"address" : this.state.address,
		"fileurl" : this.state.uploadedFiles ? this.state.uploadedFiles : this.state.downloadedFiles,
		}
	

		this.props.handleSaveEvent(editeduserinfo);
		}	
	}

	_handleSubmit(e) {
		e.preventDefault();
		const files = this.state.files;
		var uploadedFiles = this.state.uploadedFiles;

		if(files!='')
		{
		let upload = request.post(CLOUDINARY_UPLOAD_URL)
			.field('upload_preset', CLOUDINARY_UPLOAD_PRESET)
			.field('file', files);

		upload.end((err, response) => {
			if (err) {
				console.error(err);
			}

			if (response.body.secure_url !== '') {
				uploadedFiles =response.body.secure_url;
				this.setState({uploadedFiles: uploadedFiles});
			}
		});
		}
	window.alert('Finished Uploaded');
	}

	_handleDelete(e) {
		var result = confirm("Want to delete?");
		if (result) {
			e.preventDefault();
				if(typeof this.state.imagePreviewUrl !='undefined'){
				this.setState({files: '',imagePreviewUrl: 'default_image.gif', downloadedFiles:'default_image.gif'});
			}	
	}	

	}

	_handleImageChange(e) {
		e.preventDefault();

		let reader = new FileReader();
		let file = e.target.files[0];

		var files = this.state.files;
		var imagePreviewUrl = this.state.imagePreviewUrl;

		reader.onloadend = () => {

			files = file;
			imagePreviewUrl = reader.result;
			this.setState({files: files,imagePreviewUrl: imagePreviewUrl});
		}
		reader.readAsDataURL(file);	
	}

	render()
	{	
	
    if(this.props.activeUserInfoToProps.loading) {
      return <div><h2>Editing userinfo</h2><h3>Loading...</h3><img id="imgloading" src="images/giphy.gif"/></div>      
    } else if(this.props.activeUserInfoToProps.error) {
      return <div className="alert alert-danger">Error: {this.props.activeUserInfoToProps.error.message}</div>
    }
	
	return(
			<div className="row">
			<div className="form-group col-md-12">
			<h2>{this.props.activeUserInfoToProps.userinfo ? 'Profile Information Edit':''} </h2>    
			{this.props.activeUserInfoToProps.updated ? <div className="alert alert-success"><strong>Success!</strong> The Information is updated</div>:''}
			</div>
			
			<div className="form-group col-md-6">
			<label htmlFor="catname">Username:</label>
			<input type="text" className="form-control" name="name" onChange={this.handleInputChange} value={this.state.name || ''}/>
			</div>
			<div className="form-group col-md-6">
			<label htmlFor="catdesc">Email:</label>
			<input  type="text" className="form-control" name="email" readOnly onChange={this.handleInputChange}  value={this.state.email || ''}/>
			</div>
			<div className="form-group col-md-6">
			<label htmlFor="catname">Password:</label>
			<input type="password" className="form-control" name="password" onChange={this.handleInputChange} value={this.state.password || ''}/>
			</div>
			<div className="form-group col-md-6">
			<label htmlFor="catdesc">Re-Password:</label>
			<input  type="password" className="form-control" name="c_password" onChange={this.handleInputChange}  value={this.state.c_password || ''}/>
			</div>
			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Mobile:</label>
			<input type="text" className="form-control" name="mobile" onChange={this.handleInputChange} value={this.state.mobile || ''} />		
			</div>
			<div className="col-md-6 form-group">	
			<label htmlFor="catname">Organization:</label>
			<input  type="text" className="form-control" name="gender" onChange={this.handleInputChange} value={this.state.gender || ''}/>		
			</div>
			<div className="col-md-12 form-group">	
			<label htmlFor="catname">Address:</label>
			<input  type="text" className="form-control" name="address" onChange={this.handleInputChange} value={this.state.address || ''}/>		
			</div>		

			<div className="col-md-12 form-group">	
			<label htmlFor="catname">Profile Image:</label>
			</div>
			
			<div className="col-md-4 form-group">
			<a><img src={this.state.imagePreviewUrl} onClick={(e)=>this._handleDelete(e)} className="center_image"/></a>
			</div>
			
			<div className="col-md-4 form-group">
			<input className="form-control" type="file" onChange={(e)=>this._handleImageChange(e)} /> <br/><br/>
			<button className="form-control btn-primary" type="submit" onClick={(e)=>this._handleSubmit(e)}>Upload Image</button>
			</div>
		
			<div className="col-md-4 form-group"></div>
			
			<div className="col-md-12 form-group">	</div>

			<div className="col-md-6 form-group">	
			<button type="submit" className="btn btn-success form-control"  onClick={()=>this.handleSaveEvent()}><span className="glyphicon glyphicon-ok"></span> Save User Info</button>
			</div>
			<div className="col-md-6 form-group">	
			<Link to="/dashboard" className="btn btn-default form-control"><span className="glyphicon glyphicon-share"></span> Go back</Link>
			</div>
			
			
			</div>
			)
	
}

}


