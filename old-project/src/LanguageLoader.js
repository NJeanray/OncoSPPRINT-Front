import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { BrowserRouter } from 'react-router-dom'

import axios from 'axios'

import App from './App'

const AVAILABLE_LANGUAGES = {
  en: 'en.json',
  fr: 'fr.json'
}

class LanguageLoader extends Component {
  constructor() {
    super()

    this.state = {
      language: this.getLanguage()
    }

    this.setLanguage = this.setLanguage.bind(this)
    this.getIntlMessages = namespace => this.state.messages[namespace]
  }

  getLanguage() {
    return (
      navigator.languages.reduce((res, language) => {
        if (res) return res

        const l = language.split('-')[0]
        if (AVAILABLE_LANGUAGES[l]) return l

        return res
      }, null) || 'en'
    )
  }

  setLanguage(language) {
    if (AVAILABLE_LANGUAGES[language]) {
      this.setState({ language, messages: null })
      this.loadLanguage(language)
    }
  }

  componentWillMount() {
    this.loadLanguage(this.state.language)
  }

  loadLanguage(language) {
    axios
      .get(`/i18n/${AVAILABLE_LANGUAGES[language]}`)
      .then(r => this.setState({ messages: r.data }))
      .catch(e => this.setState({ error: e }))
  }

  render() {
    if (!this.state.messages) {
      return <div className="spinner">Loading...</div>
    }
    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages.home}>
        <BrowserRouter>
          <App getIntlMessages={this.getIntlMessages} setLanguage={this.setLanguage} />
        </BrowserRouter>
      </IntlProvider>
    )
  }
}

export default LanguageLoader
