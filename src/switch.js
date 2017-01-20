import isUndefined from 'lodash/isUndefined';
import isPlainObject from 'lodash/isPlainObject';


function safe(switchTree, branch, nextBranch, ...branches) {
    let res = switchTree[branch];

    if (isUndefined(res)) {
        if (isUndefined(switchTree.default)) {
            return 'throw exception';
        }

        return safe(switchTree, 'default', nextBranch, ...branches);
    } else if (!isUndefined(nextBranch)) {
        return safe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch === 'default') {
        return safe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch !== 'default') {
        return 'throw exception';
    }

    return res;
}

function unsafe(switchTree, branch, nextBranch, ...branches) {
    let res = switchTree[branch];

    if (isUndefined(res)) {
        if (isUndefined(switchTree.default)) {
            return switchTree;
        }

        return unsafe(switchTree, 'default', nextBranch, ...branches);
    } else if (!isUndefined(nextBranch)) {
        return unsafe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch === 'default') {
        return unsafe(res, nextBranch, ...branches);
    } else if (isPlainObject(res) && branch !== 'default') {
        return res;
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