import React, { Component } from 'react';
import { IntlProvider, addLocaleData } from 'react-intl';
import zhLocaleData from 'react-intl/locale-data/zh';
import translations from './i18n/locales';
import App from './App';

addLocaleData(zhLocaleData);
const defaultLocale = 'en';

class AppIntl extends Component {
  constructor(props) {
    super(props);

    this.state = {
      locale: this.getLocale()
    };
  }

  getLocale = () => {
    const locale = localStorage.getItem('app.locale');
    if (locale == null) {
      localStorage.setItem('app.locale', defaultLocale);
      return defaultLocale;
    }
    return locale;
  };

  handleChangeLocale = value => {
    localStorage.setItem('app.locale', value);
    this.setState({ locale: value });
  };

  render() {
    const { locale } = this.state;
    const messages = translations[locale];
    return (
      <IntlProvider locale={locale} key={locale} messages={messages} defaultLocale={defaultLocale}>
        <App handleChangeLocale={this.handleChangeLocale} />
      </IntlProvider>
    );
  }
}

export default AppIntl;
