import React, {Component} from 'react';

class DisplayUrl extends Component {

  // componentDidMount() {
  //   fetchApi({
  //     url: Routes.url_path(),
  //     method: "GET",
  //     // body: {
  //     //   url: this.state.url,
  //     // },
  //     onError: () => {
  //       this.setState({
  //         errors: ['Invalid credentials, Please try again'],
  //         type: 'danger',
  //       });
  //       // window.location.href = Routes.login_path()
  //       // setTimeout(function (){window.location.href = Routes.login_path();}, 2000)
  //     },
  //     onSuccess: (response) => {
  //       this.setState({message: response.messages});
  //     },
  //     successCallBack: () => {
  //       // window.location.href = Routes.polls_path()
  //     }
  //   })
  // }

  render() {

    return (
      <div>
        I will display urls here
      </div>
    );
  }
}

export default DisplayUrl;