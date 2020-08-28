import React from "react"
import '../../../assets/stylesheets/application.css'
import {fetchApi} from "../../utils/API";
import * as Routes from "../../utils/Routes";
import DisplayUrl from "../DisplayUrl";

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      url: {
        original: ""
      }
    }
  }

  handleChange = ({target: {name, value}}) => {
    // user: {...this.state.user, [name]: value},
    // ...this.state, [name]: value
    this.setState({
      url: {...this.state.url, [name]: value}
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    fetchApi({
      url: Routes.url_path(),
      method: "POST",
      body: {
        url: this.state.url,
      },
      onError: () => {
        this.setState({
          errors: ['Invalid credentials, Please try again'],
          type: 'danger',
        });
        // window.location.href = Routes.login_path()
        // setTimeout(function (){window.location.href = Routes.login_path();}, 2000)
      },
      onSuccess: (response) => {
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        // window.location.href = Routes.polls_path()
      },
    });
  };

  componentDidMount() {
    fetchApi({
      url: Routes.url_path(),
      method: "GET",
      // body: {
      //   url: this.state.url,
      // },
      onError: () => {
        this.setState({
          errors: ['Invalid credentials, Please try again'],
          type: 'danger',
        });
        // window.location.href = Routes.login_path()
        // setTimeout(function (){window.location.href = Routes.login_path();}, 2000)
      },
      onSuccess: (response) => {
        console.log(response)
        console.log('ressspspfdsf')
        this.setState({message: response.messages});
      },
      successCallBack: () => {
        // window.location.href = Routes.polls_path()
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <React.Fragment>
        {/*navbar*/}
        <nav className='bg-light'>
          <div className='wrapper py-2'>
            <h1>Url Muncher</h1>
          </div>
        </nav>

        {/*  search bar*/}
        <section>
          <div className='wrapper py-3'>
            <form onSubmit={this.handleSubmit}>
              <input type='text'
                     name='original'
                     id='original'
                     className='w-75'
                     placeholder='Enter a URL to shorten'
                     onChange={this.handleChange}/>
              <button className='w-25'>Submit</button>
            </form>
          </div>
        </section>

        {/*  Display shortened links*/}
        <DisplayUrl/>

      </React.Fragment>
    );
  }
}

export default Home
