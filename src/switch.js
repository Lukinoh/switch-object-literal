import isUndefined from 'lodash/isUndefined';
import isPlainObject from 'lodash/isPlainObject';
import isFunction from 'lodash/isFunction';


function safe(switchTree, branch, nextBranch, ...branches) {
    let res = switchTree[branch];

    if (isUndefined(res) && isUndefined(switchTree.default)) {
        return 'throw exception';
    } else if (isUndefined(res) && !isUndefined(switchTree.default)) {
        return safe(switchTree, 'default', nextBranch, ...branches);
    } else if (!isUndefined(nextBranch)) {
        return safe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch === 'default') {
        return safe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch !== 'default') {
        return 'throw exception';
    }

    return returnLeaf(res);
}

function unsafe(switchTree, branch, nextBranch, ...branches) {
    let res = switchTree[branch];

    if (isUndefined(res) && isUndefined(switchTree.default)) {
        return returnLeaf(switchTree);
    } else if (isUndefined(res) && !isUndefined(switchTree.default)) {
        return unsafe(switchTree, 'default', nextBranch, ...branches);
    } else if (!isUndefined(nextBranch)) {
        return unsafe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch === 'default') {
        return unsafe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch !== 'default') {
        return res;
    }

    return returnLeaf(res);
}

function returnLeaf(res) {
    if (isFunction(res)) {
        return res();
    }
    return res;
}

function resolveCase(any) {
    return () => any;
}

export default {
    safe,
    unsafe,
    resolveCase
}