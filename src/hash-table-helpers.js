// A special array class that can only store the number of items specified by the `limit` argument
class LimitedArray {
  constructor(limit) {
    // You should not be directly accessing this array from your hash table methods
    // Use the getter and setter methods included in this class to manipulate data in this class
    this.storage = [];
    this.limit = limit;
  }

  checkLimit(index) {
    if (typeof index !== 'number') throw new Error('The supplied index needs to be a number');
    if (this.limit <= index) {
      throw new Error('The supplied index lies out of the array\'s bounds');
    }
  }

  each(cb) {
    for (let i = 0; i < this.storage.length; i++) {
      cb(this.storage[i], i);
    }
  }
  // Use this getter function to fetch elements from this class
  get(index) {
    this.checkLimit(index);
    return this.storage[index];
  }

  get length() {
    return this.storage.length;
  }
  // Use this setter function to add elements to this class
  set(index, value) {
    this.checkLimit(index);
    this.storage[index] = value;
  }
}
/* eslint-disable no-bitwise, operator-assignment */
// This is hash function you'll be using to hash keys
// There's some bit-shifting magic going on here, but essentially, all it is doing is performing the modulo operator
// on the given `str` arg (the key) modded by the limit of the limited array
// This simply ensures that the hash function always returns an index that is within the boundaries of the limited array
const getIndexBelowMax = (str, max) => {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
    hash = hash & hash;
    hash = Math.abs(hash);
  }
  return hash % max;
};

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    // Do not modify anything inside of the constructor
  }
  // Wraps the given value in a node object and adds the node to the tail of the list
  // If the list is empty, the new element is considered the tail as well as the head
  // If there is one element in the list before the new element is added, the new element becomes the tail of the list
  addToTail(value) {
    // creates the node.
    const newNode = {
      next: null,
      value,
    };
    // checks if list is empty.
    if (!this.head) {
      // makes the node the head and tail.
      this.head = newNode;
      this.tail = newNode;
      return;
    }
    this.tail.next = newNode;
    this.tail = newNode;
  }
  // Removes the current head node from the list, replacing it with the next element in the list
  // Returns the value of the removed node
  removeHead() {
    const node = this.head;
    this.head = node.next;
    return node.value;
  }
  // Checks the linked list for the given value
  // Returns true if the the value is found in the list, false otherwise
  contains(value) {
    let checkNode = this.head;
    while (checkNode !== null) {
      if (checkNode.value === value) {
        return true;
      }
      checkNode = checkNode.next;
    }
    return false;
  }

  containsKey(key) { // realized .contains() only accepts values...
    if (!this.head) return false;
    const list = (checkNode) => {
      if (checkNode.value[0] === key) return true;
      if (checkNode.next === null) return false;
      return list(checkNode.next);
    };
    return list(this.head);
  }

  overwriteValue(key, newValue) { // same as containsKey. but also replaces with new value.
    if (this.head === null) return false;
    const list = (node) => {
      if (node.value[0] === key) {
        node.value[1] = newValue;
        return;
      }
      if (node.next === null) return false;
      return list(node.next);
    };
    return list(this.head);
  }

  returnValueIfContainsKey(key) {
    if (this.head === null) return undefined;
    const list = (node) => {
      if (node.value[0] === key) return node.value[1];
      if (node.next === null) return undefined;
      return list(node.next);
    };
    return list(this.head);
  }
}

module.exports = {
  LimitedArray,
  getIndexBelowMax,
  LinkedList,
};
