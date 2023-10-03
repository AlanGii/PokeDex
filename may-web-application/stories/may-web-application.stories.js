import { html } from 'lit';
import '../src/may-web-application.js';

export default {
  title: 'MayWebApplication',
  component: 'may-web-application',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

function Template({ header, backgroundColor }) {
  return html`
    <may-web-application
      style="--may-web-application-background-color: ${backgroundColor || 'white'}"
      .header=${header}
    >
    </may-web-application>
  `;
}

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
