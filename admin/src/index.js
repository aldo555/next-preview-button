import { PreviewButton } from './components/PreviewButton';

export default {
  register(app) {
  },
  bootstrap(app) {
    app.getPlugin('content-manager').apis.addEditViewSidePanel([PreviewButton])
  },
};
