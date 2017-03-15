// import getUrls from 'get-urls';
import { BlockEmbed } from '../blots/block';
import Link from '../formats/link';

const ATTRIBUTES = [
  'height',
  'width'
];

const log = null;

class OEmbed extends BlockEmbed {
  constructor(props) {
    super(props);
    log();
  }

  static create(value) {
    const node = super.create(value);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', true);
    node.setAttribute('src', this.sanitize(value));
    return node;
  }

  static formats(domNode) {
    return ATTRIBUTES.reduce((formats, attribute) => {
      if (domNode.hasAttribute(attribute)) {
        formats[attribute] = domNode.getAttribute(attribute);
      }
      return formats;
    }, {});
  }

  static sanitize(url) {
    return Link.sanitize(url);
  }

  static value(domNode) {
    return domNode.getAttribute('src');
  }

  format(name, value) {
    log('FORMATTING EMBED', name, value);
    if (ATTRIBUTES.indexOf(name) > -1) {
      if (value) {
        this.domNode.setAttribute(name, value);
      } else {
        this.domNode.removeAttribute(name);
      }
    } else {
      super.format(name, value);
    }
  }
}
OEmbed.blotName = 'OEmbed';
OEmbed.className = 'ql-OEmbed';
OEmbed.tagName = 'DIV';

export default OEmbed;
