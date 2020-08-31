import React from "react"
import '../../../assets/stylesheets/application.css'
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
      message: '',
      error: ''
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
      const response = await axios.post(Routes.urls_path(), this.state);
      const message = response.data.notice
      const urlsArray = (JSON.parse(response.config.data).arrayOfUrls)

      console.log('urlz array', urlsArray)
      this.setState({
        ...this.state,
        arrayOfUrls: urlsArray,
        error: '',
        message: message
      })
    } catch (error) {
      const errorMessage = (error.response.request.responseText.split(':')[1]).replace(/["}]/g, '')

      this.setState({
        ...this.state,
        error: errorMessage
      })
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
    console.log('props', this.props)
    return (
      <React.Fragment>
        {/*<div className='bg-secondary mh-800 pb-5'>*/}
        <div className='pb-5'>

          {/*navbar*/}
          <nav className='bg-navy-blue text-pink'>
            <div className='wrapper py-2'>
              <h1>Url Muncher</h1>
            </div>
          </nav>
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
                <button className='w-25 bg-navy-blue text-pink'>Submit
                </button>
              </form>
            </div>
          </section>

          {/*Success message display*/}
          <h3
            className='text-white'>{this.state.message}</h3>{/*Error message display*/}
          <h3 className='text-white'>{this.state.error}</h3>
          {/*  Display shortened links*/}
          <div className='wrapper '>
            <div
              className='bg-navy-blue d-flex justify-content-around align-items-center  pl-3 text-white py-3 mt-3 border-bottom border-dark'>
              <p className='my-0 pl-5 text-pink'>Original</p>
              <p className='my-0 text-purple'>Shortened</p>
            </div>
            <DisplayUrl urls={this.state.arrayOfUrls}
                        fetchListOfUrls={this.fetchListOfUrls}/>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default Home
