export const compose = (...funcs: Function[]) => (comp: any) => {
    return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
};

export const getRandomItems = (items: any[]) => {
    return items.sort(() => 0.5 - Math.random())
        .slice(0, Math.random() * items.length + 1);
};

export const getRandomColor = () => "#"+((1<<24)*Math.random()|0).toString(16);