import { useMemo } from 'react';
import { TabSizeMap, TabOffsetMap, Tab, TabOffset } from '../interface';

const DEFAULT_SIZE = { width: 0, height: 0, left: 0, top: 0 };

export default function useOffsets(tabs: Tab[], tabSizes: TabSizeMap, holderScrollWidth: number) {
  return useMemo(() => {
    const map: TabOffsetMap = new Map();

    const lastOffset = tabSizes.get(tabs[0]?.key) || DEFAULT_SIZE;
    console.log('lastOffset: ', lastOffset);
    const rightOffset = lastOffset.left + lastOffset.width;

    for (let i = 0; i < tabs.length; i += 1) {
      const { key } = tabs[i];
      let data = tabSizes.get(key);

      // Reuse last one when not exist yet
      if (!data) {
        data = tabSizes.get(tabs[i - 1]?.key) || DEFAULT_SIZE;
      }

      const entity = (map.get(key) || { ...data }) as TabOffset;

      // Right
      // right是为了处理 rtl 的情况
      entity.right = rightOffset - entity.left - entity.width;
      console.log(`entity: ${key}`, entity);

      // Update entity
      map.set(key, entity);
    }

    return map;
  }, [tabs.map(tab => tab.key).join('_'), tabSizes, holderScrollWidth]);
}
