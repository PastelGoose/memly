import React, { PropTypes, Component } from 'react'
import { Router, Route, hashHistory, IndexRoute, Link } from 'react-router'
import shallowCompare from 'react-addons-shallow-compare'
import controllable from 'react-controllables' //need to look into use for this... allows you to control prop types somehow...
import GoogleMap from 'google-map-react'
import update from 'react-addons-update'
import axios from 'axios'
import { connect } from 'react-redux'
import store from '../../../App'
import TitlePresentation from './presentation.js'

class Title2Container extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    var dani = this.props.selection
    console.log('userReducer', dani)
  }

  submit(e) {
    console.log('in submit')
    this.props.dispatch({
        type: 'SELECTED_MEMLYS', 
        selection: this.props.selection
    })
    
  }

  addCaption(e, url, order) {
    var page = this.props.selection[order];
    page.caption = e.target.value;
  }

  render() {

    return(

      <div>
          {this.props.selection && this.props.selection.map(page=> <TitlePresentation url={page.imgUrl} order={page.order} caption= {page.caption}/>)}
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    selection: state.userReducer.selection
  }
}

export default connect(mapStateToProps)(Title2Container)

