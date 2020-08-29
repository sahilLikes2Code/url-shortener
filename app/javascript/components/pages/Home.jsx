import React from "react"
import '../../../assets/stylesheets/application.css'
import {fetchApi} from '../../utils/API';
import * as Routes from "../../utils/Routes";
import DisplayUrl from "../DisplayUrl";
import axios from 'axios'

class Home extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      url: {
        original: ""
      },
      arrayOfUrls: [],
      message: ''
    }
  }


  handleChange = ({target: {name, value}}) => {
    this.setState({
      url: {...this.state.url, [name]: value}
    });
  };


  handleSubmit = async (event) => {
    event.preventDefault()
    try {
      const response = await axios.post(Routes.urls_path(), this.state)
      ;
      const urlzArray = (JSON.parse(response.config.data).arrayOfUrls)
      this.setState({
        ...this.state, arrayOfUrls: urlzArray
      })
    } catch (error) {
      this.setState({
        ...this.state, errors: response.data.urls
      })
      console.error(error);
    }

    await this.fetchListOfUrls()
    document.getElementById("createUrlForm").reset();

  }

  fetchListOfUrls = async () => {
    try {
      const response = await axios.get(Routes.urls_path());
      this.setState({
        ...this.state, arrayOfUrls: response.data.urls
      })
    } catch (error) {
      this.setState({
        ...this.state, errors: response.data.urls
      })
      console.error(error);
    }
  }


  componentDidMount() {
    this.fetchListOfUrls()
  }


  render() {
    // console.log('props', this.props)
    return (
      <React.Fragment>
        <div className='bg-secondary h1000'>

          {/*navbar*/}
          <nav className='bg-white'>
            <div className='wrapper py-2'>
              <h1>Sahil</h1>
            </div>
          </nav>

          {/*test message*/}

          <h1>{this.state.message}</h1>
          {/*  search bar*/}
          <section>
            <div className='wrapper py-3'>
              <form id='createUrlForm' onSubmit={this.handleSubmit}>
                <input type='text'
                       name='original'
                       id='original'
                       className='w-75'
                       placeholder='Enter a URL to shorten'
                       onChange={this.handleChange}/>
                <button className='w-25 bg-success'>Submit
                </button>
              </form>
            </div>
          </section>

          {/*  Display shortened links*/}
          <div className='wrapper '>
            <div
              className='bg-success d-flex justify-content-around align-items-center text-white py-3 mt-3'>
              <p className='my-0'>Original</p>
              <p className='my-0'>Shortened</p>
              {/*<p>Munched</p>*/}
            </div>
            <DisplayUrl urls={this.state.arrayOfUrls}
                        fetchListOfUrls={this.fetchListOfUrls}/>
          </div>
        </div>
        <button>Click me</button>
      </React.Fragment>
    );
  }
}

export default Home
