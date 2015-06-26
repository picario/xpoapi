var Collections;
(function (Collections) {
    

    

    

    function defaultCompare(a, b) {
        if (a < b) {
            return -1;
        } else if (a === b) {
            return 0;
        } else {
            return 1;
        }
    }
    Collections.defaultCompare = defaultCompare;

    function defaultEquals(a, b) {
        return a === b;
    }
    Collections.defaultEquals = defaultEquals;

    function defaultToString(item) {
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (Collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (Collections.isString(item)) {
            return item;
        } else {
            return item.toString();
        }
    }
    Collections.defaultToString = defaultToString;

    function makeString(item, join) {
        if (typeof join === "undefined") { join = ","; }
        if (item === null) {
            return 'COLLECTION_NULL';
        } else if (Collections.isUndefined(item)) {
            return 'COLLECTION_UNDEFINED';
        } else if (Collections.isString(item)) {
            return item.toString();
        } else {
            var toret = "{";
            var first = true;
            for (var prop in item) {
                if (item.hasOwnProperty(prop)) {
                    if (first)
                        first = false;
                    else
                        toret = toret + join;
                    toret = toret + prop + ":" + item[prop];
                }
            }
            return toret + "}";
        }
    }
    Collections.makeString = makeString;

    function isFunction(func) {
        return (typeof func) === 'function';
    }
    Collections.isFunction = isFunction;

    function isUndefined(obj) {
        return (typeof obj) === 'undefined';
    }
    Collections.isUndefined = isUndefined;

    function isString(obj) {
        return Object.prototype.toString.call(obj) === '[object String]';
    }
    Collections.isString = isString;

    function reverseCompareFunction(compareFunction) {
        if (!Collections.isFunction(compareFunction)) {
            return function (a, b) {
                if (a < b) {
                    return 1;
                } else if (a === b) {
                    return 0;
                } else {
                    return -1;
                }
            };
        } else {
            return function (d, v) {
                return compareFunction(d, v) * -1;
            };
        }
    }
    Collections.reverseCompareFunction = reverseCompareFunction;

    function compareToEquals(compareFunction) {
        return function (a, b) {
            return compareFunction(a, b) === 0;
        };
    }
    Collections.compareToEquals = compareToEquals;

    (function (arrays) {
        function indexOf(array, item, equalsFunction) {
            var equals = equalsFunction || Collections.defaultEquals;
            var length = array.length;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.indexOf = indexOf;

        function lastIndexOf(array, item, equalsFunction) {
            var equals = equalsFunction || Collections.defaultEquals;
            var length = array.length;
            for (var i = length - 1; i >= 0; i--) {
                if (equals(array[i], item)) {
                    return i;
                }
            }
            return -1;
        }
        arrays.lastIndexOf = lastIndexOf;

        function contains(array, item, equalsFunction) {
            return arrays.indexOf(array, item, equalsFunction) >= 0;
        }
        arrays.contains = contains;

        function remove(array, item, equalsFunction) {
            var index = arrays.indexOf(array, item, equalsFunction);
            if (index < 0) {
                return false;
            }
            array.splice(index, 1);
            return true;
        }
        arrays.remove = remove;

        function frequency(array, item, equalsFunction) {
            var equals = equalsFunction || Collections.defaultEquals;
            var length = array.length;
            var freq = 0;
            for (var i = 0; i < length; i++) {
                if (equals(array[i], item)) {
                    freq++;
                }
            }
            return freq;
        }
        arrays.frequency = frequency;

        function equals(array1, array2, equalsFunction) {
            var equals = equalsFunction || Collections.defaultEquals;

            if (array1.length !== array2.length) {
                return false;
            }
            var length = array1.length;
            for (var i = 0; i < length; i++) {
                if (!equals(array1[i], array2[i])) {
                    return false;
                }
            }
            return true;
        }
        arrays.equals = equals;

        function copy(array) {
            return array.concat();
        }
        arrays.copy = copy;

        function swap(array, i, j) {
            if (i < 0 || i >= array.length || j < 0 || j >= array.length) {
                return false;
            }
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
            return true;
        }
        arrays.swap = swap;

        function toString(array) {
            return '[' + array.toString() + ']';
        }
        arrays.toString = toString;

        function forEach(array, callback) {
            var lenght = array.length;
            for (var i = 0; i < lenght; i++) {
                if (callback(array[i]) === false) {
                    return;
                }
            }
        }
        arrays.forEach = forEach;
    })(Collections.arrays || (Collections.arrays = {}));
    var arrays = Collections.arrays;

    

    var LinkedList = (function () {
        function LinkedList() {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        }
        LinkedList.prototype.add = function (item, index) {
            if (Collections.isUndefined(index)) {
                index = this.nElements;
            }
            if (index < 0 || index > this.nElements || Collections.isUndefined(item)) {
                return false;
            }
            var newNode = this.createNode(item);
            if (this.nElements === 0) {
                this.firstNode = newNode;
                this.lastNode = newNode;
            } else if (index === this.nElements) {
                this.lastNode.next = newNode;
                this.lastNode = newNode;
            } else if (index === 0) {
                newNode.next = this.firstNode;
                this.firstNode = newNode;
            } else {
                var prev = this.nodeAtIndex(index - 1);
                newNode.next = prev.next;
                prev.next = newNode;
            }
            this.nElements++;
            return true;
        };

        LinkedList.prototype.first = function () {
            if (this.firstNode !== null) {
                return this.firstNode.element;
            }
            return undefined;
        };

        LinkedList.prototype.last = function () {
            if (this.lastNode !== null) {
                return this.lastNode.element;
            }
            return undefined;
        };

        LinkedList.prototype.elementAtIndex = function (index) {
            var node = this.nodeAtIndex(index);
            if (node === null) {
                return undefined;
            }
            return node.element;
        };

        LinkedList.prototype.indexOf = function (item, equalsFunction) {
            var equalsF = equalsFunction || Collections.defaultEquals;
            if (Collections.isUndefined(item)) {
                return -1;
            }
            var currentNode = this.firstNode;
            var index = 0;
            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    return index;
                }
                index++;
                currentNode = currentNode.next;
            }
            return -1;
        };

        LinkedList.prototype.contains = function (item, equalsFunction) {
            return (this.indexOf(item, equalsFunction) >= 0);
        };

        LinkedList.prototype.remove = function (item, equalsFunction) {
            var equalsF = equalsFunction || Collections.defaultEquals;
            if (this.nElements < 1 || Collections.isUndefined(item)) {
                return false;
            }
            var previous = null;
            var currentNode = this.firstNode;

            while (currentNode !== null) {
                if (equalsF(currentNode.element, item)) {
                    if (currentNode === this.firstNode) {
                        this.firstNode = this.firstNode.next;
                        if (currentNode === this.lastNode) {
                            this.lastNode = null;
                        }
                    } else if (currentNode === this.lastNode) {
                        this.lastNode = previous;
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    } else {
                        previous.next = currentNode.next;
                        currentNode.next = null;
                    }
                    this.nElements--;
                    return true;
                }
                previous = currentNode;
                currentNode = currentNode.next;
            }
            return false;
        };

        LinkedList.prototype.clear = function () {
            this.firstNode = null;
            this.lastNode = null;
            this.nElements = 0;
        };

        LinkedList.prototype.equals = function (other, equalsFunction) {
            var eqF = equalsFunction || Collections.defaultEquals;
            if (!(other instanceof Collections.LinkedList)) {
                return false;
            }
            if (this.size() !== other.size()) {
                return false;
            }
            return this.equalsAux(this.firstNode, other.firstNode, eqF);
        };

        LinkedList.prototype.equalsAux = function (n1, n2, eqF) {
            while (n1 !== null) {
                if (!eqF(n1.element, n2.element)) {
                    return false;
                }
                n1 = n1.next;
                n2 = n2.next;
            }
            return true;
        };

        LinkedList.prototype.removeElementAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return undefined;
            }
            var element;
            if (this.nElements === 1) {
                element = this.firstNode.element;
                this.firstNode = null;
                this.lastNode = null;
            } else {
                var previous = this.nodeAtIndex(index - 1);
                if (previous === null) {
                    element = this.firstNode.element;
                    this.firstNode = this.firstNode.next;
                } else if (previous.next === this.lastNode) {
                    element = this.lastNode.element;
                    this.lastNode = previous;
                }
                if (previous !== null) {
                    element = previous.next.element;
                    previous.next = previous.next.next;
                }
            }
            this.nElements--;
            return element;
        };

        LinkedList.prototype.forEach = function (callback) {
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                if (callback(currentNode.element) === false) {
                    break;
                }
                currentNode = currentNode.next;
            }
        };

        LinkedList.prototype.reverse = function () {
            var previous = null;
            var current = this.firstNode;
            var temp = null;
            while (current !== null) {
                temp = current.next;
                current.next = previous;
                previous = current;
                current = temp;
            }
            temp = this.firstNode;
            this.firstNode = this.lastNode;
            this.lastNode = temp;
        };

        LinkedList.prototype.toArray = function () {
            var array = [];
            var currentNode = this.firstNode;
            while (currentNode !== null) {
                array.push(currentNode.element);
                currentNode = currentNode.next;
            }
            return array;
        };

        LinkedList.prototype.size = function () {
            return this.nElements;
        };

        LinkedList.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };

        LinkedList.prototype.toString = function () {
            return Collections.arrays.toString(this.toArray());
        };

        LinkedList.prototype.nodeAtIndex = function (index) {
            if (index < 0 || index >= this.nElements) {
                return null;
            }
            if (index === (this.nElements - 1)) {
                return this.lastNode;
            }
            var node = this.firstNode;
            for (var i = 0; i < index; i++) {
                node = node.next;
            }
            return node;
        };

        LinkedList.prototype.createNode = function (item) {
            return {
                element: item,
                next: null
            };
        };
        return LinkedList;
    })();
    Collections.LinkedList = LinkedList;

    

    var Dictionary = (function () {
        function Dictionary(toStrFunction) {
            this.table = {};
            this.nElements = 0;
            this.toStr = toStrFunction || Collections.defaultToString;
        }
        Dictionary.prototype.getValue = function (key) {
            var pair = this.table[this.toStr(key)];
            if (Collections.isUndefined(pair)) {
                return undefined;
            }
            return pair.value;
        };

        Dictionary.prototype.setValue = function (key, value) {
            if (Collections.isUndefined(key) || Collections.isUndefined(value)) {
                return undefined;
            }

            var ret;
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (Collections.isUndefined(previousElement)) {
                this.nElements++;
                ret = undefined;
            } else {
                ret = previousElement.value;
            }
            this.table[k] = {
                key: key,
                value: value
            };
            return ret;
        };

        Dictionary.prototype.remove = function (key) {
            var k = this.toStr(key);
            var previousElement = this.table[k];
            if (!Collections.isUndefined(previousElement)) {
                delete this.table[k];
                this.nElements--;
                return previousElement.value;
            }
            return undefined;
        };

        Dictionary.prototype.keys = function () {
            var array = [];
            for (var name in this.table) {
                if (this.table.hasOwnProperty(name)) {
                    var pair = this.table[name];
                    array.push(pair.key);
                }
            }
            return array;
        };

        Dictionary.prototype.values = function () {
            var array = [];
            for (var name in this.table) {
                if (this.table.hasOwnProperty(name)) {
                    var pair = this.table[name];
                    array.push(pair.value);
                }
            }
            return array;
        };

        Dictionary.prototype.forEach = function (callback) {
            for (var name in this.table) {
                if (this.table.hasOwnProperty(name)) {
                    var pair = this.table[name];
                    var ret = callback(pair.key, pair.value);
                    if (ret === false) {
                        return;
                    }
                }
            }
        };

        Dictionary.prototype.containsKey = function (key) {
            return !Collections.isUndefined(this.getValue(key));
        };

        Dictionary.prototype.clear = function () {
            this.table = {};
            this.nElements = 0;
        };

        Dictionary.prototype.size = function () {
            return this.nElements;
        };

        Dictionary.prototype.isEmpty = function () {
            return this.nElements <= 0;
        };

        Dictionary.prototype.toString = function () {
            var toret = "{";
            this.forEach(function (k, v) {
                toret = toret + "\n\t" + k.toString() + " : " + v.toString();
            });
            return toret + "\n}";
        };
        return Dictionary;
    })();
    Collections.Dictionary = Dictionary;

    var MultiDictionary = (function () {
        function MultiDictionary(toStrFunction, valuesEqualsFunction, allowDuplicateValues) {
            if (typeof allowDuplicateValues === "undefined") { allowDuplicateValues = false; }
            this.dict = new Dictionary(toStrFunction);
            this.equalsF = valuesEqualsFunction || Collections.defaultEquals;
            this.allowDuplicate = allowDuplicateValues;
        }
        MultiDictionary.prototype.getValue = function (key) {
            var values = this.dict.getValue(key);
            if (Collections.isUndefined(values)) {
                return [];
            }
            return Collections.arrays.copy(values);
        };

        MultiDictionary.prototype.setValue = function (key, value) {
            if (Collections.isUndefined(key) || Collections.isUndefined(value)) {
                return false;
            }
            if (!this.containsKey(key)) {
                this.dict.setValue(key, [value]);
                return true;
            }
            var array = this.dict.getValue(key);
            if (!this.allowDuplicate) {
                if (Collections.arrays.contains(array, value, this.equalsF)) {
                    return false;
                }
            }
            array.push(value);
            return true;
        };

        MultiDictionary.prototype.remove = function (key, value) {
            if (Collections.isUndefined(value)) {
                var v = this.dict.remove(key);
                return !Collections.isUndefined(v);
            }
            var array = this.dict.getValue(key);
            if (Collections.arrays.remove(array, value, this.equalsF)) {
                if (array.length === 0) {
                    this.dict.remove(key);
                }
                return true;
            }
            return false;
        };

        MultiDictionary.prototype.keys = function () {
            return this.dict.keys();
        };

        MultiDictionary.prototype.values = function () {
            var values = this.dict.values();
            var array = [];
            for (var i = 0; i < values.length; i++) {
                var v = values[i];
                for (var j = 0; j < v.length; j++) {
                    array.push(v[j]);
                }
            }
            return array;
        };

        MultiDictionary.prototype.containsKey = function (key) {
            return this.dict.containsKey(key);
        };

        MultiDictionary.prototype.clear = function () {
            this.dict.clear();
        };

        MultiDictionary.prototype.size = function () {
            return this.dict.size();
        };

        MultiDictionary.prototype.isEmpty = function () {
            return this.dict.isEmpty();
        };
        return MultiDictionary;
    })();
    Collections.MultiDictionary = MultiDictionary;

    var Heap = (function () {
        function Heap(compareFunction) {
            this.data = [];
            this.compare = compareFunction || Collections.defaultCompare;
        }
        Heap.prototype.leftChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 1;
        };

        Heap.prototype.rightChildIndex = function (nodeIndex) {
            return (2 * nodeIndex) + 2;
        };

        Heap.prototype.parentIndex = function (nodeIndex) {
            return Math.floor((nodeIndex - 1) / 2);
        };

        Heap.prototype.minIndex = function (leftChild, rightChild) {
            if (rightChild >= this.data.length) {
                if (leftChild >= this.data.length) {
                    return -1;
                } else {
                    return leftChild;
                }
            } else {
                if (this.compare(this.data[leftChild], this.data[rightChild]) <= 0) {
                    return leftChild;
                } else {
                    return rightChild;
                }
            }
        };

        Heap.prototype.siftUp = function (index) {
            var parent = this.parentIndex(index);
            while (index > 0 && this.compare(this.data[parent], this.data[index]) > 0) {
                Collections.arrays.swap(this.data, parent, index);
                index = parent;
                parent = this.parentIndex(index);
            }
        };

        Heap.prototype.siftDown = function (nodeIndex) {
            var min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));

            while (min >= 0 && this.compare(this.data[nodeIndex], this.data[min]) > 0) {
                Collections.arrays.swap(this.data, min, nodeIndex);
                nodeIndex = min;
                min = this.minIndex(this.leftChildIndex(nodeIndex), this.rightChildIndex(nodeIndex));
            }
        };

        Heap.prototype.peek = function () {
            if (this.data.length > 0) {
                return this.data[0];
            } else {
                return undefined;
            }
        };

        Heap.prototype.add = function (element) {
            if (Collections.isUndefined(element)) {
                return undefined;
            }
            this.data.push(element);
            this.siftUp(this.data.length - 1);
            return true;
        };

        Heap.prototype.removeRoot = function () {
            if (this.data.length > 0) {
                var obj = this.data[0];
                this.data[0] = this.data[this.data.length - 1];
                this.data.splice(this.data.length - 1, 1);
                if (this.data.length > 0) {
                    this.siftDown(0);
                }
                return obj;
            }
            return undefined;
        };

        Heap.prototype.contains = function (element) {
            var equF = Collections.compareToEquals(this.compare);
            return Collections.arrays.contains(this.data, element, equF);
        };

        Heap.prototype.size = function () {
            return this.data.length;
        };

        Heap.prototype.isEmpty = function () {
            return this.data.length <= 0;
        };

        Heap.prototype.clear = function () {
            this.data.length = 0;
        };

        Heap.prototype.forEach = function (callback) {
            Collections.arrays.forEach(this.data, callback);
        };
        return Heap;
    })();
    Collections.Heap = Heap;

    var Stack = (function () {
        function Stack() {
            this.list = new LinkedList();
        }
        Stack.prototype.push = function (elem) {
            return this.list.add(elem, 0);
        };

        Stack.prototype.add = function (elem) {
            return this.list.add(elem, 0);
        };

        Stack.prototype.pop = function () {
            return this.list.removeElementAtIndex(0);
        };

        Stack.prototype.peek = function () {
            return this.list.first();
        };

        Stack.prototype.size = function () {
            return this.list.size();
        };

        Stack.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };

        Stack.prototype.isEmpty = function () {
            return this.list.isEmpty();
        };

        Stack.prototype.clear = function () {
            this.list.clear();
        };

        Stack.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Stack;
    })();
    Collections.Stack = Stack;

    var Queue = (function () {
        function Queue() {
            this.list = new LinkedList();
        }
        Queue.prototype.enqueue = function (elem) {
            return this.list.add(elem);
        };

        Queue.prototype.add = function (elem) {
            return this.list.add(elem);
        };

        Queue.prototype.dequeue = function () {
            if (this.list.size() !== 0) {
                var el = this.list.first();
                this.list.removeElementAtIndex(0);
                return el;
            }
            return undefined;
        };

        Queue.prototype.peek = function () {
            if (this.list.size() !== 0) {
                return this.list.first();
            }
            return undefined;
        };

        Queue.prototype.size = function () {
            return this.list.size();
        };

        Queue.prototype.contains = function (elem, equalsFunction) {
            return this.list.contains(elem, equalsFunction);
        };

        Queue.prototype.isEmpty = function () {
            return this.list.size() <= 0;
        };

        Queue.prototype.clear = function () {
            this.list.clear();
        };

        Queue.prototype.forEach = function (callback) {
            this.list.forEach(callback);
        };
        return Queue;
    })();
    Collections.Queue = Queue;

    var PriorityQueue = (function () {
        function PriorityQueue(compareFunction) {
            this.heap = new Heap(Collections.reverseCompareFunction(compareFunction));
        }
        PriorityQueue.prototype.enqueue = function (element) {
            return this.heap.add(element);
        };

        PriorityQueue.prototype.add = function (element) {
            return this.heap.add(element);
        };

        PriorityQueue.prototype.dequeue = function () {
            if (this.heap.size() !== 0) {
                var el = this.heap.peek();
                this.heap.removeRoot();
                return el;
            }
            return undefined;
        };

        PriorityQueue.prototype.peek = function () {
            return this.heap.peek();
        };

        PriorityQueue.prototype.contains = function (element) {
            return this.heap.contains(element);
        };

        PriorityQueue.prototype.isEmpty = function () {
            return this.heap.isEmpty();
        };

        PriorityQueue.prototype.size = function () {
            return this.heap.size();
        };

        PriorityQueue.prototype.clear = function () {
            this.heap.clear();
        };

        PriorityQueue.prototype.forEach = function (callback) {
            this.heap.forEach(callback);
        };
        return PriorityQueue;
    })();
    Collections.PriorityQueue = PriorityQueue;

    var Set = (function () {
        function Set(toStringFunction) {
            this.dictionary = new Dictionary(toStringFunction);
        }
        Set.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };

        Set.prototype.add = function (element) {
            if (this.contains(element) || Collections.isUndefined(element)) {
                return false;
            } else {
                this.dictionary.setValue(element, element);
                return true;
            }
        };

        Set.prototype.intersection = function (otherSet) {
            var set = this;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    set.remove(element);
                }
                return true;
            });
        };

        Set.prototype.union = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.add(element);
                return true;
            });
        };

        Set.prototype.difference = function (otherSet) {
            var set = this;
            otherSet.forEach(function (element) {
                set.remove(element);
                return true;
            });
        };

        Set.prototype.isSubsetOf = function (otherSet) {
            if (this.size() > otherSet.size()) {
                return false;
            }

            var isSub = true;
            this.forEach(function (element) {
                if (!otherSet.contains(element)) {
                    isSub = false;
                    return false;
                }
                return true;
            });
            return isSub;
        };

        Set.prototype.remove = function (element) {
            if (!this.contains(element)) {
                return false;
            } else {
                this.dictionary.remove(element);
                return true;
            }
        };

        Set.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                return callback(v);
            });
        };

        Set.prototype.toArray = function () {
            return this.dictionary.values();
        };

        Set.prototype.isEmpty = function () {
            return this.dictionary.isEmpty();
        };

        Set.prototype.size = function () {
            return this.dictionary.size();
        };

        Set.prototype.clear = function () {
            this.dictionary.clear();
        };

        Set.prototype.toString = function () {
            return Collections.arrays.toString(this.toArray());
        };
        return Set;
    })();
    Collections.Set = Set;

    var Bag = (function () {
        function Bag(toStrFunction) {
            this.toStrF = toStrFunction || Collections.defaultToString;
            this.dictionary = new Dictionary(this.toStrF);
            this.nElements = 0;
        }
        Bag.prototype.add = function (element, nCopies) {
            if (typeof nCopies === "undefined") { nCopies = 1; }
            if (Collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }

            if (!this.contains(element)) {
                var node = {
                    value: element,
                    copies: nCopies
                };
                this.dictionary.setValue(element, node);
            } else {
                this.dictionary.getValue(element).copies += nCopies;
            }
            this.nElements += nCopies;
            return true;
        };

        Bag.prototype.count = function (element) {
            if (!this.contains(element)) {
                return 0;
            } else {
                return this.dictionary.getValue(element).copies;
            }
        };

        Bag.prototype.contains = function (element) {
            return this.dictionary.containsKey(element);
        };

        Bag.prototype.remove = function (element, nCopies) {
            if (typeof nCopies === "undefined") { nCopies = 1; }
            if (Collections.isUndefined(element) || nCopies <= 0) {
                return false;
            }

            if (!this.contains(element)) {
                return false;
            } else {
                var node = this.dictionary.getValue(element);
                if (nCopies > node.copies) {
                    this.nElements -= node.copies;
                } else {
                    this.nElements -= nCopies;
                }
                node.copies -= nCopies;
                if (node.copies <= 0) {
                    this.dictionary.remove(element);
                }
                return true;
            }
        };

        Bag.prototype.toArray = function () {
            var a = [];
            var values = this.dictionary.values();
            var vl = values.length;
            for (var i = 0; i < vl; i++) {
                var node = values[i];
                var element = node.value;
                var copies = node.copies;
                for (var j = 0; j < copies; j++) {
                    a.push(element);
                }
            }
            return a;
        };

        Bag.prototype.toSet = function () {
            var toret = new Set(this.toStrF);
            var elements = this.dictionary.values();
            var l = elements.length;
            for (var i = 0; i < l; i++) {
                var value = elements[i].value;
                toret.add(value);
            }
            return toret;
        };

        Bag.prototype.forEach = function (callback) {
            this.dictionary.forEach(function (k, v) {
                var value = v.value;
                var copies = v.copies;
                for (var i = 0; i < copies; i++) {
                    if (callback(value) === false) {
                        return false;
                    }
                }
                return true;
            });
        };

        Bag.prototype.size = function () {
            return this.nElements;
        };

        Bag.prototype.isEmpty = function () {
            return this.nElements === 0;
        };

        Bag.prototype.clear = function () {
            this.nElements = 0;
            this.dictionary.clear();
        };
        return Bag;
    })();
    Collections.Bag = Bag;

    
    var BSTree = (function () {
        function BSTree(compareFunction) {
            this.root = null;
            this.compare = compareFunction || Collections.defaultCompare;
            this.nElements = 0;
        }
        BSTree.prototype.add = function (element) {
            if (Collections.isUndefined(element)) {
                return false;
            }

            if (this.insertNode(this.createNode(element)) !== null) {
                this.nElements++;
                return true;
            }
            return false;
        };

        BSTree.prototype.clear = function () {
            this.root = null;
            this.nElements = 0;
        };

        BSTree.prototype.isEmpty = function () {
            return this.nElements === 0;
        };

        BSTree.prototype.size = function () {
            return this.nElements;
        };

        BSTree.prototype.contains = function (element) {
            if (Collections.isUndefined(element)) {
                return false;
            }
            return this.searchNode(this.root, element) !== null;
        };

        BSTree.prototype.remove = function (element) {
            var node = this.searchNode(this.root, element);
            if (node === null) {
                return false;
            }
            this.removeNode(node);
            this.nElements--;
            return true;
        };

        BSTree.prototype.inorderTraversal = function (callback) {
            this.inorderTraversalAux(this.root, callback, {
                stop: false
            });
        };

        BSTree.prototype.preorderTraversal = function (callback) {
            this.preorderTraversalAux(this.root, callback, {
                stop: false
            });
        };

        BSTree.prototype.postorderTraversal = function (callback) {
            this.postorderTraversalAux(this.root, callback, {
                stop: false
            });
        };

        BSTree.prototype.levelTraversal = function (callback) {
            this.levelTraversalAux(this.root, callback);
        };

        BSTree.prototype.minimum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.minimumAux(this.root).element;
        };

        BSTree.prototype.maximum = function () {
            if (this.isEmpty()) {
                return undefined;
            }
            return this.maximumAux(this.root).element;
        };

        BSTree.prototype.forEach = function (callback) {
            this.inorderTraversal(callback);
        };

        BSTree.prototype.toArray = function () {
            var array = [];
            this.inorderTraversal(function (element) {
                array.push(element);
                return true;
            });
            return array;
        };

        BSTree.prototype.height = function () {
            return this.heightAux(this.root);
        };

        BSTree.prototype.searchNode = function (node, element) {
            var cmp = null;
            while (node !== null && cmp !== 0) {
                cmp = this.compare(element, node.element);
                if (cmp < 0) {
                    node = node.leftCh;
                } else if (cmp > 0) {
                    node = node.rightCh;
                }
            }
            return node;
        };

        BSTree.prototype.transplant = function (n1, n2) {
            if (n1.parent === null) {
                this.root = n2;
            } else if (n1 === n1.parent.leftCh) {
                n1.parent.leftCh = n2;
            } else {
                n1.parent.rightCh = n2;
            }
            if (n2 !== null) {
                n2.parent = n1.parent;
            }
        };

        BSTree.prototype.removeNode = function (node) {
            if (node.leftCh === null) {
                this.transplant(node, node.rightCh);
            } else if (node.rightCh === null) {
                this.transplant(node, node.leftCh);
            } else {
                var y = this.minimumAux(node.rightCh);
                if (y.parent !== node) {
                    this.transplant(y, y.rightCh);
                    y.rightCh = node.rightCh;
                    y.rightCh.parent = y;
                }
                this.transplant(node, y);
                y.leftCh = node.leftCh;
                y.leftCh.parent = y;
            }
        };

        BSTree.prototype.inorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.inorderTraversalAux(node.rightCh, callback, signal);
        };

        BSTree.prototype.levelTraversalAux = function (node, callback) {
            var queue = new Queue();
            if (node !== null) {
                queue.enqueue(node);
            }
            while (!queue.isEmpty()) {
                node = queue.dequeue();
                if (callback(node.element) === false) {
                    return;
                }
                if (node.leftCh !== null) {
                    queue.enqueue(node.leftCh);
                }
                if (node.rightCh !== null) {
                    queue.enqueue(node.rightCh);
                }
            }
        };

        BSTree.prototype.preorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.preorderTraversalAux(node.rightCh, callback, signal);
        };

        BSTree.prototype.postorderTraversalAux = function (node, callback, signal) {
            if (node === null || signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.leftCh, callback, signal);
            if (signal.stop) {
                return;
            }
            this.postorderTraversalAux(node.rightCh, callback, signal);
            if (signal.stop) {
                return;
            }
            signal.stop = callback(node.element) === false;
        };

        BSTree.prototype.minimumAux = function (node) {
            while (node.leftCh !== null) {
                node = node.leftCh;
            }
            return node;
        };

        BSTree.prototype.maximumAux = function (node) {
            while (node.rightCh !== null) {
                node = node.rightCh;
            }
            return node;
        };

        BSTree.prototype.heightAux = function (node) {
            if (node === null) {
                return -1;
            }
            return Math.max(this.heightAux(node.leftCh), this.heightAux(node.rightCh)) + 1;
        };

        BSTree.prototype.insertNode = function (node) {
            var parent = null;
            var position = this.root;
            var cmp = null;
            while (position !== null) {
                cmp = this.compare(node.element, position.element);
                if (cmp === 0) {
                    return null;
                } else if (cmp < 0) {
                    parent = position;
                    position = position.leftCh;
                } else {
                    parent = position;
                    position = position.rightCh;
                }
            }
            node.parent = parent;
            if (parent === null) {
                this.root = node;
            } else if (this.compare(node.element, parent.element) < 0) {
                parent.leftCh = node;
            } else {
                parent.rightCh = node;
            }
            return node;
        };

        BSTree.prototype.createNode = function (element) {
            return {
                element: element,
                leftCh: null,
                rightCh: null,
                parent: null
            };
        };
        return BSTree;
    })();
    Collections.BSTree = BSTree;
})(Collections || (Collections = {}));
var Base64 = (function () {
    function Base64() {
        this._keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    }
    Base64.prototype.encode = function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = this.utf8Encode(input);

        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output + this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }

        return output;
    };

    Base64.prototype.decode = function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {
            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = this.utf8Decode(output);

        return output;
    };

    Base64.prototype.utf8Encode = function (value) {
        value = value.replace(/\r\n/g, "\n");
        var utftext = "";

        for (var n = 0; n < value.length; n++) {
            var c = value.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if ((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }

        return utftext;
    };

    Base64.prototype.utf8Decode = function (utftext) {
        var decodeString = "";
        var i = 0;
        var c, c2, c3 = 0;

        while (i < utftext.length) {
            c = utftext.charCodeAt(i);

            if (c < 128) {
                decodeString += String.fromCharCode(c);
                i++;
            } else if ((c > 191) && (c < 224)) {
                c2 = utftext.charCodeAt(i + 1);
                decodeString += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            } else {
                c2 = utftext.charCodeAt(i + 1);
                c3 = utftext.charCodeAt(i + 2);
                decodeString += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }
        }

        return decodeString;
    };
    return Base64;
})();
if (!String.prototype.format) {
    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function (match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

if (!String.prototype.appendDictionary) {
    String.prototype.appendDictionary = function () {
        var dictionary = arguments[0];
        var result = this.toString();
        dictionary.forEach(function (key, value) {
            if (key && value) {
                result = result.concat(key, value, false);
            }
        });

        return result;
    };
}

if (!String.prototype.endsWith) {
    String.prototype.endsWith = function (value) {
        var lastIndex = this.lastIndexOf(value);
        return (lastIndex != -1) && (lastIndex + value.length == this.length);
    };
}
var ColorKeys = (function () {
    function ColorKeys() {
        this.colorString = "&p.c=";
    }
    ColorKeys.prototype.appendColors = function (stringBuilder, xpoUrlColors) {
        if (xpoUrlColors == null || xpoUrlColors.length <= 0)
            return stringBuilder;

        var max = UrlGeneratorModule.getMaxObjectNumber(xpoUrlColors);
        var colorBuilder = this.colorString;
        for (var i = 0; i <= max; i++) {
            var index = xpoUrlColors.map(function (e) {
                return e.getIndex();
            }).indexOf(i);
            var colorObject = xpoUrlColors[index];

            if (colorObject == null)
                colorBuilder = colorBuilder.concat(",");
            else {
                colorBuilder = colorBuilder.concat(colorObject.getColor().getColor()).concat(",");
            }
        }

        return stringBuilder.concat(colorBuilder.slice(0, colorBuilder.length - 1));
    };
    return ColorKeys;
})();
var DesignKey = (function () {
    function DesignKey() {
        this.keyList = new Array();
        this.americanCulture = "en-US";
    }
    DesignKey.prototype.addToList = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        if (value === undefined || value === null) {
            this.addEmpty();
            return;
        } else if ((!value || value.toString() == "") && omitIfDefault) {
            this.addEmpty();
            return;
        }

        if (!isNaN(parseFloat(value)) && ((value | 0) != value))
            this.addDouble(value, omitIfDefault);
        else
            this.keyList.push(value.toString());
    };

    DesignKey.prototype.addDouble = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        var convertValue = value.toLocaleString(this.americanCulture);

        if ((convertValue.length != null && convertValue != "") || !omitIfDefault)
            this.keyList.push(convertValue);
    };

    DesignKey.prototype.getUrlValue = function () {
        return this.keyList.join(",");
    };

    DesignKey.prototype.getValues = function (designs) {
        throw ("Can't call getValues on base class.");
    };

    DesignKey.prototype.addEmpty = function () {
        this.keyList.push("");
    };

    DesignKey.prototype.isEmpty = function () {
        var isEmpty = true;

        for (var i = 0; i < this.keyList.length; i++) {
            if (this.keyList[i]) {
                isEmpty = false;
                break;
            }
        }

        return isEmpty;
    };
    return DesignKey;
})();
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var AspectRatioDesignKey = (function (_super) {
    __extends(AspectRatioDesignKey, _super);
    function AspectRatioDesignKey() {
        _super.call(this);
    }
    AspectRatioDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getAspectRatio(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.ta=" + this.getUrlValue();
    };
    return AspectRatioDesignKey;
})(DesignKey);
var ContrastDesignKey = (function (_super) {
    __extends(ContrastDesignKey, _super);
    function ContrastDesignKey() {
        _super.apply(this, arguments);
    }
    ContrastDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getContrast());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tc=" + this.getUrlValue();
    };
    return ContrastDesignKey;
})(DesignKey);
var DesignKeys = (function () {
    function DesignKeys() {
        this.designKeys = new Array();
        this.designKeys.push(new EntityNameDesignKey(), new ContrastDesignKey(), new DropXDesignKey(), new DropYDesignKey(), new GlossDesignKey(), new HeightDesignKey(), new PlacingPointXDesignKey(), new PlacingPointYDesignKey(), new RepeatDesignKey(), new RotationDesignKey(), new WidthDesignKey(), new FlipDesignKey(), new AspectRatioDesignKey());
    }
    DesignKeys.prototype.appendDesigns = function (stringBuilder, xpoUrlDesigns) {
        if (xpoUrlDesigns == null || xpoUrlDesigns.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.designKeys.length; i++) {
            var keyValue = this.designKeys[i].getValues(xpoUrlDesigns);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&").concat(keyValue);
            }
        }

        return stringBuilder;
    };
    return DesignKeys;
})();
var DropXDesignKey = (function (_super) {
    __extends(DropXDesignKey, _super);
    function DropXDesignKey() {
        _super.apply(this, arguments);
    }
    DropXDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getDropX());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tdx=" + this.getUrlValue();
    };
    return DropXDesignKey;
})(DesignKey);
var DropYDesignKey = (function (_super) {
    __extends(DropYDesignKey, _super);
    function DropYDesignKey() {
        _super.apply(this, arguments);
    }
    DropYDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getDropY());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tdy=" + this.getUrlValue();
    };
    return DropYDesignKey;
})(DesignKey);
var EntityNameDesignKey = (function (_super) {
    __extends(EntityNameDesignKey, _super);
    function EntityNameDesignKey() {
        _super.apply(this, arguments);
    }
    EntityNameDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(this.convertToBase64UrlString(urlObject.getDesign().getEntityName()));
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tn=" + this.getUrlValue();
    };

    EntityNameDesignKey.prototype.convertToBase64UrlString = function (value) {
        var base64 = new Base64();

        return encodeURIComponent(base64.encode(value));
    };
    return EntityNameDesignKey;
})(DesignKey);
var FlipDesignKey = (function (_super) {
    __extends(FlipDesignKey, _super);
    function FlipDesignKey() {
        _super.apply(this, arguments);
    }
    FlipDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getFlip());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tf=" + this.getUrlValue();
    };
    return FlipDesignKey;
})(DesignKey);
var GeneralKeys = (function () {
    function GeneralKeys() {
        this.entityName = "fn";
        this.width = "width";
        this.height = "height";
        this.backgroundColor = "bgcolor";
        this.designCaching = "p.dc";
        this.resizeMethod = "mode";
        this.textureRepeat = "p.r";
        this.outputQuality = "quality";
        this.imageType = "format";
        this.outputType = "ot";
        this.sceneThumbnailObjectNumber = "p.objectthumb";
        this.highlightObject = "p.highlight";
        this.caching = "Cache";
        this.coords = "p.coords";
        this.watermark = "watermark";
        this.frame = "p.frame";
        this.queryStringFormat = "&{0}={1}";
    }
    GeneralKeys.prototype.appendRequest = function (stringBuilder, request) {
        stringBuilder = stringBuilder.concat("?1=1").concat(this.getQueryStringValue(this.width, request.getWidth())).concat(this.getQueryStringValue(this.backgroundColor, request.getBackgroundColor())).concat(this.getQueryStringValue(this.caching, this.getCachingMethod(request))).concat(this.getQueryStringValue(this.height, request.getHeight())).concat(this.getQueryStringValue(this.designCaching, request.getDesignCaching())).concat(this.getQueryStringValue(this.resizeMethod, this.getResizeMethod(request))).concat(this.getQueryStringValue(this.textureRepeat, this.getRepeatMethod(request))).concat(this.getQueryStringValue(this.outputQuality, request.getOutputQuality())).concat(this.getQueryStringValue(this.imageType, this.getFormat(request.getImageType()))).concat(this.getQueryStringValue(this.sceneThumbnailObjectNumber, request.getSceneThumbnailObjectNumber())).concat(this.getQueryStringValue(this.highlightObject, request.getHighlightObject())).concat(this.getQueryStringValue(this.watermark, request.getWatermarkImage())).concat(this.getQueryStringValue(this.frame, request.getFrame())).appendDictionary(request.customParameters);

        if (request.urlType == 2 /* Coords */) {
            stringBuilder = stringBuilder.concat(this.getQueryStringValue(this.coords, true));
        }

        return stringBuilder;
    };

    GeneralKeys.prototype.getQueryStringValue = function (key, value) {
        if (!value)
            return "";

        return this.queryStringFormat.format(key, value);
    };

    GeneralKeys.prototype.getCachingMethod = function (request) {
        return request.getCaching() ? "Default" : "No";
    };

    GeneralKeys.prototype.getRepeatMethod = function (request) {
        if (request.getResizeMethod() == 4 /* Repeat */ && request.getFileType() == 2 /* Design */) {
            return "1";
        }

        return "";
    };

    GeneralKeys.prototype.getFormat = function (imageType) {
        switch (imageType) {
            case 3 /* Bmp */:
                return "bmp";
            case 1 /* Jpg */:
                return "jpg";
            case 2 /* Png */:
                return "png";
            default:
                return "jpg";
        }
    };

    GeneralKeys.prototype.getResizeMethod = function (request) {
        switch (request.getResizeMethod()) {
            case 5 /* KeepAspectMax */:
                return "max";
            case 3 /* Crop */:
                return "crop";
            case 2 /* Stretch */:
                return "stretch";
            case 6 /* Canvas */:
                return "canvas";
        }

        return "";
    };
    return GeneralKeys;
})();
var GlossDesignKey = (function (_super) {
    __extends(GlossDesignKey, _super);
    function GlossDesignKey() {
        _super.apply(this, arguments);
    }
    GlossDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getGloss());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tg=" + this.getUrlValue();
    };
    return GlossDesignKey;
})(DesignKey);
var HeightDesignKey = (function (_super) {
    __extends(HeightDesignKey, _super);
    function HeightDesignKey() {
        _super.apply(this, arguments);
    }
    HeightDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getHeight());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.th=" + this.getUrlValue();
    };
    return HeightDesignKey;
})(DesignKey);
var OverlayKey = (function () {
    function OverlayKey() {
        this.keyList = new Array();
        this.americanCulture = "en-US";
    }
    OverlayKey.prototype.addToList = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        if (value === undefined || value === null) {
            this.addEmpty();
            return;
        } else if ((!value || value.toString() == "") && omitIfDefault) {
            this.addEmpty();
            return;
        }

        if (!isNaN(parseFloat(value)) && ((value | 0) != value))
            this.addDouble(value, omitIfDefault);
        else
            this.keyList.push(value.toString());
    };

    OverlayKey.prototype.addDouble = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        var convertValue = value.toLocaleString(this.americanCulture);

        if ((convertValue.length != null && convertValue != "") || !omitIfDefault)
            this.keyList.push(convertValue);
    };

    OverlayKey.prototype.getUrlValue = function () {
        return this.keyList.join(",");
    };

    OverlayKey.prototype.getValues = function (designs) {
        throw ("Can't call getValues on base class.");
    };

    OverlayKey.prototype.addEmpty = function () {
        this.keyList.push("");
    };

    OverlayKey.prototype.isEmpty = function () {
        var isEmpty = true;

        for (var i = 0; i < this.keyList.length; i++) {
            if (this.keyList[i]) {
                isEmpty = false;
                break;
            }
        }

        return isEmpty;
    };
    return OverlayKey;
})();
var OverlayKeys = (function () {
    function OverlayKeys() {
        this.overlayKeys = new Array();
        this.overlayKeys.push(new NameOverlayKey(), new ModeOverlayKey(), new LocationOverlayKey(), new OperationOverlayKey(), new TimeOverlayKey());
    }
    OverlayKeys.prototype.appendOverlays = function (stringBuilder, xpoUrlOverlays) {
        if (xpoUrlOverlays == null || xpoUrlOverlays.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.overlayKeys.length; i++) {
            var keyValue = this.overlayKeys[i].getValues(xpoUrlOverlays);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&").concat(keyValue);
            }
        }

        return stringBuilder;
    };
    return OverlayKeys;
})();
var LocationOverlayKey = (function (_super) {
    __extends(LocationOverlayKey, _super);
    function LocationOverlayKey() {
        _super.apply(this, arguments);
    }
    LocationOverlayKey.prototype.getValues = function (overlays) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(urlOverlay.getOverlayLocation());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.ol=" + this.getUrlValue();
    };
    return LocationOverlayKey;
})(OverlayKey);
var ModeOverlayKey = (function (_super) {
    __extends(ModeOverlayKey, _super);
    function ModeOverlayKey() {
        _super.apply(this, arguments);
    }
    ModeOverlayKey.prototype.getValues = function (overlays) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(urlOverlay.getOverlayMode());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.om=" + this.getUrlValue();
    };
    return ModeOverlayKey;
})(OverlayKey);
var NameOverlayKey = (function (_super) {
    __extends(NameOverlayKey, _super);
    function NameOverlayKey() {
        _super.apply(this, arguments);
    }
    NameOverlayKey.prototype.getValues = function (overlays) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(this.convertToBase64UrlString(urlOverlay.getOverlayName()));
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.on=" + this.getUrlValue();
    };

    NameOverlayKey.prototype.convertToBase64UrlString = function (value) {
        var base64 = new Base64();

        return encodeURIComponent(base64.encode(value));
    };
    return NameOverlayKey;
})(OverlayKey);
var OperationOverlayKey = (function (_super) {
    __extends(OperationOverlayKey, _super);
    function OperationOverlayKey() {
        _super.apply(this, arguments);
    }
    OperationOverlayKey.prototype.getValues = function (overlays) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(urlOverlay.getOverlayOperation());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.oo=" + this.getUrlValue();
    };
    return OperationOverlayKey;
})(OverlayKey);
var XpoUrlGenerator = (function () {
    function XpoUrlGenerator() {
    }
    XpoUrlGenerator.prototype.getUrl = function (request) {
        if (request.urlType == 1 /* Image */)
            return this.getImageUrl(request);

        if (request.urlType == 2 /* Coords */)
            return this.getCoordsUrl(request);

        throw ("Input type is not recognized");
    };

    XpoUrlGenerator.prototype.getCanvas = function (request) {
        var _this = this;
        this.ensureWorkspace(request.getCanvasContainerId());
        this.workspace.loadScene(request.getPrimaryKey(), 1).whenData(function () {
            var allRequestObjects = request.getObjects();

            for (var i = 0; i < allRequestObjects.length; i++) {
                var requestObject = allRequestObjects[i];
                var workspaceObject = _this.workspace.getObject(i);
                var requestDesign = requestObject.getDesign();
                if (requestDesign != null) {
                    workspaceObject.Contrast = requestDesign.getContrast();
                    workspaceObject.PlacingPointX = requestDesign.getPlacingPointX();
                    workspaceObject.PlacingPointY = requestDesign.getPlacingPointY();
                    workspaceObject.LoadTextureImage(_this.getDesignImageUrl(requestDesign, request), requestDesign.getWidth(), requestDesign.getHeight());
                }
            }

            setInterval(function () {
                _this.workspace.render(0);
            }, 1000);

            return _this.workspace.getCanvas();
        });

        return null;
    };

    XpoUrlGenerator.prototype.getImageUrl = function (request) {
        var generalKeys = new GeneralKeys();
        var designKeys = new DesignKeys();
        var colorKeys = new ColorKeys();
        var textKeys = new TextKeys();
        var overlayKeys = new OverlayKeys();

        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());

        stringBuilder = generalKeys.appendRequest(stringBuilder, request);
        stringBuilder = designKeys.appendDesigns(stringBuilder, request.getObjects().filter(function (value) {
            return value.getDesign() != null;
        }));
        stringBuilder = colorKeys.appendColors(stringBuilder, request.getObjects().filter(function (value) {
            return value.getColor() != null;
        }));
        stringBuilder = textKeys.appendTexts(stringBuilder, request.getObjects().filter(function (value) {
            return value.getText() != null;
        }));
        stringBuilder = overlayKeys.appendOverlays(stringBuilder, request.getOverlays());

        return stringBuilder;
    };

    XpoUrlGenerator.prototype.getCoordsUrl = function (request) {
        var generalKeys = new GeneralKeys();
        var baseUri = this.getXpoBaseUrl(request);

        var stringBuilder = baseUri;
        stringBuilder = stringBuilder.concat(request.getPrimaryKey());
        stringBuilder = generalKeys.appendRequest(stringBuilder, request);

        return stringBuilder;
    };

    XpoUrlGenerator.prototype.getXpoBaseUrl = function (urlRequest) {
        if (urlRequest != null && urlRequest.getAbsoluteUrl())
            return urlRequest.getAbsoluteUrl().endsWith("/") ? urlRequest.getAbsoluteUrl() : urlRequest.getAbsoluteUrl() + "/";

        return "/";
    };

    XpoUrlGenerator.prototype.getDesignImageUrl = function (design, urlRequest) {
        var newUrlRequest = new XpoUrlRequest();
        newUrlRequest.setAbsoluteUrl(urlRequest.getAbsoluteUrl());
        newUrlRequest.setPrimaryKey(design.getEntityName());
        newUrlRequest.setHeight(design.getHeight());
        newUrlRequest.setWidth(design.getWidth());

        return this.getImageUrl(newUrlRequest);
    };

    XpoUrlGenerator.prototype.ensureWorkspace = function (canvasContainerId) {
        if (!this.workspace)
            this.workspace = new Pix2.GLWorkspace(canvasContainerId);
    };
    return XpoUrlGenerator;
})();
var PlacingPointXDesignKey = (function (_super) {
    __extends(PlacingPointXDesignKey, _super);
    function PlacingPointXDesignKey() {
        _super.apply(this, arguments);
    }
    PlacingPointXDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getPlacingPointX(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tpx=" + this.getUrlValue();
    };
    return PlacingPointXDesignKey;
})(DesignKey);
var PlacingPointYDesignKey = (function (_super) {
    __extends(PlacingPointYDesignKey, _super);
    function PlacingPointYDesignKey() {
        _super.apply(this, arguments);
    }
    PlacingPointYDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getPlacingPointY(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tpy=" + this.getUrlValue();
    };
    return PlacingPointYDesignKey;
})(DesignKey);
var RepeatDesignKey = (function (_super) {
    __extends(RepeatDesignKey, _super);
    function RepeatDesignKey() {
        _super.apply(this, arguments);
    }
    RepeatDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getRepeat(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tr=" + this.getUrlValue();
    };
    return RepeatDesignKey;
})(DesignKey);
var RotationDesignKey = (function (_super) {
    __extends(RotationDesignKey, _super);
    function RotationDesignKey() {
        _super.apply(this, arguments);
    }
    RotationDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getRotation());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.trt=" + this.getUrlValue();
    };
    return RotationDesignKey;
})(DesignKey);
var TimeOverlayKey = (function (_super) {
    __extends(TimeOverlayKey, _super);
    function TimeOverlayKey() {
        _super.apply(this, arguments);
    }
    TimeOverlayKey.prototype.getValues = function (overlays) {
        var max = UrlGeneratorModule.getMaxOverlayNumber(overlays);

        for (var i = 0; i <= max; i++) {
            var index = overlays.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlOverlay = overlays[index];
            if (urlOverlay != null)
                this.addToList(urlOverlay.getOverlayTime());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.ot=" + this.getUrlValue();
    };
    return TimeOverlayKey;
})(OverlayKey);
var WidthDesignKey = (function (_super) {
    __extends(WidthDesignKey, _super);
    function WidthDesignKey() {
        _super.apply(this, arguments);
    }
    WidthDesignKey.prototype.getValues = function (designs) {
        var max = UrlGeneratorModule.getMaxObjectNumber(designs);

        for (var i = 0; i <= max; i++) {
            var index = designs.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = designs[index];
            if (urlObject != null)
                this.addToList(urlObject.getDesign().getWidth());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.tw=" + this.getUrlValue();
    };
    return WidthDesignKey;
})(DesignKey);
var TextKey = (function () {
    function TextKey() {
        this.keyList = new Array();
        this.americanCulture = "en-US";
    }
    TextKey.prototype.addToList = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        if (value === undefined || value === null) {
            this.addEmpty();
            return;
        } else if ((!value || value.toString() == "") && omitIfDefault) {
            this.addEmpty();
            return;
        }

        if (!isNaN(parseFloat(value)) && ((value | 0) != value))
            this.addDouble(value, omitIfDefault);
        else
            this.keyList.push(value.toString());
    };

    TextKey.prototype.addDouble = function (value, omitIfDefault) {
        if (typeof omitIfDefault === "undefined") { omitIfDefault = true; }
        var convertValue = value.toLocaleString(this.americanCulture);

        if ((convertValue.length != null && convertValue != "") || !omitIfDefault)
            this.keyList.push(convertValue);
    };

    TextKey.prototype.getUrlValue = function () {
        return this.keyList.join(",");
    };

    TextKey.prototype.getValues = function (texts) {
        throw ("Can't call getValues on base class.");
    };

    TextKey.prototype.addEmpty = function () {
        this.keyList.push("");
    };

    TextKey.prototype.isEmpty = function () {
        var isEmpty = true;

        for (var i = 0; i < this.keyList.length; i++) {
            if (this.keyList[i]) {
                isEmpty = false;
                break;
            }
        }

        return isEmpty;
    };
    return TextKey;
})();
var TextKeys = (function () {
    function TextKeys() {
        this.textKeys = new Array();
        this.textKeys.push(new TextTextKey(), new TextColorTextKey(), new TextAlignmentTextKey(), new TextFontTextKey(), new TextMultiplierTextKey(), new TextPlacingPointXTextKey(), new TextPlacingPointYTextKey(), new TextSizeTextKey(), new TextStyleTextKey());
    }
    TextKeys.prototype.appendTexts = function (stringBuilder, xpoUrlTexts) {
        if (xpoUrlTexts == null || xpoUrlTexts.length <= 0)
            return stringBuilder;

        for (var i = 0; i < this.textKeys.length; i++) {
            var keyValue = this.textKeys[i].getValues(xpoUrlTexts);

            if (keyValue) {
                stringBuilder = stringBuilder.concat("&").concat(keyValue);
            }
        }

        return stringBuilder;
    };
    return TextKeys;
})();
var TextTextKey = (function (_super) {
    __extends(TextTextKey, _super);
    function TextTextKey() {
        _super.call(this);
    }
    TextTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getText(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text=" + this.getUrlValue();
    };
    return TextTextKey;
})(TextKey);
var TextAlignmentTextKey = (function (_super) {
    __extends(TextAlignmentTextKey, _super);
    function TextAlignmentTextKey() {
        _super.call(this);
    }
    TextAlignmentTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getAlignment());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.align=" + this.getUrlValue();
    };
    return TextAlignmentTextKey;
})(TextKey);
var TextColorTextKey = (function (_super) {
    __extends(TextColorTextKey, _super);
    function TextColorTextKey() {
        _super.call(this);
    }
    TextColorTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getColor(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.color=" + this.getUrlValue();
    };
    return TextColorTextKey;
})(TextKey);
var TextFontTextKey = (function (_super) {
    __extends(TextFontTextKey, _super);
    function TextFontTextKey() {
        _super.call(this);
    }
    TextFontTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getFontname(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.font=" + this.getUrlValue();
    };
    return TextFontTextKey;
})(TextKey);
var TextMultiplierTextKey = (function (_super) {
    __extends(TextMultiplierTextKey, _super);
    function TextMultiplierTextKey() {
        _super.call(this);
    }
    TextMultiplierTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getMultiplier());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.multiplier=" + this.getUrlValue();
    };
    return TextMultiplierTextKey;
})(TextKey);
var TextPlacingPointXTextKey = (function (_super) {
    __extends(TextPlacingPointXTextKey, _super);
    function TextPlacingPointXTextKey() {
        _super.call(this);
    }
    TextPlacingPointXTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getPlacingPointX());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.px=" + this.getUrlValue();
    };
    return TextPlacingPointXTextKey;
})(TextKey);
var TextPlacingPointYTextKey = (function (_super) {
    __extends(TextPlacingPointYTextKey, _super);
    function TextPlacingPointYTextKey() {
        _super.call(this);
    }
    TextPlacingPointYTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getPlacingPointY(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.py=" + this.getUrlValue();
    };
    return TextPlacingPointYTextKey;
})(TextKey);
var TextSizeTextKey = (function (_super) {
    __extends(TextSizeTextKey, _super);
    function TextSizeTextKey() {
        _super.call(this);
    }
    TextSizeTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getFontsize());
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.size=" + this.getUrlValue();
    };
    return TextSizeTextKey;
})(TextKey);
var TextStyleTextKey = (function (_super) {
    __extends(TextStyleTextKey, _super);
    function TextStyleTextKey() {
        _super.call(this);
    }
    TextStyleTextKey.prototype.getValues = function (texts) {
        var max = UrlGeneratorModule.getMaxObjectNumber(texts);

        for (var i = 0; i <= max; i++) {
            var index = texts.map(function (e) {
                return e.getIndex();
            }).indexOf(i);

            var urlObject = texts[index];
            if (urlObject != null)
                this.addToList(urlObject.getText().getFontStyle(), false);
            else if (i != max)
                this.addEmpty();
        }

        if (this.isEmpty())
            return "";

        return "p.text.style=" + this.getUrlValue();
    };
    return TextStyleTextKey;
})(TextKey);
var FluentXpoUrlColor = (function () {
    function FluentXpoUrlColor(color) {
        this.xpoUrlColor = new XpoUrlColor(color);
    }
    FluentXpoUrlColor.prototype.getXpoUrlColor = function () {
        return this.xpoUrlColor;
    };
    return FluentXpoUrlColor;
})();
var FluentXpoUrlDesign = (function () {
    function FluentXpoUrlDesign(fileName) {
        this.xpoUrlDesign = new XpoUrlDesign(fileName);
    }
    FluentXpoUrlDesign.prototype.getXpoUrlDesign = function () {
        return this.xpoUrlDesign;
    };

    FluentXpoUrlDesign.prototype.setSameIndex = function (index) {
        this.xpoUrlDesign.setSameIndex(index);

        return this;
    };

    FluentXpoUrlDesign.prototype.setType = function (type) {
        this.xpoUrlDesign.setObjectType(type);

        return this;
    };

    FluentXpoUrlDesign.prototype.setWidth = function (width) {
        this.xpoUrlDesign.setWidth(width);

        return this;
    };

    FluentXpoUrlDesign.prototype.setHeight = function (height) {
        this.xpoUrlDesign.setHeight(height);

        return this;
    };

    FluentXpoUrlDesign.prototype.setGloss = function (gloss) {
        this.xpoUrlDesign.setGloss(gloss);

        return this;
    };

    FluentXpoUrlDesign.prototype.setContrast = function (contrast) {
        this.xpoUrlDesign.setContrast(contrast);

        return this;
    };

    FluentXpoUrlDesign.prototype.setDropX = function (dropX) {
        this.xpoUrlDesign.setDropX(dropX);

        return this;
    };

    FluentXpoUrlDesign.prototype.setDropY = function (dropY) {
        this.xpoUrlDesign.setDropY(dropY);

        return this;
    };

    FluentXpoUrlDesign.prototype.setPlacingPointX = function (placingPointX) {
        this.xpoUrlDesign.setPlacingPointX(placingPointX);

        return this;
    };

    FluentXpoUrlDesign.prototype.setPlacingPointY = function (placingPointY) {
        this.xpoUrlDesign.setPlacingPointY(placingPointY);

        return this;
    };

    FluentXpoUrlDesign.prototype.setRotation = function (rotation) {
        this.xpoUrlDesign.setRotation(rotation);

        return this;
    };

    FluentXpoUrlDesign.prototype.setFlip = function (flip) {
        this.xpoUrlDesign.setFlip(flip);

        return this;
    };

    FluentXpoUrlDesign.prototype.setRepeat = function (repeat) {
        this.xpoUrlDesign.setRepeat(repeat);

        return this;
    };

    FluentXpoUrlDesign.prototype.setAspectRatio = function (aspectRatio) {
        this.xpoUrlDesign.setAspectRatio(aspectRatio);

        return this;
    };
    return FluentXpoUrlDesign;
})();
var FluentXpoUrlFactory = (function () {
    function FluentXpoUrlFactory() {
    }
    FluentXpoUrlFactory.prototype.createFluentUrlGenerator = function (generator, urlType, canvasGenerator) {
        return new FluentXpoUrlGenerator(generator, this.getUrlRequest(urlType), canvasGenerator);
    };

    FluentXpoUrlFactory.prototype.getUrlRequest = function (urltype) {
        switch (urltype) {
            case 0 /* Image */:
                return new XpoImageUrlRequest();
            case 1 /* Coordinates */:
                return new XpoCoordinatesUrlRequest();
            default:
                throw ("Cannot determine correct URL type");
        }
    };
    return FluentXpoUrlFactory;
})();
var FluentXpoUrlGenerator = (function () {
    function FluentXpoUrlGenerator(generator, request, canvasGenerator) {
        if (typeof request === "undefined") { request = new XpoUrlRequest; }
        if (generator == null)
            throw ("Generator cannot be null.");
        if (request == null)
            throw ("Request cannot be null");

        this.generator = generator;
        this.request = request;
        this.canvasGenerator = canvasGenerator;
    }
    FluentXpoUrlGenerator.prototype.ensureUrlType = function (urlRequest) {
        if (UrlGeneratorModule.UrlTypes[urlRequest.urlType] != null)
            return urlRequest;

        throw ("Could not cast url with type " + urlRequest.urlType + " to " + typeof XpoUrlRequest);
    };

    FluentXpoUrlGenerator.prototype.setPrimaryKey = function (primaryKey) {
        this.request.setPrimaryKey(primaryKey);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setOutputQuality = function (outputQuality) {
        this.ensureUrlType(this.request).setOutputQuality(outputQuality);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setOutputType = function (outputType) {
        this.ensureUrlType(this.request).setOutputType(outputType);

        return this;
    };

    FluentXpoUrlGenerator.prototype.addObject = function (xpoObject, options) {
        var fluentXpoObject = new FluentXpoUrlObject();
        fluentXpoObject.setIndex(this.ensureUrlType(this.request).getObjects().length);
        xpoObject(fluentXpoObject, options);

        this.ensureUrlType(this.request).objects.push(fluentXpoObject.getXpoObject());

        return this;
    };

    FluentXpoUrlGenerator.prototype.addTemplateParameter = function (index, parameterValue) {
        this.ensureUrlType(this.request).templateParameters.push(new XpoUrlTemplate(index, parameterValue));

        return this;
    };

    FluentXpoUrlGenerator.prototype.addOverlay = function (xpoOverlay, options) {
        var fluentXpoOverlay = new FluentXpoUrlOverlay();
        fluentXpoOverlay.setIndex(this.ensureUrlType(this.request).getOverlays().length);
        xpoOverlay(fluentXpoOverlay, options);

        this.ensureUrlType(this.request).overlays.push(fluentXpoOverlay.getXpoOverlay());

        return this;
    };

    FluentXpoUrlGenerator.prototype.setEntityType = function (fileType) {
        this.ensureUrlType(this.request).setFileType(fileType);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setWidth = function (width) {
        this.request.setWidth(width);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setHeight = function (height) {
        this.request.setHeight(height);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setResizeMethod = function (resizeMethod) {
        this.request.setResizeMethod(resizeMethod);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setImageType = function (type) {
        this.ensureUrlType(this.request).setImageType(type);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setDebug = function (debug) {
        this.request.setDebug(debug);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setBackgroundColor = function (colorString) {
        this.ensureUrlType(this.request).setBackgroundColor(colorString);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setCaching = function (cache) {
        this.ensureUrlType(this.request).setCaching(cache);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setDesignCaching = function (cache) {
        this.ensureUrlType(this.request).setDesignCaching(cache);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setHighlightObject = function (objectNumber) {
        this.ensureUrlType(this.request).setHighlightObject(objectNumber);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setTransparencyColor = function (colorString) {
        this.ensureUrlType(this.request).setTransparencyColor(colorString);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setSceneThumbnailObjectNumber = function (objectNumber) {
        this.ensureUrlType(this.request).setSceneThumbnailObjectNumber(objectNumber);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setAllColor = function (colorString) {
        this.ensureUrlType(this.request).setAllColor(colorString);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setPrefillCaching = function (cache) {
        this.ensureUrlType(this.request).setPreFillCaching(cache);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setTemplateName = function (name) {
        this.ensureUrlType(this.request).setTemplateName(name);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setAbsoluteUrl = function (absoluteUrl) {
        this.ensureUrlType(this.request).setAbsoluteUrl(absoluteUrl);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setWatermarkImage = function (watermarkImageName) {
        this.ensureUrlType(this.request).setWatermarkImage(watermarkImageName);

        return this;
    };

    FluentXpoUrlGenerator.prototype.addCustom = function (key, value) {
        this.request.customParameters.setValue(key, value);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setFrame = function (frame) {
        this.request.setFrame(frame);

        return this;
    };

    FluentXpoUrlGenerator.prototype.setCanvasContainerId = function (canvasContainerId) {
        this.request.setCanvasContainerId(canvasContainerId);

        return this;
    };

    FluentXpoUrlGenerator.prototype.getUrl = function () {
        return this.generator.getUrl(this.request);
    };

    FluentXpoUrlGenerator.prototype.getCanvas = function () {
        return this.canvasGenerator.getCanvas(this.request);
    };
    return FluentXpoUrlGenerator;
})();
var FluentXpoUrlObject = (function () {
    function FluentXpoUrlObject() {
        this.xpoObject = new XpoUrlObject();
    }
    FluentXpoUrlObject.prototype.getXpoObject = function () {
        return this.xpoObject;
    };

    FluentXpoUrlObject.prototype.setIndex = function (index) {
        this.xpoObject.setIndex(index);

        return this;
    };

    FluentXpoUrlObject.prototype.design = function (fileName) {
        this.xpoObject.setObjectType(2 /* Design */);
        var fluentXpoUrlDesign = new FluentXpoUrlDesign(fileName);
        this.xpoObject.setDesign(fluentXpoUrlDesign.xpoUrlDesign);

        return fluentXpoUrlDesign;
    };

    FluentXpoUrlObject.prototype.text = function (text) {
        var fluentXpoUrlText = new FluentXpoUrlText(text);
        this.xpoObject.setText(fluentXpoUrlText.getXpoUrlText());

        return fluentXpoUrlText;
    };

    FluentXpoUrlObject.prototype.color = function (color) {
        var fluentXpoUrlColor = new FluentXpoUrlColor(color);
        this.xpoObject.setColor(fluentXpoUrlColor.getXpoUrlColor());

        return fluentXpoUrlColor;
    };
    return FluentXpoUrlObject;
})();
var FluentXpoUrlOverlay = (function () {
    function FluentXpoUrlOverlay(overlayName) {
        if (typeof overlayName === "undefined") { overlayName = ""; }
        this.xpoUrlOverlay = new XpoUrlOverlay(overlayName);
    }
    FluentXpoUrlOverlay.prototype.getXpoOverlay = function () {
        return this.xpoUrlOverlay;
    };

    FluentXpoUrlOverlay.prototype.setIndex = function (index) {
        this.xpoUrlOverlay.setIndex(index);

        return this;
    };

    FluentXpoUrlOverlay.prototype.setLocation = function (location) {
        this.xpoUrlOverlay.setOverlayLocation(location);

        return this.xpoUrlOverlay;
    };

    FluentXpoUrlOverlay.prototype.setMode = function (mode) {
        this.xpoUrlOverlay.setOverlayMode(mode);

        return this.xpoUrlOverlay;
    };

    FluentXpoUrlOverlay.prototype.setName = function (name) {
        this.xpoUrlOverlay.setOverlayName(name);

        return this.xpoUrlOverlay;
    };

    FluentXpoUrlOverlay.prototype.setOperation = function (operation) {
        this.xpoUrlOverlay.setOverlayOperation(operation);

        return this.xpoUrlOverlay;
    };

    FluentXpoUrlOverlay.prototype.setTime = function (time) {
        this.xpoUrlOverlay.setOverlayTime(time);

        return this.xpoUrlOverlay;
    };
    return FluentXpoUrlOverlay;
})();
var FluentXpoUrlText = (function () {
    function FluentXpoUrlText(text) {
        this.xpoUrlText = new XpoUrlText(text);
    }
    FluentXpoUrlText.prototype.getXpoUrlText = function () {
        return this.xpoUrlText;
    };

    FluentXpoUrlText.prototype.setFontName = function (fontName) {
        this.xpoUrlText.setFontname(fontName);

        return this;
    };

    FluentXpoUrlText.prototype.setFontSize = function (fontSize) {
        this.xpoUrlText.setFontsize(fontSize);

        return this;
    };

    FluentXpoUrlText.prototype.setColor = function (color) {
        this.xpoUrlText.setColor(color);

        return this;
    };

    FluentXpoUrlText.prototype.setAlignment = function (alignment) {
        this.xpoUrlText.setAlignment(alignment);

        return this;
    };

    FluentXpoUrlText.prototype.setFontStyle = function (fontStyle) {
        this.xpoUrlText.setFontStyle(fontStyle);

        return this;
    };

    FluentXpoUrlText.prototype.setDropX = function (dropX) {
        this.xpoUrlText.setDropX(dropX);

        return this;
    };

    FluentXpoUrlText.prototype.setDropY = function (dropY) {
        this.xpoUrlText.setDropY(dropY);

        return this;
    };

    FluentXpoUrlText.prototype.setPlacingPointX = function (placingPointX) {
        this.xpoUrlText.setPlacingPointX(placingPointX);

        return this;
    };

    FluentXpoUrlText.prototype.setPlacingPointY = function (placingPointY) {
        this.xpoUrlText.setPlacingPointY(placingPointY);

        return this;
    };

    FluentXpoUrlText.prototype.setRotation = function (rotation) {
        throw ("Not implemented.");
    };

    FluentXpoUrlText.prototype.setMultiplier = function (multiplier) {
        this.xpoUrlText.setMultiplier(multiplier);

        return this;
    };
    return FluentXpoUrlText;
})();
var XpoUrlColor = (function () {
    function XpoUrlColor(color) {
        this.color = color;
    }
    XpoUrlColor.prototype.getColor = function () {
        return this.color;
    };
    XpoUrlColor.prototype.setColor = function (val) {
        this.color = val;
    };
    return XpoUrlColor;
})();
var XpoUrlDesign = (function () {
    function XpoUrlDesign(fileName) {
        if (typeof fileName === "undefined") { fileName = ""; }
        this.entityName = fileName;
    }
    XpoUrlDesign.prototype.getIndex = function () {
        return this.index;
    };
    XpoUrlDesign.prototype.setIndex = function (val) {
        this.index = val;
    };

    XpoUrlDesign.prototype.getSameIndex = function () {
        return this.sameIndex;
    };
    XpoUrlDesign.prototype.setSameIndex = function (val) {
        this.sameIndex = val;
    };

    XpoUrlDesign.prototype.getObjectType = function () {
        return this.objectType;
    };
    XpoUrlDesign.prototype.setObjectType = function (val) {
        this.objectType = val;
    };

    XpoUrlDesign.prototype.getEntityName = function () {
        return this.entityName;
    };
    XpoUrlDesign.prototype.setEntityName = function (val) {
        this.entityName = val;
    };

    XpoUrlDesign.prototype.getWidth = function () {
        return this.width;
    };
    XpoUrlDesign.prototype.setWidth = function (val) {
        this.width = val;
    };

    XpoUrlDesign.prototype.getHeight = function () {
        return this.height;
    };
    XpoUrlDesign.prototype.setHeight = function (val) {
        this.height = val;
    };

    XpoUrlDesign.prototype.getGloss = function () {
        return this.gloss;
    };
    XpoUrlDesign.prototype.setGloss = function (val) {
        this.gloss = val;
    };

    XpoUrlDesign.prototype.getContrast = function () {
        return this.contrast;
    };
    XpoUrlDesign.prototype.setContrast = function (val) {
        this.contrast = val;
    };

    XpoUrlDesign.prototype.getDropX = function () {
        return this.dropX;
    };
    XpoUrlDesign.prototype.setDropX = function (val) {
        this.dropX = val;
    };

    XpoUrlDesign.prototype.getDropY = function () {
        return this.dropY;
    };
    XpoUrlDesign.prototype.setDropY = function (val) {
        this.dropY = val;
    };

    XpoUrlDesign.prototype.getPlacingPointX = function () {
        return this.placingPointX;
    };
    XpoUrlDesign.prototype.setPlacingPointX = function (val) {
        this.placingPointX = val;
    };

    XpoUrlDesign.prototype.getPlacingPointY = function () {
        return this.placingPointY;
    };
    XpoUrlDesign.prototype.setPlacingPointY = function (val) {
        this.placingPointY = val;
    };

    XpoUrlDesign.prototype.getRotation = function () {
        return this.rotation;
    };
    XpoUrlDesign.prototype.setRotation = function (val) {
        this.rotation = val;
    };

    XpoUrlDesign.prototype.getFlip = function () {
        return this.flip;
    };
    XpoUrlDesign.prototype.setFlip = function (val) {
        this.flip = val;
    };

    XpoUrlDesign.prototype.getRepeat = function () {
        return this.repeat;
    };
    XpoUrlDesign.prototype.setRepeat = function (val) {
        this.repeat = val;
    };

    XpoUrlDesign.prototype.getAspectRatio = function () {
        return this.aspectRatio;
    };
    XpoUrlDesign.prototype.setAspectRatio = function (val) {
        this.aspectRatio = val;
    };
    return XpoUrlDesign;
})();
var XpoUrlObject = (function () {
    function XpoUrlObject() {
    }
    XpoUrlObject.prototype.getIndex = function () {
        return this.index;
    };
    XpoUrlObject.prototype.setIndex = function (val) {
        this.index = val;
    };

    XpoUrlObject.prototype.getObjectType = function () {
        return this.objectType;
    };
    XpoUrlObject.prototype.setObjectType = function (val) {
        this.objectType = val;
    };

    XpoUrlObject.prototype.getText = function () {
        return this.text;
    };
    XpoUrlObject.prototype.setText = function (val) {
        this.text = val;
    };

    XpoUrlObject.prototype.getColor = function () {
        return this.color;
    };
    XpoUrlObject.prototype.setColor = function (val) {
        this.color = val;
    };

    XpoUrlObject.prototype.getDesign = function () {
        return this.design;
    };
    XpoUrlObject.prototype.setDesign = function (val) {
        this.design = val;
    };
    return XpoUrlObject;
})();
var XpoUrlOverlay = (function () {
    function XpoUrlOverlay(overlayName) {
        if (typeof overlayName === "undefined") { overlayName = ""; }
        this.overlayName = overlayName;
    }
    XpoUrlOverlay.prototype.getIndex = function () {
        return this.index;
    };
    XpoUrlOverlay.prototype.setIndex = function (val) {
        this.index = val;
    };

    XpoUrlOverlay.prototype.getOverlayName = function () {
        return this.overlayName;
    };
    XpoUrlOverlay.prototype.setOverlayName = function (val) {
        this.overlayName = val;
    };

    XpoUrlOverlay.prototype.getOverlayMode = function () {
        return this.overlayMode;
    };
    XpoUrlOverlay.prototype.setOverlayMode = function (val) {
        this.overlayMode = val;
    };

    XpoUrlOverlay.prototype.getOverlayTime = function () {
        return this.overlayTime;
    };
    XpoUrlOverlay.prototype.setOverlayTime = function (val) {
        this.overlayTime = val;
    };

    XpoUrlOverlay.prototype.getOverlayOperation = function () {
        return this.overlayOperation;
    };
    XpoUrlOverlay.prototype.setOverlayOperation = function (val) {
        this.overlayOperation = val;
    };

    XpoUrlOverlay.prototype.getOverlayLocation = function () {
        return this.overlayLocation;
    };
    XpoUrlOverlay.prototype.setOverlayLocation = function (val) {
        this.overlayLocation = val;
    };
    return XpoUrlOverlay;
})();
var XpoUrlRequest = (function () {
    function XpoUrlRequest() {
        this.objects = new Array();
        this.templateParameters = new Array();
        this.overlays = new Array();
        this.customParameters = new Collections.Dictionary();

        this.caching = true;
        this.designCaching = true;
        this.urlType = 0 /* Url */;
    }
    XpoUrlRequest.prototype.getPrimaryKey = function () {
        return this.primaryKey;
    };
    XpoUrlRequest.prototype.setPrimaryKey = function (val) {
        this.primaryKey = val;
    };

    XpoUrlRequest.prototype.getOutputType = function () {
        return this.outputType;
    };
    XpoUrlRequest.prototype.setOutputType = function (val) {
        this.outputType = val;
    };

    XpoUrlRequest.prototype.getOutputQuality = function () {
        return this.outputQuality;
    };
    XpoUrlRequest.prototype.setOutputQuality = function (val) {
        this.outputQuality = val;
    };

    XpoUrlRequest.prototype.getObjects = function () {
        return this.objects;
    };

    XpoUrlRequest.prototype.getTemplateParameters = function () {
        return this.templateParameters;
    };

    XpoUrlRequest.prototype.getOverlays = function () {
        return this.overlays;
    };

    XpoUrlRequest.prototype.getFileType = function () {
        return this.fileType;
    };
    XpoUrlRequest.prototype.setFileType = function (val) {
        this.fileType = val;
    };

    XpoUrlRequest.prototype.getWidth = function () {
        return this.width;
    };
    XpoUrlRequest.prototype.setWidth = function (val) {
        this.width = val;
    };

    XpoUrlRequest.prototype.getHeight = function () {
        return this.height;
    };
    XpoUrlRequest.prototype.setHeight = function (val) {
        this.height = val;
    };

    XpoUrlRequest.prototype.getResizeMethod = function () {
        return this.resizeMethod;
    };
    XpoUrlRequest.prototype.setResizeMethod = function (val) {
        this.resizeMethod = val;
    };

    XpoUrlRequest.prototype.getImageType = function () {
        return this.imageType;
    };
    XpoUrlRequest.prototype.setImageType = function (val) {
        this.imageType = val;
    };

    XpoUrlRequest.prototype.getDebug = function () {
        return this.debug;
    };
    XpoUrlRequest.prototype.setDebug = function (val) {
        this.debug = val;
    };

    XpoUrlRequest.prototype.getBackgroundColor = function () {
        return this.backgroundColor;
    };
    XpoUrlRequest.prototype.setBackgroundColor = function (val) {
        this.backgroundColor = val;
    };

    XpoUrlRequest.prototype.getTransparencyColor = function () {
        return this.transparencyColor;
    };
    XpoUrlRequest.prototype.setTransparencyColor = function (val) {
        this.transparencyColor = val;
    };

    XpoUrlRequest.prototype.getAllColor = function () {
        return this.allColor;
    };
    XpoUrlRequest.prototype.setAllColor = function (val) {
        this.allColor = val;
    };

    XpoUrlRequest.prototype.getTemplateName = function () {
        return this.templateName;
    };
    XpoUrlRequest.prototype.setTemplateName = function (val) {
        this.templateName = val;
    };

    XpoUrlRequest.prototype.getCaching = function () {
        return this.caching;
    };
    XpoUrlRequest.prototype.setCaching = function (val) {
        this.caching = val;
    };

    XpoUrlRequest.prototype.getDesignCaching = function () {
        return this.designCaching;
    };
    XpoUrlRequest.prototype.setDesignCaching = function (val) {
        this.designCaching = val;
    };

    XpoUrlRequest.prototype.getPreFillCaching = function () {
        return this.preFillCaching;
    };
    XpoUrlRequest.prototype.setPreFillCaching = function (val) {
        this.preFillCaching = val;
    };

    XpoUrlRequest.prototype.getIsEntity = function () {
        return this.isEntity;
    };
    XpoUrlRequest.prototype.setIsEntity = function (val) {
        this.isEntity = val;
    };

    XpoUrlRequest.prototype.getHighlightObject = function () {
        return this.highlightObject;
    };
    XpoUrlRequest.prototype.setHighlightObject = function (val) {
        this.highlightObject = val;
    };

    XpoUrlRequest.prototype.getSceneThumbnailObjectNumber = function () {
        return this.sceneThumbnailObjectNumber;
    };
    XpoUrlRequest.prototype.setSceneThumbnailObjectNumber = function (val) {
        this.sceneThumbnailObjectNumber = val;
    };

    XpoUrlRequest.prototype.getAbsoluteUrl = function () {
        return this.absoluteUrl;
    };
    XpoUrlRequest.prototype.setAbsoluteUrl = function (val) {
        this.absoluteUrl = val;
    };

    XpoUrlRequest.prototype.getWatermarkImage = function () {
        return this.watermarkImage;
    };
    XpoUrlRequest.prototype.setWatermarkImage = function (val) {
        this.watermarkImage = val;
    };

    XpoUrlRequest.prototype.getFrame = function () {
        return this.frame;
    };
    XpoUrlRequest.prototype.setFrame = function (val) {
        this.frame = val;
    };

    XpoUrlRequest.prototype.getCustomParameters = function () {
        return this.customParameters;
    };

    XpoUrlRequest.prototype.getCanvasContainerId = function () {
        return this.canvasContainerId;
    };
    XpoUrlRequest.prototype.setCanvasContainerId = function (val) {
        this.canvasContainerId = val;
    };
    return XpoUrlRequest;
})();
var XpoCoordinatesUrlRequest = (function (_super) {
    __extends(XpoCoordinatesUrlRequest, _super);
    function XpoCoordinatesUrlRequest() {
        _super.call(this);
        this.urlType = 2 /* Coords */;
    }
    return XpoCoordinatesUrlRequest;
})(XpoUrlRequest);
var XpoImageUrlRequest = (function (_super) {
    __extends(XpoImageUrlRequest, _super);
    function XpoImageUrlRequest() {
        _super.call(this);
        this.urlType = 1 /* Image */;
    }
    return XpoImageUrlRequest;
})(XpoUrlRequest);
var XpoUrlTemplate = (function () {
    function XpoUrlTemplate(index, value) {
        this.index = index;
        this.value = value;
    }
    XpoUrlTemplate.prototype.getIndex = function () {
        return this.index;
    };
    XpoUrlTemplate.prototype.setIndex = function (val) {
        this.index = val;
    };

    XpoUrlTemplate.prototype.getValue = function () {
        return this.value;
    };
    XpoUrlTemplate.prototype.setValue = function (val) {
        this.value = val;
    };
    return XpoUrlTemplate;
})();
var XpoUrlText = (function () {
    function XpoUrlText(text) {
        if (typeof text === "undefined") { text = ""; }
        this.text = text;
    }
    XpoUrlText.prototype.getText = function () {
        return this.text;
    };
    XpoUrlText.prototype.setText = function (val) {
        this.text = val;
    };

    XpoUrlText.prototype.getColor = function () {
        return this.color;
    };
    XpoUrlText.prototype.setColor = function (val) {
        this.color = val;
    };

    XpoUrlText.prototype.getFontname = function () {
        return this.fontname;
    };
    XpoUrlText.prototype.setFontname = function (val) {
        this.fontname = val;
    };

    XpoUrlText.prototype.getFontsize = function () {
        return this.fontsize;
    };
    XpoUrlText.prototype.setFontsize = function (val) {
        this.fontsize = val;
    };

    XpoUrlText.prototype.getAlignment = function () {
        return this.alignment;
    };
    XpoUrlText.prototype.setAlignment = function (val) {
        this.alignment = val;
    };

    XpoUrlText.prototype.getFontStyle = function () {
        return this.fontStyle;
    };
    XpoUrlText.prototype.setFontStyle = function (val) {
        this.fontStyle = val;
    };

    XpoUrlText.prototype.getDropX = function () {
        return this.dropX;
    };
    XpoUrlText.prototype.setDropX = function (val) {
        this.dropX = val;
    };

    XpoUrlText.prototype.getDropY = function () {
        return this.dropY;
    };
    XpoUrlText.prototype.setDropY = function (val) {
        this.dropY = val;
    };

    XpoUrlText.prototype.getPlacingPointX = function () {
        return this.placingPointX;
    };
    XpoUrlText.prototype.setPlacingPointX = function (val) {
        this.placingPointX = val;
    };

    XpoUrlText.prototype.getPlacingPointY = function () {
        return this.placingPointY;
    };
    XpoUrlText.prototype.setPlacingPointY = function (val) {
        this.placingPointY = val;
    };

    XpoUrlText.prototype.getRotation = function () {
        return this.rotation;
    };
    XpoUrlText.prototype.setRotation = function (val) {
        this.rotation = val;
    };

    XpoUrlText.prototype.getMultiplier = function () {
        return this.multiplier;
    };
    XpoUrlText.prototype.setMultiplier = function (val) {
        this.multiplier = val;
    };
    return XpoUrlText;
})();
var UrlGeneratorModule;
(function (UrlGeneratorModule) {
    var XpoUrlTextDecoration = (function () {
        function XpoUrlTextDecoration() {
        }
        XpoUrlTextDecoration.bold = "bold";
        XpoUrlTextDecoration.italic = "italic";
        XpoUrlTextDecoration.underline = "underline";
        return XpoUrlTextDecoration;
    })();
    UrlGeneratorModule.XpoUrlTextDecoration = XpoUrlTextDecoration;
})(UrlGeneratorModule || (UrlGeneratorModule = {}));
var UrlGeneratorModule;
(function (UrlGeneratorModule) {
    (function (UrlTypes) {
        UrlTypes[UrlTypes["Url"] = 0] = "Url";
        UrlTypes[UrlTypes["Image"] = 1] = "Image";
        UrlTypes[UrlTypes["Coords"] = 2] = "Coords";
    })(UrlGeneratorModule.UrlTypes || (UrlGeneratorModule.UrlTypes = {}));
    var UrlTypes = UrlGeneratorModule.UrlTypes;

    (function (XpoUrlOutputTypes) {
        XpoUrlOutputTypes[XpoUrlOutputTypes["Xml"] = 1] = "Xml";
        XpoUrlOutputTypes[XpoUrlOutputTypes["Json"] = 2] = "Json";
        XpoUrlOutputTypes[XpoUrlOutputTypes["Javascript"] = 3] = "Javascript";
    })(UrlGeneratorModule.XpoUrlOutputTypes || (UrlGeneratorModule.XpoUrlOutputTypes = {}));
    var XpoUrlOutputTypes = UrlGeneratorModule.XpoUrlOutputTypes;

    (function (XpoUrlObjectTypes) {
        XpoUrlObjectTypes[XpoUrlObjectTypes["Color"] = 1] = "Color";

        XpoUrlObjectTypes[XpoUrlObjectTypes["Design"] = 2] = "Design";
    })(UrlGeneratorModule.XpoUrlObjectTypes || (UrlGeneratorModule.XpoUrlObjectTypes = {}));
    var XpoUrlObjectTypes = UrlGeneratorModule.XpoUrlObjectTypes;

    (function (XpoUrlTextAlignment) {
        XpoUrlTextAlignment[XpoUrlTextAlignment["Left"] = 0] = "Left";
        XpoUrlTextAlignment[XpoUrlTextAlignment["Middle"] = 1] = "Middle";
        XpoUrlTextAlignment[XpoUrlTextAlignment["Right"] = 2] = "Right";
    })(UrlGeneratorModule.XpoUrlTextAlignment || (UrlGeneratorModule.XpoUrlTextAlignment = {}));
    var XpoUrlTextAlignment = UrlGeneratorModule.XpoUrlTextAlignment;

    (function (XpoUrlFileTypes) {
        XpoUrlFileTypes[XpoUrlFileTypes["Scene"] = 1] = "Scene";
        XpoUrlFileTypes[XpoUrlFileTypes["Design"] = 2] = "Design";
        XpoUrlFileTypes[XpoUrlFileTypes["Color"] = 3] = "Color";
        XpoUrlFileTypes[XpoUrlFileTypes["SceneThumb"] = 4] = "SceneThumb";
        XpoUrlFileTypes[XpoUrlFileTypes["Image"] = 5] = "Image";
    })(UrlGeneratorModule.XpoUrlFileTypes || (UrlGeneratorModule.XpoUrlFileTypes = {}));
    var XpoUrlFileTypes = UrlGeneratorModule.XpoUrlFileTypes;

    (function (XpoUrlResizeMethods) {
        XpoUrlResizeMethods[XpoUrlResizeMethods["KeepAspect"] = 1] = "KeepAspect";

        XpoUrlResizeMethods[XpoUrlResizeMethods["Stretch"] = 2] = "Stretch";

        XpoUrlResizeMethods[XpoUrlResizeMethods["Crop"] = 3] = "Crop";

        XpoUrlResizeMethods[XpoUrlResizeMethods["Repeat"] = 4] = "Repeat";

        XpoUrlResizeMethods[XpoUrlResizeMethods["KeepAspectMax"] = 5] = "KeepAspectMax";

        XpoUrlResizeMethods[XpoUrlResizeMethods["Canvas"] = 6] = "Canvas";
    })(UrlGeneratorModule.XpoUrlResizeMethods || (UrlGeneratorModule.XpoUrlResizeMethods = {}));
    var XpoUrlResizeMethods = UrlGeneratorModule.XpoUrlResizeMethods;

    (function (XpoUrlImageTypes) {
        XpoUrlImageTypes[XpoUrlImageTypes["Jpg"] = 1] = "Jpg";
        XpoUrlImageTypes[XpoUrlImageTypes["Png"] = 2] = "Png";
        XpoUrlImageTypes[XpoUrlImageTypes["Bmp"] = 3] = "Bmp";
    })(UrlGeneratorModule.XpoUrlImageTypes || (UrlGeneratorModule.XpoUrlImageTypes = {}));
    var XpoUrlImageTypes = UrlGeneratorModule.XpoUrlImageTypes;

    (function (FluentXpoUrlType) {
        FluentXpoUrlType[FluentXpoUrlType["Image"] = 0] = "Image";

        FluentXpoUrlType[FluentXpoUrlType["Coordinates"] = 1] = "Coordinates";
    })(UrlGeneratorModule.FluentXpoUrlType || (UrlGeneratorModule.FluentXpoUrlType = {}));
    var FluentXpoUrlType = UrlGeneratorModule.FluentXpoUrlType;

    (function (XpoUrlObjectTransformations) {
        XpoUrlObjectTransformations[XpoUrlObjectTransformations["None"] = 1] = "None";

        XpoUrlObjectTransformations[XpoUrlObjectTransformations["Arc"] = 2] = "Arc";

        XpoUrlObjectTransformations[XpoUrlObjectTransformations["Rotate"] = 3] = "Rotate";

        XpoUrlObjectTransformations[XpoUrlObjectTransformations["FlipX"] = 4] = "FlipX";

        XpoUrlObjectTransformations[XpoUrlObjectTransformations["FlipY"] = 5] = "FlipY";
    })(UrlGeneratorModule.XpoUrlObjectTransformations || (UrlGeneratorModule.XpoUrlObjectTransformations = {}));
    var XpoUrlObjectTransformations = UrlGeneratorModule.XpoUrlObjectTransformations;

    (function (XpoUrlOverlayModes) {
        XpoUrlOverlayModes[XpoUrlOverlayModes["MatchSizeOfOutput"] = 0] = "MatchSizeOfOutput";

        XpoUrlOverlayModes[XpoUrlOverlayModes["KeepOriginalSize"] = 1] = "KeepOriginalSize";
    })(UrlGeneratorModule.XpoUrlOverlayModes || (UrlGeneratorModule.XpoUrlOverlayModes = {}));
    var XpoUrlOverlayModes = UrlGeneratorModule.XpoUrlOverlayModes;

    (function (XpoUrlOverlayTimes) {
        XpoUrlOverlayTimes[XpoUrlOverlayTimes["BeforeResize"] = 0] = "BeforeResize";

        XpoUrlOverlayTimes[XpoUrlOverlayTimes["AfterResize"] = 1] = "AfterResize";
    })(UrlGeneratorModule.XpoUrlOverlayTimes || (UrlGeneratorModule.XpoUrlOverlayTimes = {}));
    var XpoUrlOverlayTimes = UrlGeneratorModule.XpoUrlOverlayTimes;

    (function (XpoUrlOverlayOperations) {
        XpoUrlOverlayOperations[XpoUrlOverlayOperations["Normal"] = 0] = "Normal";

        XpoUrlOverlayOperations[XpoUrlOverlayOperations["ColoredMapping"] = 1] = "ColoredMapping";
    })(UrlGeneratorModule.XpoUrlOverlayOperations || (UrlGeneratorModule.XpoUrlOverlayOperations = {}));
    var XpoUrlOverlayOperations = UrlGeneratorModule.XpoUrlOverlayOperations;

    (function (TextFontStyle) {
        TextFontStyle[TextFontStyle["Regular"] = 0] = "Regular";
        TextFontStyle[TextFontStyle["Bold"] = 1] = "Bold";
        TextFontStyle[TextFontStyle["Italic"] = 2] = "Italic";
        TextFontStyle[TextFontStyle["Underline"] = 4] = "Underline";
        TextFontStyle[TextFontStyle["Strikeout"] = 8] = "Strikeout";
    })(UrlGeneratorModule.TextFontStyle || (UrlGeneratorModule.TextFontStyle = {}));
    var TextFontStyle = UrlGeneratorModule.TextFontStyle;

    

    function getMaxObjectNumber(xpoUrlObjects) {
        var maxIndex = 0;

        for (var i = 0; i < xpoUrlObjects.length; i++) {
            if (xpoUrlObjects[i].getIndex() > maxIndex)
                maxIndex = xpoUrlObjects[i].getIndex();
        }

        return maxIndex;
    }
    UrlGeneratorModule.getMaxObjectNumber = getMaxObjectNumber;

    function getMaxOverlayNumber(xpoUrlOverlays) {
        var maxIndex = 0;

        for (var i = 0; i < xpoUrlOverlays.length; i++) {
            if (xpoUrlOverlays[i].getIndex() > maxIndex)
                maxIndex = xpoUrlOverlays[i].getIndex();
        }

        return maxIndex;
    }
    UrlGeneratorModule.getMaxOverlayNumber = getMaxOverlayNumber;
})(UrlGeneratorModule || (UrlGeneratorModule = {}));
