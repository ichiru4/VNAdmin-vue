// 通用映射函数
type ItemWithChildren<T> = T & { children?: ItemWithChildren<T>[] };

export const mapTree = <T>(
    data: Menu.MenuOption[],
    mapFn: (item: Menu.MenuOption) => ItemWithChildren<T>,
    needBtn: boolean = true
): ItemWithChildren<T>[] => {
    return data.reduce<ItemWithChildren<T>[]>((acc, item) => {
        // 如果当前项的 IsButton 为 true，直接返回，不加入到结果中
        if (!needBtn && item.IsButton) return acc;
        const newItem = mapFn(item);
        if (item.children) {
            newItem.children = needBtn ?
                mapTree(item.children, mapFn, true) :
                mapTree(item.children.filter(i => !i.IsButton), mapFn, false);
        }
        acc.push(newItem);
        return acc;
    }, []);
}