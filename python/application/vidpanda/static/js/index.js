import EventBus from "./registry/events.js";
import { closeModalHandler,
        downloadHandler,
      openModalHandler,
     playlistHandler,
  searchHandler,
refreshComponents } from "./client/handlers.js";

const eventbus = new EventBus();

eventbus.subscribeEvent(searchHandler);
eventbus.subscribeEvent(openModalHandler);
eventbus.subscribeEvent(closeModalHandler);
eventbus.subscribeEvent(downloadHandler);
eventbus.subscribeEvent(playlistHandler);
eventbus.subscribeEvent(refreshComponents)

document.addEventListener("DOMContentLoaded", () => {
  eventbus.registerEvents();
});