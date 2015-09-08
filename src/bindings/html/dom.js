'use strict';

import { overlayElement } from './overlay';

const reHtml = /[&<>]/g;
const htmlEntities = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
};

export function setAttributes(element, id, args) {
  element.setAttribute('data-l10n-id', id);
  if (args) {
    element.setAttribute('data-l10n-args', JSON.stringify(args));
  }
}

export function getAttributes(element) {
  return {
    id: element.getAttribute('data-l10n-id'),
    args: JSON.parse(element.getAttribute('data-l10n-args'))
  };
}

function getTranslatables(element) {
  const nodes = Array.from(element.querySelectorAll('[data-l10n-id]'));

  if (typeof element.hasAttribute === 'function' &&
      element.hasAttribute('data-l10n-id')) {
    nodes.push(element);
  }

  return nodes;
}

export function translateMutations(view, langs, mutations) {
  const targets = new Set();

  for (let mutation of mutations) {
    switch (mutation.type) {
      case 'attributes':
        targets.add(mutation.target);
        break;
      case 'childList':
        for (let addedNode of mutation.addedNodes) {
          if (addedNode.nodeType === addedNode.ELEMENT_NODE) {
            if (addedNode.childElementCount) {
              getTranslatables(addedNode).forEach(targets.add.bind(targets));
            } else {
              targets.add(addedNode);
            }
          }
        }
        break;
    }
  }

  if (targets.size === 0) {
    return;
  }

  translateElements(view, langs, Array.from(targets));
}

export function translateFragment(view, langs, frag) {
  return translateElements(view, langs, getTranslatables(frag));
}

function getElementTranslation(view, langs, elem) {
  const id = elem.getAttribute('data-l10n-id');

  if (!id) {
    return false;
  }

  const args = elem.getAttribute('data-l10n-args');

  if (!args) {
    return view._resolveEntity(langs, id);
  }

  return view._resolveEntity(
    langs, id, JSON.parse(
      args.replace(reHtml, match => htmlEntities[match])));
}

export function translateElement(view, langs, elem) {
  return getElementTranslation(view, langs, elem).then(
    translation => applyTranslation(view, elem, translation));
}

function translateElements(view, langs, elements) {
  return Promise.all(
    elements.map(elem => getElementTranslation(view, langs, elem))).then(
      translations => applyTranslations(view, elements, translations));
}

function applyTranslation(view, elem, translation) {
  if (!translation) {
    return false;
  }

  view.disconnect();
  overlayElement(elem, translation);
  view.observe();
}

function applyTranslations(view, elems, translations) {
  view.disconnect();
  for (let i = 0; i < elems.length; i++) {
    if (translations[i] === false) {
      continue;
    }
    overlayElement(elems[i], translations[i]);
  }
  view.observe();
}
