module.exports = function updateObjectInArray<ObjectShape>(initialArray: ObjectShape[], key: keyof ObjectShape, value: unknown, patch: Partial<ObjectShape>): ObjectShape[] {
    return initialArray.map(el => {
        if (el[key] === value) return { ...el, ...patch }
        else return el;
    });
}
