import React, {Component} from 'react';
import * as Routes from "../utils/Routes";
import axios from 'axios'

import thumbtack from '../../assets/images/thumbtack-solid.svg'
import thumbtackPink from '../../assets/images/thumbtack-pink.svg'

class DisplayUrl extends Component {
  constructor(props) {
    super(props);
  }

  pinUrl = async (url) => {
    try {
      const response = await axios.patch(Routes.url_path(url), {url: url})

    } catch (error) {
      console.log(error)
    }
    this.props.fetchListOfUrls()
  }


  increaseClickCount = async (url) => {
    try {
      const response = await axios.put(Routes.url_path(url), {url: url}
      )
      console.log("response", response)
    } catch (error) {
      console.error(error);
    }
    this.props.fetchListOfUrls()
  }


  render() {
    console.log(this.props)
    const urls = this.props.urls
    const thumbtackStyle = {height: "20px", marginLeft: "10px"}

    return (
      <ul className='list-unstyled'>
        {urls && urls.map(url => {
          return (
            <li key={url.id}
                className='d-flex justify-content-between bg-navy-blue py-2 border-bottom border-dark '>
              <div className='w-7'>
                <img onClick={() => this.pinUrl(url.shortened)}
                     src={url.pinned ? thumbtackPink : thumbtack}
                     style={thumbtackStyle}/>
              </div>
              <div className='w-40'><
                a className='text-pink'
                  href={url.original} target="_blank">{url.original}</a>
              </div>
              <div className='w-40'>
                <a
                  onClick={() => this.increaseClickCount(url.shortened)}
                  className='text-purple'
                  href={`${Routes.hostname()}urls/${url.shortened}`}
                  target='_blank'
                >{`${Routes.hostname()}${url.shortened}`}</a>
              </div>
              <div className='text-white pr-3'>
                <p>
                  {url.click_count}
                </p>
              </div>
            </li>
          )
        })}
      </ul>
    )
      ;
  }
}

export default DisplayUrl;