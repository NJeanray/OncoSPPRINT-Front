import React, { Component } from 'react'
import { IntlProvider } from 'react-intl'
import { addLocaleData } from 'react-intl'
import en from 'react-intl/locale-data/en'
import fr from 'react-intl/locale-data/fr'
import axios from 'axios'

import App from 'app/components/App'
import { consoleLog, handlePromiseError } from 'lib/utils'

const AVAILABLE_LANGUAGES = {
  en: 'en.json',
  fr: 'fr.json'
}

addLocaleData([...en, ...fr])

class MainI18n extends Component {
  constructor(props) {
    super(props)

    this.state = {
      language: this.getLanguage()
    }

    this.setLanguage = this.setLanguage.bind(this)
    this.getIntlMessages = namespace => this.state.messages[namespace]
  }

  componentWillMount() {
    this.loadLanguage(this.state.language)
  }

  getLanguage = () => {
    return (
      navigator.languages.reduce((res, language) => {
        if (res) return res

        const l = language.split('-')[0]
        if (AVAILABLE_LANGUAGES[l]) return l

        return res
      }, null) || 'en'
    )
  }

  setLanguage = language => {
    if (AVAILABLE_LANGUAGES[language]) {
      this.setState({ language, messages: null })
      this.loadLanguage(language)
    }
  }

  async loadLanguage(language) {
    const response = await handlePromiseError(
      axios.get,
      consoleLog
    )(`/i18n/${AVAILABLE_LANGUAGES[language]}`)
    this.setState({ messages: response.data })
  }

  render() {
    if (!this.state.messages) return <div className="spinner">Loading...</div>

    return (
      <IntlProvider locale={this.state.language} messages={this.state.messages.common}>
        <App getIntlMessages={this.getIntlMessages} setLanguage={this.setLanguage} />
      </IntlProvider>
    )
  }
}

export default MainI18n
