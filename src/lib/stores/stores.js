import { writable } from 'svelte/store';
import { browser } from "$app/environment"

function createPersistentStore(key, startValue) {
  // Starting with some default initial value
  const initialValue = startValue;

  const store = writable(initialValue, () => {
    if (browser) {
      const storedValue = localStorage.getItem(key);
      if (storedValue !== null) {
        store.set(JSON.parse(storedValue));
      }

      const unsubscribe = store.subscribe(value => {
        localStorage.setItem(key, JSON.stringify(value));
      });

      // return a cleanup function that stops the subscription
      return unsubscribe;
    }
  });

  return store;
}

export const sidebarVisible = createPersistentStore('sidebarVisible', false);