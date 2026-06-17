import { FeedItem } from './types';
import { escapeXml } from '../helpers/escapeXml';

const toXml = (data: FeedItem[]): string => {
  const shopItems = data.map((item) => {
    const params = (item.parametrs || []).map(p => `
    <PARAM>
      <PARAM_NAME>${escapeXml(p.title)}</PARAM_NAME>
      <VAL>${escapeXml(p.value)}</VAL>
    </PARAM>`).join('');

    // Safely extract just the number from "100 CZK"
    const priceNum = item.price.replace(/[^\d.,]/g, '').trim();

    return `
  <SHOPITEM>
    <ITEM_ID>${escapeXml(item.mpn)}</ITEM_ID>
    <NAME>${escapeXml(item.title)}</NAME>
    <DESCRIPTION_HEAD>${escapeXml(item.description)}</DESCRIPTION_HEAD>
    <TITLE_HEAD>${escapeXml(item.titleHead || item.description)}</TITLE_HEAD>
    <URL>${escapeXml(item.link)}</URL>
    <TEXT><![CDATA[${item.text || ''}]]></TEXT>
    <IMGURL>${escapeXml(item.image_link)}</IMGURL>
    <PRICE>${priceNum}</PRICE>${params ? '\n' + params : ''}
    <CATEGORY>${escapeXml(item.category || '')}</CATEGORY>
    <ORIENTED_IMG>${escapeXml(item.orientedImage || '')}</ORIENTED_IMG>
  </SHOPITEM>`;
  }).join('');

  return `<?xml version="1.0" encoding="utf-8"?>\n<SHOP>${shopItems}\n</SHOP>`;
};

export default toXml;
