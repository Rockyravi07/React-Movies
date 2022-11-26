import React from'react';
import axios from 'axios'
class MoviesSearch extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            data:[],
            filterData:[],
            searchElemant:''
        }
    }
    async componentDidMount(){
        console.clear();
        let response = await axios.get('https://www.omdbapi.com/?apikey=45f0782a&s=men');
        this.setState({data:response.data.Search,filterData:response.data.Search})
    }
    Search=async data=>{
        console.log(data);
        let response = await axios.get(`https://www.omdbapi.com/?apikey=45f0782a&s=${(data=='')?'war':data}`);
        // if(response.data.Search!=undefined){
            this.setState({filterData:response.data.Search,searchElemant:data})
        // }
        console.log('after fetchinng the data');
    }
    render(){
        let data=this.state.filterData
        console.log(data);
        return <div className="body--wrapper">
            
            <div className='searchBar--wrapper' >
                <input type='text'className='searchBar' placeholder="Search for Movie Title ……" onChange={(e)=>this.Search(e.target.value)}/>
            </div>
            {data!=undefined && <div className='moviePosters--wrapper'>
                {data.map(i=><div className="poster--pack">
                    <div className="poster--img--wrapper">
                        <img className="poster--img" src={i.Poster} alt='img' />
                    </div>
                    <div className='poster--name'>
                        <p>{i.Title}</p>
                    </div>
                </div>)}
            </div>}
            {data==undefined && <div className='error--wrapper'>
                <span className='error404'>{this.state.searchElemant} </span> Not found
                </div>}

        </div>
    }
}
export default MoviesSearch;