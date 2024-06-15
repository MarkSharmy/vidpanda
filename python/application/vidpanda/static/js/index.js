import Modal from "./components/Modal.js";
import EventBus from "./registry/events.js";
import { searchHandler, refreshComponents } from "./client/handlers.js";

const eventbus = new EventBus();

eventbus.subscribeEvent(searchHandler);
eventbus.subscribeEvent(refreshComponents)

document.addEventListener("DOMContentLoaded", () => {
  eventbus.registerEvents();
});

customElements.define("popup-modal", Modal);