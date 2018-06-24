import { connect } from 'react-redux';
import { IntlProvider } from 'react-intl';
import messages from './data/messages';
import flattenMessages from './utils/flattenMessages';

function mapStateToProps(state) {
  return {
    locale: state.player.language,
    messages: flattenMessages(messages[state.player.language]),
  };
}

export default connect(mapStateToProps)(IntlProvider);
