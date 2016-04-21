class Node {
  constructor() {}
}

class Resource extends Node {
  constructor() {
    super();
    this.type = 'Resource';
    this.body = [];
  }
}

class Entry extends Node {
  constructor() {
    super();
    this.type = 'Entry';
  }
}

class Identifier extends Node {
  constructor(name, namespace = null) {
    super();
    this.type = 'Identifier';
    this.name = name;
    this.namespace = namespace;
  }
}

class Section extends Node {
  constructor(name, comment = null) {
    super();
    this.type = 'Section';
    this.name = name;
    this.comment = comment;
  }
}

class Pattern extends Node {
  constructor(source, elements) {
    super();
    this.type = 'Pattern';
    this.source = source;
    this.elements = elements;
  }
}

class Member extends Node {
  constructor(key, value, def = false) {
    super();
    this.type = 'Member';
    this.key = key;
    this.value = value;
    this.default = def;
  }
}

class Entity extends Entry {
  constructor(id, value = null, traits = [], comment = null) {
    super();
    this.type = 'Entity';
    this.id = id;
    this.value = value;
    this.traits = traits;
    this.comment = comment;
  }
}

class Placeable extends Node {
  constructor(expressions) {
    super();
    this.type = 'Placeable';
    this.expressions = expressions;
  }
}

class SelectExpression extends Node {
  constructor(expression, variants = null) {
    super();
    this.type = 'SelectExpression';
    this.expression = expression;
    this.variants = variants;
  }
}

class MemberExpression extends Node {
  constructor(obj, keyword) {
    super();
    this.type = 'MemberExpression';
    this.object = obj;
    this.keyword = keyword;
  }
}

class CallExpression extends Node {
  constructor(callee, args) {
    super();
    this.type = 'CallExpression';
    this.callee = callee;
    this.args = args;
  }
}

class ExternalArgument extends Node {
  constructor(name) {
    super();
    this.type = 'ExternalArgument';
    this.name = name;
  }
}

class KeyValueArg extends Node {
  constructor(name, value) {
    super();
    this.type = 'KeyValueArg';
    this.name = name;
    this.value = value;
  }
}

class EntityReference extends Identifier {
  constructor(name, namespace) {
    super();
    this.type = 'EntityReference';
    this.name = name;
    this.namespace = namespace;
  }
}

class BuiltinReference extends Identifier {
  constructor(name, namespace) {
    super();
    this.type = 'BuiltinReference';
    this.name = name;
    this.namespace = namespace;
  }
}

class Keyword extends Identifier {
  constructor(name, namespace=null) {
    super();
    this.type = 'Keyword';
    this.name = name;
    this.namespace = namespace;
  }
}

class Number extends Node {
  constructor(value) {
    super();
    this.type = 'Number';
    this.value = value;
  }
}

class TextElement extends Node {
  constructor(value) {
    super();
    this.type = 'TextElement';
    this.value = value;
  }
}

class Comment extends Node {
  constructor(content) {
    super();
    this.type = 'Comment';
    this.content = content;
  }
}

class JunkEntry extends Entry {
  constructor(content) {
    super();
    this.type = 'JunkEntry';
    this.content = content;
  }
}

export default {
  Node,
  Pattern,
  Member,
  Identifier,
  Entity,
  Section,
  Resource,
  Placeable,
  SelectExpression,
  MemberExpression,
  CallExpression,
  ExternalArgument,
  KeyValueArg,
  Number,
  EntityReference,
  BuiltinReference,
  Keyword,
  TextElement,
  Comment,
  JunkEntry
};