import ProjectStore from './ProjectsStore';
import LanguageTypeStore from './LanguageTypeStore';
import SiteStore from './SitesStore';
import LanguageStore from './LanguagesStore';
import ModalStore from './ModalsStore';
class RootStore {
  constructor() {
    this.projectStore = new ProjectStore(this);
    this.languageTypeStore = new LanguageTypeStore(this);
    this.siteStore = new SiteStore(this);
    this.languageStore = new LanguageStore(this);
    this.modalStore = new ModalStore(this);
  }
}
export default new RootStore();