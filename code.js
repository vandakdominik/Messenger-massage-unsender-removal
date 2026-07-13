//wait time between certain actions (if its not working properly because of slower pc/internet increasing it might help)
const SHORT_DELAY = 200;
const MEDIUM_DELAY = 500;
const LONG_DELAY = 1000;

let isRunning = false

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function __getLastMessageMoreIcon() {
  const elements = document.querySelectorAll('div[aria-label="More actions"]')
  const lastElement = elements[elements.length - 1]
  return lastElement
}

async function __unsendMessage() {
  //picks which one is possible my change (selectors for unsent buttond(for my) / remove button(for 2nd person) in the 3 dot menu(burger) menu)
  const element1 = document.querySelector('div[aria-label="Remove message"]');
  const element2 = document.querySelector('div[aria-label="Unsend message"]');
  const element = element1 ? element1 : element2;
  if (element) {
    await sleep(SHORT_DELAY);
    element.click();
    await sleep(SHORT_DELAY);
    const removeButton = await __getRemoveButton();
    await sleep(SHORT_DELAY);
    removeButton.click();
  }
}

async function __findElementsByAriaLabel(label) {
  const elements = document.querySelectorAll(`[aria-label="${label}"]`);
  return Array.from(elements);
}

async function __getRemoveButton() {
  const elems = Array.from(await __findElementsByAriaLabel("Remove"))
  if (elems.length === 0) {
    console.warn("No remove button found")
    return
  }
  for (let i = 0; i < elems.length; i++) {
    const elem = elems[i]
    if (elem.ariaDisabled === 'true') {
      continue
    }
    if (elem.textContent === "Remove") {
      return elem
    }
  }
}

async function __triggerMouseHover(element) {
  const mouseOverEvent = new MouseEvent('mouseover', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(mouseOverEvent);
}

async function __triggerMouseHoverExit(element) {
  const mouseOutEvent = new MouseEvent('mouseout', {
    bubbles: true,
    cancelable: true,
    view: window,
  });
  element.dispatchEvent(mouseOutEvent);
}

async function __unsendLastMessage() {
  await sleep(SHORT_DELAY)
  const moreIcon = await __getLastMessageMoreIcon()
  moreIcon.click()
  await sleep(SHORT_DELAY)
  await __unsendMessage()
  await sleep(SHORT_DELAY)
}

async function deleteLastMessage() {
  await sleep(SHORT_DELAY)

  let elems = await getAllMessageElements()
  console.log(elems)

  let lastElement = elems[elems.length - 1]
  const lastElementText = lastElement?.textContent || ""
  console.log("lastElement: ", lastElement)

  const children = []
  lastElement.childNodes.forEach((childNode) => {
    children.push(childNode)
  })

  const targetElements = [lastElement].concat(...children)
  console.log("targetElements: ", targetElements)

  targetElements.forEach(async (elem) => {
    try {
      await __triggerMouseHover(elem)
    } catch { }
  })

  await sleep(SHORT_DELAY)

  try {
    await __unsendLastMessage()
  } catch (e) {
    console.log("error", e)
  }
  await sleep(SHORT_DELAY);


  targetElements.forEach(async (elem) => {
    try {
      await __triggerMouseHoverExit(elem)
    } catch { }
  })

  await sleep(MEDIUM_DELAY)

  elems = await getAllMessageElements()
  const newLastElement = elems[elems.length - 1]

  //removes element from dom (will still be there if you refresh the page) 
  if (lastElement === newLastElement && lastElementText === newLastElement.textContent) {
    lastElement?.remove()
  }

  await sleep(SHORT_DELAY)

}

async function getAllMessageElements() {
  const elems = document.querySelectorAll('div[aria-roledescription="message"]');
  if(elems === 0) {
    throw "could not find any messages";
  }
  return Array.from(elems)
}

async function removeErrorMessages() {
  // get all DOM elements <div role="presentation">
  const elems = Array.from(document.querySelectorAll('div[role="presentation"]'))
  elems.forEach(async (elem) => {
    if (elem && elem.textContent === 'Error displaying this message') {
      elem?.remove()
      await sleep(SHORT_DELAY)
    }
  })
}

async function Main() {
  isRunning = true
  console.log("Starting... to stop, issue `isRunning = false`")
  while (isRunning) {

    if((await getAllMessageElements()).length === 0) {
      isRunning = false;
      break;
    }

    try {
      console.count("Deleting last message")
      await deleteLastMessage()
    } catch (e) {
      console.log(e)
    }
    await sleep(SHORT_DELAY)
    await removeErrorMessages()
  }
  console.log("Done!")
}

//starts the removal
Main();

//before running recommend to look into README
