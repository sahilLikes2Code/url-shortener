import React, {Component} from 'react';
import * as Routes from "../utils/Routes";
import {fetchApi} from "../utils/API";
import axios from 'axios'


class DisplayUrl extends Component {
  constructor(props) {
    super(props);
  }

  increaseClickCount = async (url) => {
    console.log('clickc')

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
    const urls = this.props.urls
    return (
      <ul className='list-unstyled'>
        {urls && urls.map(url => {
          return (
            <li key={url.id}
                className='d-flex justify-content-between bg-white py-2'>
              <div>
                <button>📌</button>
              </div>
              <div><a className='text-dark'
                      href={url.original} target="_blank">{url.original}</a>
              </div>
              <div><a
                onClick={() => this.increaseClickCount(url.shortened)}
                className='pl-5 text-dark'
                href={`${Routes.hostname()}urls/${url.shortened}`}
                target='_blank'
              >{`${Routes.hostname()}${url.shortened}`}</a>
              </div>
              <div>
                {url.click_count}
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