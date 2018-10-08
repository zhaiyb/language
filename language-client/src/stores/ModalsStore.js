import { observable, action } from "mobx";
import axios from 'axios';
import URL from "../constants/URL";

export default class Modals {
  constructor(rootStore) {
    this.rootStore = rootStore
  }

  @observable newProject;
  @observable newSite;
  @observable newPrimary;

  @action
  hideModal(modalName) {
    this[modalName] = false;
  }

  @action
  showModal(modalName) {
    this[modalName] = true;
  }


}